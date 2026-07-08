# Sífilis Gestacional en Bogotá D.C. (2018–2025)

Informe estadístico interactivo — Universidad Militar Nueva Granada.

## Estructura del repositorio

```
informe_estadistico/
├── data/                  Documentos fuente originales (CSV, Excel, Word, PDF)
├── assets_src/            Logo institucional extraído del PDF del grupo
└── web/                   Sitio web interactivo (Vite + React + TypeScript)
    ├── data/               Copia del CSV usada por el script de datos
    ├── public/docs/        Copias de Excel/Word/PDF servidas por el sitio (descargables)
    ├── scripts/build-data.mjs   Genera src/data/stats.json a partir del CSV
    └── src/                Código fuente del sitio (componentes, secciones, gráficas)
```

## Cómo correr el sitio localmente

```bash
cd web
npm install
npm run dev
```

Abre http://localhost:5173

**Importante — primera vez:** si `npm install` da un error de tipo `ENOTEMPTY` o similar, borra
la carpeta `web/node_modules` por completo (desde el explorador de archivos de Windows) y vuelve
a correr `npm install`. Esto puede pasar porque la carpeta se preparó en un entorno temporal antes
de copiarse aquí.

## Cómo regenerar las estadísticas

Si cambias el archivo `web/data/osb_sifilis_gestacional.csv`, vuelve a generar las estadísticas con:

```bash
cd web
node scripts/build-data.mjs
```

Esto recalcula todas las tablas y medidas y sobrescribe `web/src/data/stats.json`. Los valores ya
están verificados contra el informe final (Word/PDF) — moda, mediana, cuartiles, regresión,
distribución normal, etc. coinciden exactamente.

## Cómo compilar para producción

```bash
cd web
npm run build
```

Esto genera la carpeta `web/dist/` lista para desplegar.

## Desplegar en Cloudflare Pages

1. Sube este repositorio a GitHub (ver instrucciones más abajo).
2. Entra a Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Selecciona el repositorio `informe_estadistico`.
4. En la configuración de build:
   - **Framework preset:** Vite
   - **Root directory:** `web`
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Deploy. Cada `git push` a la rama principal vuelve a desplegar automáticamente.

## Subir este repositorio a GitHub

Desde la carpeta raíz `informe_estadistico/`:

```bash
git init
git add .
git commit -m "Informe estadístico interactivo: sífilis gestacional en Bogotá D.C."
git branch -M main
git remote add origin https://github.com/lakerstrake/informe_estadistico.git
git push -u origin main
```

## Qué incluye el sitio

- **Portada** con el logo de la Universidad Militar Nueva Granada.
- **Resumen ejecutivo** con indicadores animados.
- **Marco teórico, planteamiento del problema, objetivos y justificación de las variables** (acordeón).
- **Metodología**: ficha técnica de la base de datos y fórmula de la razón de prevalencia.
- **Variables cualitativas** (Migrante, Régimen de Seguridad Social, Enfoque Diferencial) con
  tablas y gráficas interactivas (ECharts).
- **Variables cuantitativas** (Año, Edad, Regresión Lineal, Distribución Normal) con el mismo patrón.
- **Botón "¿Cómo se calculó esto?"** en cada tabla/gráfica: abre un panel lateral con la explicación
  y, si se quiere profundizar, un botón "Ver en el Excel" que muestra la hoja de cálculo real
  (parseada en el navegador desde `Al_merged_v1.xlsx`, sin salir de la página).
- **Modo sustentación**: botón flotante que agranda el contenido y agrega navegación entre
  secciones con flechas (o las teclas ← →), pensado para exponer frente a un jurado.
- **Conclusiones generales y referencias APA**.

## Metodología estadística

Cada registro (fila) del CSV se cuenta una sola vez (N = 1,186), sin ponderar por ninguna columna
de conteo. Para Año y Edad se usan fórmulas de datos agrupados:

- **Año:** clases de amplitud 1, con corrección de continuidad (L − 0.5).
- **Edad:** intervalos de amplitud 5 (10-14, 15-19, …, 45-49), con límite inferior literal (sin
  corrección), tal como se presentan en el informe original.

Todos los valores generados por `build-data.mjs` fueron verificados contra los del informe final
en Word/PDF antes de integrarse al sitio.
