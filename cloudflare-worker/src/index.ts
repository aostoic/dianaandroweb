interface Env {
  WEDDING_MEDIA: R2Bucket;
  ALLOWED_ORIGINS: string;
}

interface MediaItem {
  id: string;
  url: string;
  uploaderName: string;
  uploadedAt: string;
  type: "photo" | "video";
  caption: string;
  contentType: string;
  sessionId?: string;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
];
const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/3gpp",
  "video/x-m4v",
];

function getCorsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin") || "";
  const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
  const allowedOrigin = allowed.includes(origin) ? origin : allowed[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(
  data: unknown,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

async function handleUpload(
  request: Request,
  env: Env,
  cors: Record<string, string>,
): Promise<Response> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Invalid form data" }, 400, cors);
  }

  const file = formData.get("file") as File | null;
  const uploaderName = ((formData.get("uploaderName") as string) || "Anónimo")
    .trim()
    .slice(0, 100);
  const caption = ((formData.get("caption") as string) || "")
    .trim()
    .slice(0, 500);
  const sessionId = ((formData.get("sessionId") as string) || "")
    .trim()
    .slice(0, 64);

  if (!file) {
    return jsonResponse({ error: "No se proporcionó archivo" }, 400, cors);
  }

  if (file.size > MAX_FILE_SIZE) {
    return jsonResponse(
      { error: "Archivo demasiado grande (máx 100MB)" },
      400,
      cors,
    );
  }

  const contentType = file.type;
  const isImage = ALLOWED_IMAGE_TYPES.includes(contentType);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(contentType);

  if (!isImage && !isVideo) {
    return jsonResponse(
      { error: "Tipo de archivo no permitido. Solo fotos y videos." },
      400,
      cors,
    );
  }

  const id = `${Date.now()}-${crypto.randomUUID()}`;
  const ext = file.name.split(".").pop()?.toLowerCase() || (isImage ? "jpg" : "mp4");
  const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 10);
  const key = `${id}.${safeExt}`;

  await env.WEDDING_MEDIA.put(key, file.stream(), {
    httpMetadata: { contentType },
    customMetadata: {
      uploaderName,
      uploadedAt: new Date().toISOString(),
      type: isImage ? "photo" : "video",
      caption,
      sessionId,
      fileName: file.name.slice(0, 200),
    },
  });

  const item: MediaItem = {
    id: key,
    url: `/file/${key}`,
    uploaderName,
    uploadedAt: new Date().toISOString(),
    type: isImage ? "photo" : "video",
    caption,
    contentType,
    sessionId,
  };

  return jsonResponse(item, 201, cors);
}

async function handleListMedia(
  env: Env,
  cors: Record<string, string>,
): Promise<Response> {
  const items: MediaItem[] = [];
  let cursor: string | undefined;

  do {
    const listed = await env.WEDDING_MEDIA.list({
      cursor,
      limit: 500,
      include: ["httpMetadata", "customMetadata"],
    });
    for (const obj of listed.objects) {
      const meta = obj.customMetadata || {};
      items.push({
        id: obj.key,
        url: `/file/${obj.key}`,
        uploaderName: meta["uploaderName"] || "Anónimo",
        uploadedAt: meta["uploadedAt"] || obj.uploaded.toISOString(),
        type: (meta["type"] as "photo" | "video") || "photo",
        caption: meta["caption"] || "",
        contentType: obj.httpMetadata?.contentType || "image/jpeg",
        sessionId: meta["sessionId"] || "",
      });
    }
    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);

  // Más recientes primero
  items.sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  );

  return jsonResponse(items, 200, cors);
}

async function handleGetFile(
  key: string,
  env: Env,
  cors: Record<string, string>,
): Promise<Response> {
  const object = await env.WEDDING_MEDIA.get(key);
  if (!object) {
    return new Response("Not Found", { status: 404, headers: cors });
  }

  return new Response(object.body, {
    headers: {
      ...cors,
      "Content-Type":
        object.httpMetadata?.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

async function handleDelete(
  request: Request,
  key: string,
  env: Env,
  cors: Record<string, string>,
): Promise<Response> {
  let body: { sessionId?: string };
  try {
    body = await request.json() as { sessionId?: string };
  } catch {
    return jsonResponse({ error: "Invalid request" }, 400, cors);
  }

  const sessionId = (body.sessionId || "").trim();
  if (!sessionId) {
    return jsonResponse({ error: "Session ID requerido" }, 403, cors);
  }

  const object = await env.WEDDING_MEDIA.head(key);
  if (!object) {
    return new Response("Not Found", { status: 404, headers: cors });
  }

  const isAdmin = sessionId === "ADMIN";
  const storedSessionId = object.customMetadata?.["sessionId"] || "";
  if (!isAdmin && storedSessionId !== sessionId) {
    return jsonResponse(
      { error: "No tienes permiso para eliminar este archivo" },
      403,
      cors,
    );
  }

  await env.WEDDING_MEDIA.delete(key);
  return jsonResponse({ ok: true }, 200, cors);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const cors = getCorsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      if (url.pathname === "/api/media" && request.method === "GET") {
        return handleListMedia(env, cors);
      }
      if (url.pathname === "/api/upload" && request.method === "POST") {
        return handleUpload(request, env, cors);
      }
      if (url.pathname.startsWith("/api/media/") && request.method === "DELETE") {
        const key = decodeURIComponent(url.pathname.slice(11));
        if (key.includes("..") || key.startsWith("/") || !key) {
          return new Response("Bad Request", { status: 400, headers: cors });
        }
        return handleDelete(request, key, env, cors);
      }
      if (url.pathname.startsWith("/file/") && request.method === "GET") {
        const key = decodeURIComponent(url.pathname.slice(6));
        if (key.includes("..") || key.startsWith("/")) {
          return new Response("Bad Request", { status: 400, headers: cors });
        }
        return handleGetFile(key, env, cors);
      }
      return new Response("Not Found", { status: 404, headers: cors });
    } catch (err) {
      console.error("Worker error:", err);
      return jsonResponse({ error: "Error interno" }, 500, cors);
    }
  },
};
