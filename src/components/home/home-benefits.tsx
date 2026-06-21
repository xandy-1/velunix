const BENEFITS = [
  ["🎯", "Recomendações inteligentes"],
  ["📺", "Veja onde assistir"],
  ["❤️", "Salve favoritos"],
];

export function HomeBenefits() {
  return (
    <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
      {BENEFITS.map(([icon, label]) => (
        <div
          key={label}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
        >
          <div className="text-2xl">
            {icon}
          </div>

          <p className="mt-3 text-sm font-semibold text-zinc-200">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}