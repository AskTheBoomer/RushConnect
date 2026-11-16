// Evelyn Rush Solutions logo from the business card: the letters RuSH spelled
// with three periodic table tiles. Built in HTML/CSS so it stays sharp at any size.
const tiles = [
  { symbol: "Ru", name: "Ruthenium", color: "bg-[#a87bc7]" },
  { symbol: "S", name: "Sulfur", color: "bg-[#9dd3cb]" },
  { symbol: "H", name: "Hydrogen", color: "bg-[#e28a8a]" },
];

const sizes = {
  sm: { gap: "gap-1", tile: "h-9 w-9 border", symbol: "text-base", name: "hidden" },
  // Sized to fit the hero card at every width (it is narrowest at the lg breakpoint).
  lg: {
    gap: "gap-2 sm:gap-4 lg:gap-3 xl:gap-4",
    tile: "h-20 w-20 border-2 sm:h-28 sm:w-28 lg:h-[5.5rem] lg:w-[5.5rem] xl:h-28 xl:w-28",
    symbol: "text-3xl sm:text-5xl lg:text-4xl xl:text-5xl",
    name: "mt-1 text-[9px] sm:text-xs lg:text-[10px] xl:text-xs",
  },
};

export default function BrandLogo({ size = "sm" }: { size?: keyof typeof sizes }) {
  const s = sizes[size];

  return (
    <div className={`flex ${s.gap}`} role="img" aria-label="RuSH: Ruthenium, Sulfur, Hydrogen">
      {tiles.map((tile) => (
        <div
          key={tile.symbol}
          aria-hidden="true"
          className={`flex flex-col items-center justify-center border-[#1d1b22] text-[#1d1b22] ${tile.color} ${s.tile}`}
        >
          <span className={`font-bold leading-none ${s.symbol}`}>{tile.symbol}</span>
          <span className={`font-semibold ${s.name}`}>{tile.name}</span>
        </div>
      ))}
    </div>
  );
}
