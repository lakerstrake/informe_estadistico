import katex from 'katex';
import 'katex/dist/katex.min.css';

/** Renderiza LaTeX con KaTeX directamente (sin react-katex, incompatible con KaTeX 0.17). */
export function Formula({ tex, block = true }: { tex: string; block?: boolean }) {
  const html = katex.renderToString(tex, { displayMode: block, throwOnError: false });
  return (
    <div
      className="my-3 overflow-x-auto text-azul-dark"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
