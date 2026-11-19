import { CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { TOWN_LOCATIONS } from '../data/gameData';
import { PurchaseItem, TownLocationId } from '../types/game';

interface TownMapSvgProps {
  activeLocation: TownLocationId;
  selectedItems: PurchaseItem[];
  onSelectLocation: (id: TownLocationId) => void;
}

function BuildingArtwork({ id }: { id: TownLocationId }) {
  switch (id) {
    case 'home':
      return (
        <svg viewBox="0 0 80 64" className="w-16 h-12 drop-shadow-sm" aria-hidden="true">
          <polygon points="40,6 8,28 72,28" fill="#059669" />
          <polygon points="40,6 72,28 65,28 40,11" fill="#047857" />
          <rect x="16" y="28" width="48" height="30" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <rect x="33" y="38" width="14" height="20" rx="2" fill="#92400E" />
          <rect x="20" y="34" width="9" height="9" rx="1.5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.5" />
          <rect x="51" y="34" width="9" height="9" rx="1.5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
      );
    case 'transit':
      return (
        <svg viewBox="0 0 80 64" className="w-16 h-12 drop-shadow-sm" aria-hidden="true">
          <rect x="10" y="14" width="60" height="10" rx="4" fill="#0284C7" />
          <rect x="16" y="24" width="48" height="28" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <rect x="20" y="30" width="26" height="14" rx="3" fill="#F59E0B" />
          <circle cx="26" cy="46" r="4" fill="#1E293B" />
          <circle cx="40" cy="46" r="4" fill="#1E293B" />
          <rect x="51" y="28" width="8" height="24" rx="2" fill="#38BDF8" />
        </svg>
      );
    case 'theater':
      return (
        <svg viewBox="0 0 80 64" className="w-16 h-12 drop-shadow-sm" aria-hidden="true">
          <rect x="12" y="16" width="56" height="42" rx="4" fill="#312E81" />
          <rect x="18" y="8" width="44" height="14" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <circle cx="24" cy="15" r="2" fill="#FEF3C7" />
          <circle cx="40" cy="15" r="2" fill="#FEF3C7" />
          <circle cx="56" cy="15" r="2" fill="#FEF3C7" />
          <rect x="28" y="32" width="24" height="26" rx="2" fill="#E0E7FF" />
          <line x1="40" y1="32" x2="40" y2="58" stroke="#4338CA" strokeWidth="2" />
        </svg>
      );
    case 'store':
      return (
        <svg viewBox="0 0 80 64" className="w-16 h-12 drop-shadow-sm" aria-hidden="true">
          <rect x="12" y="26" width="56" height="32" rx="3" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
          <path d="M 8 26 L 16 12 L 64 12 L 72 26 Z" fill="#F97316" />
          <path d="M 18 12 L 26 12 L 22 26 L 14 26 Z" fill="#FFFFFF" opacity="0.85" />
          <path d="M 38 12 L 46 12 L 46 26 L 38 26 Z" fill="#FFFFFF" opacity="0.85" />
          <path d="M 56 12 L 64 12 L 66 26 L 58 26 Z" fill="#FFFFFF" opacity="0.85" />
          <rect x="20" y="34" width="18" height="14" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
          <rect x="44" y="34" width="16" height="24" rx="2" fill="#EA580C" />
        </svg>
      );
    case 'park':
      return (
        <svg viewBox="0 0 80 64" className="w-16 h-12 drop-shadow-sm" aria-hidden="true">
          <ellipse cx="40" cy="52" rx="30" ry="7" fill="#86EFAC" />
          <rect x="23" y="36" width="5" height="16" rx="2" fill="#78350F" />
          <circle cx="25.5" cy="27" r="13" fill="#16A34A" />
          <circle cx="19" cy="30" r="9" fill="#22C55E" />
          <rect x="52" y="34" width="5" height="18" rx="2" fill="#78350F" />
          <circle cx="54.5" cy="25" r="14" fill="#15803D" />
          <path d="M 32 52 Q 40 46 48 52" fill="#38BDF8" />
        </svg>
      );
  }
}

export function TownMapSvg({
  activeLocation,
  selectedItems,
  onSelectLocation,
}: TownMapSvgProps) {
  return (
    <div className="relative w-full rounded-3xl border-2 border-sky-200 bg-gradient-to-b from-sky-100 via-emerald-50 to-emerald-100 overflow-hidden shadow-inner p-4 sm:p-5">
      {/* Decorative Town Landscape SVG Layer */}
      <svg
        viewBox="0 0 800 380"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Rolling hills */}
        <path d="M0,120 Q220,60 440,110 T800,90 L800,380 L0,380 Z" fill="#DCFCE7" opacity="0.7" />
        {/* Town Roads */}
        <path
          d="M 110 95 L 380 95 L 640 105 M 210 95 L 210 265 L 570 265 L 570 105"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 110 95 L 380 95 L 640 105 M 210 95 L 210 265 L 570 265 L 570 105"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeDasharray="10 10"
          strokeLinecap="round"
        />
        {/* Winding River */}
        <path
          d="M 420 380 Q 440 270 500 220 T 720 170 L 800 175 L 800 215 Q 610 215 540 260 T 470 380 Z"
          fill="#7DD3FC"
          opacity="0.75"
        />
        {/* Clouds */}
        <ellipse cx="140" cy="34" rx="45" ry="14" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="640" cy="40" rx="55" ry="16" fill="#FFFFFF" opacity="0.8" />
      </svg>

      {/* Header Pill inside Map */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-sky-200 shadow-xs">
          <MapPin className="w-4 h-4 text-sky-600" />
          <span className="font-display font-bold text-sm text-slate-900">
            Sunnybrook Town Map
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-700 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200">
          Tap any place to explore choices
        </span>
      </div>

      {/* 5 Clickable 2.5D Landmark Cards arranged cleanly in responsive town grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {TOWN_LOCATIONS.map((loc) => {
          const isActive = activeLocation === loc.id;
          const pickedHere = selectedItems.filter((item) => item.locationId === loc.id);

          return (
            <motion.button
              key={loc.id}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectLocation(loc.id)}
              className={`relative rounded-2xl border-2 p-3 text-left transition-all cursor-pointer flex flex-col items-center text-center ${
                isActive
                  ? 'bg-white border-sky-500 shadow-[0_5px_0_#0284C7] ring-4 ring-sky-200/60'
                  : 'bg-white/95 border-slate-200 hover:border-sky-300 shadow-[0_4px_0_#CBD5E1]'
              }`}
            >
              {pickedHere.length > 0 && (
                <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-lg">
                  <CheckCircle2 className="w-3 h-3" />
                  {pickedHere.length}
                </span>
              )}

              <BuildingArtwork id={loc.id} />

              <div className="mt-1.5">
                <div className="font-display font-bold text-sm text-slate-900 leading-tight">
                  {loc.name}
                </div>
                <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                  {loc.subtitle}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
