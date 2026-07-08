# Estado del despliegue

El proyecto ya está publicado, con despliegue automático activado:

- **Sitio en vivo:** https://informe-estadistico.pages.dev
- **Repositorio:** https://github.com/lakerstrake/informe_estadistico
- **Hosting:** Cloudflare Pages (proyecto `informe-estadistico`, conectado a GitHub)
- **Auto-deploy:** cada `git push` a `main` compila (`npm ci && npm run build` en `web/`)
  y publica `web/dist` automáticamente. No hace falta ningún comando de wrangler.

## Cómo actualizar el sitio

1. Haz los cambios en el código (carpeta `web/`).
2. Compila y verifica localmente:

   ```powershell
   cd web
   npm install
   npm run build
   npm run preview
   ```

3. Sube los cambios a GitHub — esto ya despliega solo:

   ```powershell
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```

4. En 1–2 minutos el sitio queda actualizado. Puedes ver el progreso del build en
   Cloudflare → Workers & Pages → informe-estadistico → Deployments.

## Para la sustentación

- El botón azul flotante abajo a la derecha ("▶ Modo sustentación") agranda el contenido y agrega
  navegación entre secciones con flechas (o las teclas ← →) — actívalo antes de exponer.
- Cada tabla y gráfica tiene un botón "¿Cómo se calculó esto?" que abre un panel con la explicación
  y un botón para ver la hoja de Excel real detrás del dato, sin salir de la página.
- Al final de la página hay enlaces directos para descargar el PDF, el Word y el Excel completos.
