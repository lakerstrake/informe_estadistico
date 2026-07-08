# Pasos finales (correr en tu computador, no en este chat)

El proyecto ya está completo y probado en la carpeta `web/`. Solo faltan los pasos que dependen de
tu cuenta de GitHub y de Cloudflare — eso no lo puedo hacer yo por ti.

## 1. Antes de nada: dos limpiezas rápidas (opcionales pero recomendadas)

Estos archivos quedaron de un intento previo y no se usan en ningún lado — puedes borrarlos desde
el explorador de Windows sin problema:

- `web/src/App.css`
- `web/src/assets/` (toda la carpeta)

Si al correr `npm install` te aparece un error `ENOTEMPTY`, borra la carpeta `web/node_modules`
completa y vuelve a correr `npm install`.

## 2. Instalar y probar localmente

Abre una terminal (PowerShell) en esta carpeta:

```powershell
cd web
npm install
npm run dev
```

Abre el link que te muestra (normalmente http://localhost:5173) y revisa que todo se vea bien.

## 3. Subir a GitHub

Desde la carpeta raíz `informe_estadistico` (no desde `web`):

```powershell
git init
git add .
git commit -m "Informe estadistico interactivo: sifilis gestacional en Bogota D.C."
git branch -M main
git remote add origin https://github.com/lakerstrake/informe_estadistico.git
git push -u origin main
```

Si `git init` se queja de que ya existe una carpeta `.git`, no hay problema, solo continúa con los
siguientes comandos normalmente.

## 4. Desplegar en Cloudflare Pages

1. Entra a https://dash.cloudflare.com
2. Ve a **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Autoriza tu cuenta de GitHub y selecciona el repositorio `informe_estadistico`
4. En la configuración de compilación pon exactamente:
   - **Framework preset:** Vite
   - **Root directory:** `web`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Dale a **Save and Deploy**

En unos minutos tendrás una URL tipo `informe-estadistico.pages.dev` con el sitio en línea. Cada
vez que hagas `git push`, Cloudflare vuelve a desplegar automáticamente.

## 5. Para la sustentación

- El botón azul flotante abajo a la derecha ("▶ Modo sustentación") agranda el contenido y agrega
  navegación entre secciones con flechas (o las teclas ← →) — actívalo antes de exponer.
- Cada tabla y gráfica tiene un botón "¿Cómo se calculó esto?" que abre un panel con la explicación
  y un botón para ver la hoja de Excel real detrás del dato, sin salir de la página.
- Al final de la página hay enlaces directos para descargar el PDF, el Word y el Excel completos.
