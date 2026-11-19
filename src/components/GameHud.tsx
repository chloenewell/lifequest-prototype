import { Compass, HelpCircle, RotateCcw, Volume2, VolumeX, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { AvatarId, SceneId } from '../types/game';
import { AvatarPortrait } from './AvatarPortrait';

interface GameHudProps {
  scene: SceneId;
  nickname: string;
  avatarId: AvatarId;
  questTitle?: string;
  walletBalance: number;
  walletLabel?: string;
  lastDelta: { amount: number; key: number } | null;
  muted: boolean;
  onToggleMute: () => void;
  onOpenGuide: () => void;
  onRestart: () => void;
  showGuideButton: boolean;
}

const STAGE_STEPS: { id: SceneId; label: string }[] = [
  { id: 'GOAL_SELECT', label: 'Goal' },
  { id: 'TOWN_EXPLORE', label: 'Town' },
  { id: 'PLOT_TWIST', label: 'Twist' },
  { id: 'TRANSFER_CHALLENGE', label: 'Party' },
  { id: 'REFLECTION', label: 'Reflect' },
  { id: 'FINALE', label: 'Finale' },
];

export function GameHud({
  scene,
  nickname,
  avatarId,
  questTitle,
  walletBalance,
  walletLabel = 'Wallet',
  lastDelta,
  muted,
  onToggleMute,
  onOpenGuide,
  onRestart,
  showGuideButton,
}: GameHudProps) {
  const [confirmRestart, setConfirmRestart] = useState(false);

  const currentStepIdx = STAGE_STEPS.findIndex((s) => s.id === scene);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand & Active Player */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-[0_3px_0_#0369A1] shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-slate-900 whitespace-nowrap">
                  LifeQuest
                </span>
                {questTitle && (
                  <>
                    <span className="text-slate-300 hidden sm:inline" aria-hidden="true">
                      /
                    </span>
                    <span className="text-sm font-semibold text-sky-700 truncate hidden sm:inline">
                      {questTitle}
                    </span>
                  </>
                )}
              </div>
              {scene !== 'WELCOME' && nickname && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>{nickname}’s Weekend</span>
                </div>
              )}
            </div>
          </div>

          {/* Center: Compact Adventure Progress */}
          {scene !== 'WELCOME' && (
            <nav
              aria-label="Adventure progress"
              className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200"
            >
              {STAGE_STEPS.map((step, idx) => {
                const isDone = currentStepIdx > idx;
                const isCurrent = currentStepIdx === idx;
                return (
                  <div
                    key={step.id}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                      isCurrent
                        ? 'bg-sky-600 text-white shadow-xs'
                        : isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'text-slate-500'
                    }`}
                  >
                    {idx + 1}. {step.label}
                  </div>
                );
              })}
            </nav>
          )}

          {/* Right: Wallet + Action Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {scene !== 'WELCOME' && (
              <div className="relative flex items-center gap-2 bg-amber-50 border-2 border-amber-300 rounded-2xl px-3.5 py-1.5 shadow-[0_3px_0_#FCD34D]">
                <Wallet className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-semibold text-amber-800 hidden sm:inline">
                    {walletLabel}
                  </span>
                  <span className="font-mono font-bold text-lg text-slate-900 tabular-nums">
                    ${walletBalance}
                  </span>
                </div>

                <AnimatePresence mode="popLayout">
                  {lastDelta && (
                    <motion.span
                      key={lastDelta.key}
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: -22, scale: 1 }}
                      exit={{ opacity: 0, y: -32 }}
                      transition={{ duration: 0.8 }}
                      className={`absolute -top-1 right-2 font-mono text-xs font-bold px-1.5 py-0.5 rounded-md shadow-xs pointer-events-none ${
                        lastDelta.amount < 0
                          ? 'bg-orange-500 text-white'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {lastDelta.amount > 0 ? `+$${lastDelta.amount}` : `-$${Math.abs(lastDelta.amount)}`}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            )}

            {scene !== 'WELCOME' && (
              <div className="hidden sm:block">
                <AvatarPortrait avatarId={avatarId} size="sm" />
              </div>
            )}

            {showGuideButton && (
              <button
                type="button"
                onClick={onOpenGuide}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border-2 border-sky-200 font-semibold text-sm transition-transform active:translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Ask Nova</span>
              </button>
            )}

            <button
              type="button"
              onClick={onToggleMute}
              aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
              title={muted ? 'Turn sound on' : 'Mute sound'}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {scene !== 'WELCOME' && (
              <button
                type="button"
                onClick={() => setConfirmRestart(true)}
                aria-label="Restart adventure"
                title="Restart game"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden md:inline">Restart</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Safe Restart Confirmation Modal */}
      <AnimatePresence>
        {confirmRestart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl max-w-sm w-full p-6 text-center"
            >
              <h2 className="font-display font-bold text-xl text-slate-900 mb-2">
                Start a Fresh Weekend?
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Restarting will reset your $50 wallet and let you pick a new adventure or character.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmRestart(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm cursor-pointer"
                >
                  Keep Playing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmRestart(false);
                    onRestart();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-[0_3px_0_#0369A1] cursor-pointer"
                >
                  Yes, Restart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
