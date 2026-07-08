# Estado del despliegue

El proyecto ya está publicado y funcionando:

- **Sitio en vivo:** https://informe-estadistico.pages.dev
- **Repositorio:** https://github.com/lakerstrake/informe_estadistico
- **Hosting:** Cloudflare Pages (proyecto `informe-estadistico`)

## Cómo actualizar el sitio

1. Haz los cambios en el código (carpeta `web/`).
2. Compila y verifica localmente:

   ```powershell
   cd web
   npm install
   npm run build
   npm run preview
   ```

3. Sube los cambios a GitHub:

   ```powershell
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```

4. Despliega la carpeta compilada a Cloudflare Pages:

   ```powershell
   cd web
   npx wrangler pages deploy dist --project-name=informe-estadistico --branch=main
   ```

> Opcional: si conectas el repositorio de GitHub al proyecto en el dashboard de Cloudflare
> (Workers & Pages → informe-estadistico → Settings → Builds → Connect to Git, con
> root directory `web`, build `npm run build`, output `dist`), cada `git push`
> desplegará automáticamente sin necesidad del paso 4.

## Para la sustentación

- El botón azul flotante abajo a la derecha ("▶ Modo sustentación") agranda el contenido y agrega
  navegación entre secciones con flechas (o las teclas ← →) — actívalo antes de exponer.
- Cada tabla y gráfica tiene un botón "¿Cómo se calculó esto?" que abre un panel con la explicación
  y un botón para ver la hoja de Excel real detrás del dato, sin salir de la página.
- Al final de la página hay enlaces directos para descargar el PDF, el Word y el Excel completos.
