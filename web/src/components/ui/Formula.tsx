import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export function Formula({ tex, block = true }: { tex: string; block?: boolean }) {
  return (
    <div className="my-3 overflow-x-auto text-azul-dark">
      {block ? <BlockMath math={tex} /> : <InlineMath math={tex} />}
    </div>
  );
}
