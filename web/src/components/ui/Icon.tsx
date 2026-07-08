import type { CSSProperties, ReactNode } from 'react';

// Iconos de trazo (estilo Lucide), autocontenidos y nítidos a cualquier tamaño.
const P: Record<string, ReactNode> = {
  layers: (<><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 12 10 5 10-5" /><path d="m2 17 10 5 10-5" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>),
  flag: (<><path d="M5 21V4" /><path d="M5 4h12l-2.5 4L17 12H5" /></>),
  pulse: (<path d="M3 12h4l2.5-6 4 12 2.5-6H21" />),
  trendingDown: (<><path d="M3 7l6 6 4-4 8 8" /><path d="M21 12v5h-5" /></>),
  flask: (<><path d="M9 3h6" /><path d="M10 3v6L5.2 18A1.5 1.5 0 0 0 6.5 20.3h11A1.5 1.5 0 0 0 18.8 18L14 9V3" /><path d="M7.5 15h9" /></>),
  alert: (<><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5" /><path d="M12 16h.01" /></>),
  target: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /></>),
  bars: (<><path d="M4 20h16" /><rect x="5.5" y="11" width="3.2" height="7" rx="0.6" /><rect x="10.4" y="6" width="3.2" height="12" rx="0.6" /><rect x="15.3" y="13" width="3.2" height="5" rx="0.6" /></>),
  building: (<><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 21v-4h6v4" /><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01" /></>),
  mapPin: (<><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 3v4M16 3v4" /></>),
  repeat: (<><path d="M4 12a8 8 0 0 1 13.3-5.9L20 8" /><path d="M20 3.5V8h-4.5" /><path d="M20 12a8 8 0 0 1-13.3 5.9L4 16" /><path d="M4 20.5V16h4.5" /></>),
  fileText: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" /></>),
  calculator: (<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8" /><path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" /></>),
  ruler: (<><rect x="2.5" y="8" width="19" height="8" rx="1" /><path d="M6.5 8v3M10.5 8v4M14.5 8v3M18.5 8v4" /></>),
  download: (<><path d="M12 3v11" /><path d="M7.5 10 12 14.5 16.5 10" /><path d="M4 20h16" /></>),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>),
  arrowRight: (<><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></>),
  check: (<path d="M20 6 9 17l-5-5" />),
};

export function Icon({
  name,
  className = 'w-5 h-5',
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      {P[name] ?? null}
    </svg>
  );
}
