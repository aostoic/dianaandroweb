import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Observable, Subject, map, catchError, of } from "rxjs";
import { MediaItem, UploadProgress } from "../models/wedding.model";

// URL del Cloudflare Worker desplegado
const API_BASE = "https://wedding-media.abcsprostudio.workers.dev";

const SESSION_KEY = "wedding_session_id";

@Injectable({ providedIn: "root" })
export class MediaService {
  private sessionId: string;

  constructor(private http: HttpClient) {
    let stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) {
      stored = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, stored);
    }
    this.sessionId = stored;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getMedia(): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${API_BASE}/api/media`).pipe(
      map((items) =>
        items.map((item) => ({
          ...item,
          url: `${API_BASE}${item.url}`,
        })),
      ),
      catchError(() => of([])),
    );
  }

  uploadFile(
    file: File,
    uploaderName: string,
    caption: string,
  ): Observable<{ progress: number; result?: MediaItem }> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("uploaderName", uploaderName);
    fd.append("caption", caption);
    fd.append("sessionId", this.sessionId);

    const progress$ = new Subject<{ progress: number; result?: MediaItem }>();

    this.http
      .post<MediaItem>(`${API_BASE}/api/upload`, fd, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const pct = event.total
              ? Math.round((event.loaded / event.total) * 100)
              : 0;
            progress$.next({ progress: pct });
          } else if (event.type === HttpEventType.Response) {
            const item = event.body as MediaItem;
            progress$.next({
              progress: 100,
              result: { ...item, url: `${API_BASE}${item.url}` },
            });
            progress$.complete();
          }
        },
        error: (err) => progress$.error(err),
      });

    return progress$.asObservable();
  }

  deleteFile(fileId: string): Observable<{ ok: boolean }> {
    return this.http.request<{ ok: boolean }>("DELETE", `${API_BASE}/api/media/${encodeURIComponent(fileId)}`, {
      body: { sessionId: this.sessionId },
    });
  }

  getFileUrl(id: string): string {
    return `${API_BASE}/file/${id}`;
  }
}
