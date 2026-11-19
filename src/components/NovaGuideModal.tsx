import { ArrowRight, CheckCircle2, Compass, Lightbulb, Map, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { HintBundle } from '../types/game';
import { NovaCharacter } from './NovaCharacter';

interface NovaGuideModalProps {
  open: boolean;
  onClose: () => void;
  stageTitle: string;
  canAccessHints: boolean;
  unlockedLevel: 0 | 1 | 2 | 3;
  onUnlockLevel: (level: 1 | 2 | 3) => void;
  guidance: HintBundle;
  isReducedSupportStage?: boolean;
}

export function NovaGuideModal({
  open,
  onClose,
  stageTitle,
  canAccessHints,
  unlockedLevel,
  onUnlockLevel,
  guidance,
  isReducedSupportStage = false,
}: NovaGuideModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl border-2 border-sky-200 shadow-2xl max-w-xl w-full overflow-hidden"
          >
            {/* Header */}
            <div className="bg-sky-50 border-b border-sky-100 px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <NovaCharacter mood="thinking" size="sm" />
                <div>
                  <h2 className="font-display font-bold text-lg text-slate-900">
                    Nova’s Guide Desk
                  </h2>
                  <p className="text-xs font-medium text-sky-700">{stageTitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close guide"
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {!canAccessHints ? (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-center space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Try One Move First!
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {isReducedSupportStage
                      ? 'You’ve already built strong budgeting skills! Test out a booth plan on your own first—then come back here anytime if you want a clue.'
                      : 'Explore a town location or try picking one choice on your own first. Trying things out helps your brain grow—and I’ll be right here if you get stuck!'}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-[0_3px_0_#0369A1] cursor-pointer"
                  >
                    <span>Got It, Let’s Try!</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  {isReducedSupportStage && (
                    <p className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5">
                      Gradual Coach Mode: Nova shares shorter nudges now so you can shine as the lead budget planner!
                    </p>
                  )}

                  {/* Level 1: Hint */}
                  <div
                    className={`rounded-2xl border-2 p-4 transition-colors ${
                      unlockedLevel >= 1
                        ? 'bg-sky-50/70 border-sky-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                          <Lightbulb className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-display font-bold text-sm text-slate-900">
                            Level 1 · Quick Hint
                          </span>
                          <p className="text-xs text-slate-500">A small question to spark an idea</p>
                        </div>
                      </div>
                      {unlockedLevel < 1 ? (
                        <button
                          type="button"
                          onClick={() => onUnlockLevel(1)}
                          className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                        >
                          Show Hint
                        </button>
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                      )}
                    </div>
                    {unlockedLevel >= 1 && (
                      <p className="mt-3 text-sm text-slate-800 leading-relaxed bg-white rounded-xl p-3 border border-sky-100">
                        {guidance.hint}
                      </p>
                    )}
                  </div>

                  {/* Level 2: Strategy */}
                  <div
                    className={`rounded-2xl border-2 p-4 transition-colors ${
                      unlockedLevel >= 2
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-display font-bold text-sm text-slate-900">
                            Level 2 · Smart Strategy
                          </span>
                          <p className="text-xs text-slate-500">A way to organize your choices</p>
                        </div>
                      </div>
                      {unlockedLevel < 2 ? (
                        <button
                          type="button"
                          disabled={unlockedLevel < 1}
                          onClick={() => onUnlockLevel(2)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${
                            unlockedLevel < 1
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                          }`}
                        >
                          Show Strategy
                        </button>
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    {unlockedLevel >= 2 && (
                      <p className="mt-3 text-sm text-slate-800 leading-relaxed bg-white rounded-xl p-3 border border-emerald-100">
                        {guidance.strategy}
                      </p>
                    )}
                  </div>

                  {/* Level 3: Walkthrough */}
                  <div
                    className={`rounded-2xl border-2 p-4 transition-colors ${
                      unlockedLevel >= 3
                        ? 'bg-amber-50/70 border-amber-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                          <Map className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-display font-bold text-sm text-slate-900">
                            Level 3 · Step-by-Step Example
                          </span>
                          <p className="text-xs text-slate-500">One full example you can adapt</p>
                        </div>
                      </div>
                      {unlockedLevel < 3 ? (
                        <button
                          type="button"
                          disabled={unlockedLevel < 2}
                          onClick={() => onUnlockLevel(3)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${
                            unlockedLevel < 2
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                          }`}
                        >
                          Show Example
                        </button>
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                    </div>
                    {unlockedLevel >= 3 && (
                      <p className="mt-3 text-sm text-slate-800 leading-relaxed bg-white rounded-xl p-3 border border-amber-100">
                        {guidance.walkthrough}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm cursor-pointer"
                    >
                      Back to Adventure
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
