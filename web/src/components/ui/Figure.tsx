import type { ReactNode } from 'react';

/** Imagen con marco, sombra y pie opcional. `fit`: "cover" recorta, "contain" muestra completa. */
export function Figure({
  src,
  alt,
  caption,
  className = '',
  ratio = '16 / 9',
  fit = 'cover',
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
  ratio?: string;
  fit?: 'cover' | 'contain';
}) {
  return (
    <figure className={className}>
      <div
        className="overflow-hidden rounded-2xl border border-azul/10 shadow-[0_8px_28px_rgba(9,46,65,0.12)] bg-azul/[0.04]"
        style={{ aspectRatio: ratio }}
      >
        <img
          src={`${import.meta.env.BASE_URL}${src}`}
          alt={alt}
          loading="lazy"
          className={`w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      </div>
      {caption && <figcaption className="text-xs text-gris mt-2 leading-snug text-center">{caption}</figcaption>}
    </figure>
  );
}
