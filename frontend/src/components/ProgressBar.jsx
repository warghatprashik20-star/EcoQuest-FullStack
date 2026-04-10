import { useEffect, useState } from "react";

function ProgressBar({ label, value }) {
  const safeValue = Number.isFinite(value) ? Math.min(Math.max(value, 0), 100) : 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Animate from 0 to target value on mount
    const timer = setTimeout(() => setDisplayValue(safeValue), 100);
    return () => clearTimeout(timer);
  }, [safeValue]);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span className="tabular-nums">{safeValue.toFixed(0)}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 transition-all duration-1000 ease-out"
          style={{ width: `${displayValue}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;

