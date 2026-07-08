const docs = [
  { label: 'Informe PDF', href: 'docs/Informe_Sifilis_Gestacional_Juan.pdf', target: true },
  { label: 'Documento Word', href: 'docs/Informe_Sifilis_Gestacional_Juan.docx', download: true },
  { label: 'Excel de cálculos', href: 'docs/Al_merged_v1.xlsx', download: true },
];

export function Footer() {
  return (
    <footer className="presentacion-oculto relative bg-azul-deep text-white/70 pt-12 pb-8 px-5 text-center text-sm overflow-hidden">
      <span className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-naranja via-azul-light to-naranja" aria-hidden />
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-12 mx-auto mb-4 opacity-90" aria-hidden />
      <p className="font-semibold text-white/90">Universidad Militar Nueva Granada — Trabajo Final de Estadística</p>
      <p className="mt-1">Shesly Colorado · Juan Lagos · Luis Narváez — 2026</p>
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {docs.map((d) => (
          <a
            key={d.label}
            href={`${import.meta.env.BASE_URL}${d.href}`}
            {...(d.target ? { target: '_blank', rel: 'noreferrer' } : {})}
            {...(d.download ? { download: true } : {})}
            className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.06] rounded-full px-4 py-2 text-white/85 font-medium hover:bg-white/[0.12] hover:border-white/35 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 1v8m0 0L4 6.2M7 9l3-2.8M2 12.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {d.label}
          </a>
        ))}
      </div>
      <p className="mt-6 text-xs text-white/40">
        Datos: Observatorio de Salud de Bogotá (SaluData) · Secretaría Distrital de Salud
      </p>
    </footer>
  );
}
