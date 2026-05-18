'use client';
import { Car } from '@/lib/types';

function statusColor(date?: string): string {
  if (!date) return '#475569';
  const [d, m, y] = date.split('.').map(Number);
  const diff = new Date(y, m - 1, d).getTime() - Date.now();
  if (diff < 0) return '#EF4444';
  if (diff < 30 * 86400000) return '#F59E0B';
  return '#10B981';
}

function Badge({ label, date }: { label: string; date?: string }) {
  const color = statusColor(date);
  return (
    <div className="flex-1">
      <p className="text-[8px] uppercase tracking-widest text-slate-500 mb-1">{label}</p>
      <div className="flex items-center gap-1 border rounded-md px-2 py-1" style={{ borderColor: color + '55' }}>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
        <span className="text-[10px] font-semibold truncate" style={{ color }}>{date || 'Necompletat'}</span>
      </div>
    </div>
  );
}

export default function CarCard({ car, onClick }: { car: Car; onClick?: () => void }) {
  const hasPlate = !!car.registrationNumber;
  const plate = car.registrationNumber?.replace(/[\s\-\.]/g, '').toUpperCase() || '';
  const fmt = (p: string) => p.length >= 2 ? p.slice(0, 2) + (p.length > 2 ? '-' + p.slice(2, 4) + (p.length > 4 ? '-' + p.slice(4) : '') : '') : p;

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 overflow-hidden relative select-none ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
        width: '100%',
        maxWidth: 400,
      }}
    >
      {/* glow circles */}
      <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-blue-500 opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[-30px] w-[150px] h-[150px] rounded-full bg-blue-400 opacity-[0.04] pointer-events-none" />

      {/* Top row */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-white font-black text-base tracking-wide">CarNet</p>
          <p className="text-slate-400 text-[9px] tracking-[2px] uppercase">România</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-[10px] tracking-widest uppercase">{car.make}</p>
          <p className="text-white font-bold text-base">{car.model}</p>
          <p className="text-blue-400 text-[11px] font-medium">{car.year}</p>
          {hasPlate && (
            <div className="flex items-center mt-1 rounded overflow-hidden border border-slate-700 self-end ml-auto w-fit">
              <span className="bg-[#1E3A8A] text-white text-[8px] font-black px-1.5 py-0.5">RO</span>
              <span className="text-slate-200 text-[10px] font-bold tracking-[1.5px] px-2 py-0.5 bg-white/7">{fmt(plate)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Silhouette */}
      <div className="flex justify-center my-2">
        <svg width="120" height="58" viewBox="0 0 140 70">
          <path d="M10 48 L15 32 L28 22 L88 22 L102 32 L118 48 Z" fill="white" opacity="0.25" />
          <path d="M30 32 L38 14 H88 L98 32 Z" fill="white" opacity="0.3" />
          <path d="M8 48 H122" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          <circle cx="32" cy="49" r="11" fill="white" opacity="0.35" />
          <circle cx="32" cy="49" r="6" fill="white" opacity="0.15" />
          <circle cx="97" cy="49" r="11" fill="white" opacity="0.35" />
          <circle cx="97" cy="49" r="6" fill="white" opacity="0.15" />
        </svg>
      </div>

      {/* VIN */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-7 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#D4AF37,#F5E080,#D4AF37)' }}>
          <div className="flex flex-col justify-between w-full h-full p-1">
            {[0,1,2].map(i => <div key={i} className="h-0.5 bg-[#92400E] rounded opacity-50" />)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-500 text-[8px] tracking-widest uppercase">Serie șasiu</p>
          <p className="text-slate-200 text-[11px] font-semibold tracking-widest font-mono truncate">{car.vin.toUpperCase()}</p>
        </div>
      </div>

      {/* RCA + ITP */}
      <div className="flex gap-2 mb-2">
        <Badge label="RCA" date={car.insuranceExpiry} />
        <div className="w-px bg-white/12 self-stretch" />
        <Badge label="ITP" date={car.itpExpiry} />
      </div>

      {/* ROVinieta centered */}
      <div className="flex justify-center">
        <div className="w-1/2">
          <Badge label="ROVinieta" date={car.rovinetaExpiry} />
        </div>
      </div>
    </div>
  );
}
