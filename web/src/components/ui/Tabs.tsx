import { useState, type ReactNode } from 'react';

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-black/10 presentacion-oculto-parent">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-sm md:text-base font-semibold rounded-t-lg transition-colors ${
              active === i ? 'bg-azul text-white' : 'text-gris hover:bg-black/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
}
