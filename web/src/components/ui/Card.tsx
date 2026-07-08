import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-azul/10 shadow-[0_1px_3px_rgba(9,46,65,0.06)] hover:shadow-[0_10px_30px_rgba(9,46,65,0.10)] hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
