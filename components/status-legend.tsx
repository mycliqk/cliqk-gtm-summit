export function StatusLegend() {
  return (
    <div className="flex flex-wrap gap-4 justify-center text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-white/70">Active bid</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="text-white/70">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-white/20" />
        <span className="text-white/70">Claimed</span>
      </div>
    </div>
  );
}
