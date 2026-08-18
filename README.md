# Diana & Andro — Sitio de matrimonio

Sitio web de invitación de matrimonio, construido en Angular 20 con Tailwind CSS
y desplegado en Firebase Hosting.

## Secciones

| Componente | Función |
|---|---|
| `hero` | Portada con los nombres y la fecha |
| `countdown` | Cuenta regresiva hasta el día del evento |
| `event-section` | Lugar, hora y detalles de la ceremonia |
| `rsvp` | Confirmación de asistencia de los invitados |
| `dress-code` | Código de vestimenta |
| `gifts` | Información para regalos |
| `gallery` / `photos` | Galería de fotos |
| `photo-upload-modal` | Subida de fotos por parte de los invitados |

## Stack

- **Frontend:** Angular 20, Tailwind CSS
- **Hosting:** Firebase Hosting (`firebase.json`)
- **Edge:** Cloudflare Worker en [`cloudflare-worker/`](cloudflare-worker/)

## Desarrollo

```bash
npm install
npm start          # servidor de desarrollo en http://localhost:4200
npm run build      # build de producción en dist/demo/browser
```

## Despliegue

```bash
npm run build
firebase deploy
```
