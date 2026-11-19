import { motion } from 'motion/react';

export type NovaMood = 'happy' | 'thinking' | 'surprised' | 'celebrating';

interface NovaCharacterProps {
  mood?: NovaMood;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function NovaCharacter({
  mood = 'happy',
  size = 'md',
  className = '',
}: NovaCharacterProps) {
  const dimensions =
    size === 'sm' ? 'w-14 h-14' : size === 'lg' ? 'w-32 h-32' : 'w-20 h-20';

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
        {/* Soft shadow underneath */}
        <ellipse cx="60" cy="112" rx="24" ry="5" fill="#0F172A" opacity="0.12" />

        {/* Antenna */}
        <line x1="60" y1="22" x2="60" y2="10" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
        <circle
          cx="60"
          cy="9"
          r="5"
          fill={mood === 'surprised' ? '#F97316' : mood === 'celebrating' ? '#F59E0B' : '#38BDF8'}
        />
        <circle cx="58.5" cy="7.5" r="1.5" fill="#FFFFFF" opacity="0.8" />

        {/* Left & Right Ear Pods */}
        <rect x="16" y="38" width="12" height="22" rx="6" fill="#0284C7" />
        <rect x="19" y="42" width="4" height="14" rx="2" fill="#38BDF8" />
        <rect x="92" y="38" width="12" height="22" rx="6" fill="#0284C7" />
        <rect x="97" y="42" width="4" height="14" rx="2" fill="#38BDF8" />

        {/* Head Shell */}
        <rect x="24" y="20" width="72" height="54" rx="22" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />

        {/* Dark Visor Screen */}
        <rect x="32" y="28" width="56" height="36" rx="14" fill="#0F172A" />

        {/* Expressive Eyes */}
        {mood === 'happy' && (
          <>
            <path d="M 42 47 Q 48 39 54 47" fill="none" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 66 47 Q 72 39 78 47" fill="none" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
          </>
        )}

        {mood === 'celebrating' && (
          <>
            <path d="M 42 48 Q 48 37 54 48" fill="none" stroke="#34D399" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 66 48 Q 72 37 78 48" fill="none" stroke="#34D399" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 54 55 Q 60 60 66 55" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
          </>
        )}

        {mood === 'thinking' && (
          <>
            <circle cx="48" cy="46" r="4.5" fill="#38BDF8" />
            <path d="M 66 44 Q 72 41 78 45" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="44" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {mood === 'surprised' && (
          <>
            <circle cx="48" cy="45" r="5.5" fill="#FB923C" />
            <circle cx="72" cy="45" r="5.5" fill="#FB923C" />
            <circle cx="46.5" cy="43" r="1.8" fill="#FFFFFF" />
            <circle cx="70.5" cy="43" r="1.8" fill="#FFFFFF" />
            <ellipse cx="60" cy="56" rx="4" ry="3" fill="#FB923C" />
          </>
        )}

        {/* Body */}
        <path
          d="M 38 74 L 82 74 Q 86 98 60 102 Q 34 98 38 74 Z"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="3"
        />

        {/* Chest Core */}
        <circle cx="60" cy="87" r="7" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2.5" />
        <circle cx="60" cy="87" r="3" fill="#38BDF8" />

        {/* Arms */}
        <path
          d={mood === 'celebrating' ? 'M 36 78 Q 20 64 22 52' : 'M 36 78 Q 24 85 26 93'}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d={mood === 'celebrating' ? 'M 84 78 Q 100 64 98 52' : 'M 84 78 Q 96 85 94 93'}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
