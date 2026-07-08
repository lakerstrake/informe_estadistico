export function Footer() {
  return (
    <footer className="presentacion-oculto bg-azul-dark text-white/70 py-8 px-5 text-center text-sm">
      <p>Universidad Militar Nueva Granada — Trabajo Final de Estadística</p>
      <p className="mt-1">Shesly Colorado · Juan Lagos · Luis Narváez — 2026</p>
      <div className="flex justify-center gap-5 mt-4 text-white/90 font-medium">
        <a href={`${import.meta.env.BASE_URL}docs/Informe_Sifilis_Gestacional_Juan.pdf`} target="_blank" rel="noreferrer" className="hover:text-white">
          PDF
        </a>
        <a href={`${import.meta.env.BASE_URL}docs/Informe_Sifilis_Gestacional_Juan.docx`} download className="hover:text-white">
          Word
        </a>
        <a href={`${import.meta.env.BASE_URL}docs/Al_merged_v1.xlsx`} download className="hover:text-white">
          Excel
        </a>
      </div>
    </footer>
  );
}
