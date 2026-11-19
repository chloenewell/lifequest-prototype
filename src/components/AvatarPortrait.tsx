import {
  Apple,
  Bike,
  Bus,
  Camera,
  Cookie,
  Droplets,
  Flag,
  Footprints,
  Gamepad2,
  Gift,
  IceCreamCone,
  Mail,
  Music,
  Palette,
  PartyPopper,
  Popcorn,
  Ship,
  Sparkles,
  Tent,
  Ticket,
  Trees,
  Tv,
} from 'lucide-react';
import { AvatarId } from '../types/game';

interface AvatarPortraitProps {
  avatarId: AvatarId;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarPortrait({ avatarId, size = 'md', className = '' }: AvatarPortraitProps) {
  const dims =
    size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14';

  const palettes: Record<
    AvatarId,
    { bg: string; skin: string; hair: string; shirt: string; accent: string }
  > = {
    maya: {
      bg: '#EDE9FE',
      skin: '#D99B72',
      hair: '#4A2C1D',
      shirt: '#8B5CF6',
      accent: '#F472B6',
    },
    leo: {
      bg: '#E0F2FE',
      skin: '#F3C6A5',
      hair: '#1E293B',
      shirt: '#0284C7',
      accent: '#F59E0B',
    },
    sam: {
      bg: '#D1FAE5',
      skin: '#8D5524',
      hair: '#1C1917',
      shirt: '#059669',
      accent: '#38BDF8',
    },
    zara: {
      bg: '#FEF3C7',
      skin: '#E8B088',
      hair: '#7C2D12',
      shirt: '#D97706',
      accent: '#10B981',
    },
  };

  const p = palettes[avatarId];

  return (
    <div
      className={`rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm ${dims} ${className}`}
      style={{ backgroundColor: p.bg }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Shoulders / Jacket */}
        <path d="M 14 80 Q 16 56 40 56 Q 64 56 66 80 Z" fill={p.shirt} />
        <path d="M 32 56 L 40 66 L 48 56" fill="#FFFFFF" opacity="0.85" />

        {/* Back hair for Maya / Zara */}
        {avatarId === 'maya' && (
          <>
            <circle cx="23" cy="36" r="14" fill={p.hair} />
            <circle cx="57" cy="36" r="14" fill={p.hair} />
            <circle cx="40" cy="20" r="16" fill={p.hair} />
          </>
        )}
        {avatarId === 'zara' && (
          <path d="M 19 38 Q 20 14 40 14 Q 60 14 61 38 L 62 54 L 18 54 Z" fill={p.hair} />
        )}

        {/* Head */}
        <circle cx="40" cy="36" r="17" fill={p.skin} />

        {/* Hair Styles */}
        {avatarId === 'maya' && (
          <>
            <path d="M 22 33 Q 26 16 40 16 Q 54 16 58 33 Q 48 24 40 26 Q 30 24 22 33 Z" fill={p.hair} />
            <circle cx="56" cy="20" r="5" fill={p.accent} />
          </>
        )}
        {avatarId === 'leo' && (
          <>
            <path d="M 22 32 Q 25 14 43 15 Q 58 16 58 31 Q 44 22 22 32 Z" fill={p.hair} />
            {/* Cap visor */}
            <path d="M 22 25 Q 40 18 62 24 L 66 27 Q 42 24 22 27 Z" fill={p.accent} />
          </>
        )}
        {avatarId === 'sam' && (
          <>
            <path d="M 23 30 Q 24 15 40 15 Q 56 15 57 30 Q 48 21 40 22 Q 31 21 23 30 Z" fill={p.hair} />
            {/* Glasses */}
            <rect x="27" y="33" width="10" height="7" rx="2.5" fill="none" stroke="#0F172A" strokeWidth="2" />
            <rect x="43" y="33" width="10" height="7" rx="2.5" fill="none" stroke="#0F172A" strokeWidth="2" />
            <line x1="37" y1="36" x2="43" y2="36" stroke="#0F172A" strokeWidth="2" />
          </>
        )}
        {avatarId === 'zara' && (
          <>
            <path d="M 22 32 Q 30 20 42 22 Q 52 19 58 32 Q 46 26 22 32 Z" fill={p.hair} />
            <rect x="24" y="21" width="32" height="4" rx="2" fill={p.accent} />
          </>
        )}

        {/* Eyes & Smile */}
        <circle cx="33" cy="37" r="2.1" fill="#0F172A" />
        <circle cx="47" cy="37" r="2.1" fill="#0F172A" />
        <circle cx="29" cy="41" r="2.5" fill="#F43F5E" opacity="0.22" />
        <circle cx="51" cy="41" r="2.5" fill="#F43F5E" opacity="0.22" />
        <path d="M 35 44 Q 40 49 45 44" fill="none" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ItemIcon({
  iconKey,
  className = 'w-5 h-5',
}: {
  iconKey: string;
  className?: string;
}) {
  switch (iconKey) {
    case 'apple':
      return <Apple className={className} />;
    case 'card':
      return <Mail className={className} />;
    case 'tv':
      return <Tv className={className} />;
    case 'bus':
      return <Bus className={className} />;
    case 'bike':
      return <Bike className={className} />;
    case 'footprints':
      return <Footprints className={className} />;
    case 'ticket':
      return <Ticket className={className} />;
    case 'gamepad':
      return <Gamepad2 className={className} />;
    case 'popcorn':
      return <Popcorn className={className} />;
    case 'camera':
      return <Camera className={className} />;
    case 'gift':
      return <Gift className={className} />;
    case 'palette':
      return <Palette className={className} />;
    case 'cookie':
      return <Cookie className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'trees':
      return <Trees className={className} />;
    case 'icecream':
      return <IceCreamCone className={className} />;
    case 'ship':
      return <Ship className={className} />;
    case 'droplets':
      return <Droplets className={className} />;
    case 'tent':
      return <Tent className={className} />;
    case 'flag':
      return <Flag className={className} />;
    case 'party':
      return <PartyPopper className={className} />;
    case 'music':
      return <Music className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
