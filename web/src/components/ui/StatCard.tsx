import CountUp from 'react-countup';

export function StatCard({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  label,
  accent = 'azul',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  accent?: 'azul' | 'naranja' | 'verde';
}) {
  const accentClass = accent === 'naranja' ? 'text-naranja' : accent === 'verde' ? 'text-verde' : 'text-azul';
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-5 md:p-6 text-center">
      <div className={`text-3xl md:text-4xl font-extrabold ${accentClass}`}>
        {prefix}
        <CountUp end={value} decimals={decimals} duration={1.6} separator="," enableScrollSpy scrollSpyOnce />
        {suffix}
      </div>
      <p className="text-gris text-sm mt-2 leading-snug presentacion-grande">{label}</p>
    </div>
  );
}
