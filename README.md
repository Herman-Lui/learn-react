# React Interview Lab (Client + Spring Boot API)

This repo now contains only the React 18 + Vite client. The backend API is provided by a separate Spring Boot project (hello-world-spring-boot) running on port 8080.

## Dev (Windows PowerShell)

```powershell
npm install
npm run dev
```

- Client: <http://localhost:5173>
- API (proxied): requests to `/api/*` are forwarded to <http://localhost:8080/> (see `apps/client/vite.config.ts`).

## Pages

- `apps/client/src/pages/Labs.tsx` — the only page. It fetches `/api/users` from the Spring Boot backend and supports client-side search.
- Routes configured in `apps/client/src/main.tsx` (index route → Labs).

## Notes

- If you change the Spring Boot port, also update the proxy target in `vite.config.ts`.
- Ensure the Spring Boot app is running before testing Labs.
