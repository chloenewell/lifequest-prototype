import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Coins,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { TRANSFER_BUDGET, TRANSFER_ITEMS } from '../data/gameData';
import { soundFX } from '../utils/sound';
import { ItemIcon } from './AvatarPortrait';
import { NovaCharacter } from './NovaCharacter';

interface SceneTransferChallengeProps {
  onRecordAttempt: () => void;
  onBudgetChange: (remaining: number) => void;
  onCompleteTransfer: (chosenIds: string[], spent: number) => void;
}

export function SceneTransferChallenge({
  onRecordAttempt,
  onBudgetChange,
  onCompleteTransfer,
}: SceneTransferChallengeProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [overBudgetMsg, setOverBudgetMsg] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    passed: boolean;
    title: string;
    message: string;
  } | null>(null);

  const totalCost = TRANSFER_ITEMS.filter((i) => selectedIds.includes(i.id)).reduce(
    (sum, i) => sum + i.price,
    0
  );
  const remaining = TRANSFER_BUDGET - totalCost;

  const toggleItem = (id: string) => {
    setFeedback(null);
    const item = TRANSFER_ITEMS.find((i) => i.id === id);
    if (!item) return;

    if (selectedIds.includes(id)) {
      setOverBudgetMsg(null);
      const nextIds = selectedIds.filter((x) => x !== id);
      setSelectedIds(nextIds);
      const nextCost = TRANSFER_ITEMS.filter((i) => nextIds.includes(i.id)).reduce(
        (sum, i) => sum + i.price,
        0
      );
      onBudgetChange(TRANSFER_BUDGET - nextCost);
      soundFX.playCoinRefund();
      return;
    }

    if (totalCost + item.price > TRANSFER_BUDGET) {
      onRecordAttempt();
      soundFX.playBlocked();
      setOverBudgetMsg(
        `Adding ${item.name} ($${item.price}) would total $${totalCost + item.price}—that’s $${
          totalCost + item.price - TRANSFER_BUDGET
        } over your $20 booth budget! Uncheck another item first.`
      );
      return;
    }

    setOverBudgetMsg(null);
    const nextIds = [...selectedIds, id];
    setSelectedIds(nextIds);
    const nextCost = TRANSFER_ITEMS.filter((i) => nextIds.includes(i.id)).reduce(
      (sum, i) => sum + i.price,
      0
    );
    onBudgetChange(TRANSFER_BUDGET - nextCost);
    soundFX.playCoinSpend();
  };

  const handleCheckChoices = () => {
    onRecordAttempt();
    const hasWater = selectedIds.includes('party-water');
    const hasSnacks = selectedIds.includes('party-snacks');

    if (selectedIds.length === 0) {
      soundFX.playBlocked();
      setFeedback({
        passed: false,
        title: 'Your Booth Table Is Empty!',
        message: 'Pick supplies from the list on the right to plan your $20 Community Celebration.',
      });
      return;
    }

    if (!hasWater || !hasSnacks) {
      soundFX.playBlocked();
      const missing =
        !hasWater && !hasSnacks
          ? 'drinking water and healthy snacks'
          : !hasWater
            ? 'drinking water & cups'
            : 'healthy snack packs';
      setFeedback({
        passed: false,
        title: 'Guests Missed an Essential Need!',
        message: `Neighbors loved the festive mood, but without ${missing}, people got thirsty or hungry in the afternoon sun! Try adjusting your choices—Needs first, then fun Wants!`,
      });
      return;
    }

    soundFX.playSuccess();
    const wantNames = TRANSFER_ITEMS.filter(
      (i) => selectedIds.includes(i.id) && i.category === 'want'
    ).map((i) => i.name);

    const saved = TRANSFER_BUDGET - totalCost;
    setFeedback({
      passed: true,
      title: 'Block Party Success!',
      message: `Every neighbor stayed hydrated and well-fed! ${
        wantNames.length > 0
          ? `Plus, adding ${wantNames.join(' & ')} made the booth super welcoming.`
          : 'Keeping it simple focused on every essential Need!'
      } ${saved > 0 ? `You even saved $${saved} in the neighborhood club jar!` : ''}`,
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5"
    >
      <div className="grid lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Visual Stage with Community Celebration Illustration */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-200 shadow-[0_6px_0_#CBD5E1] overflow-hidden flex flex-col justify-between">
          <div className="relative h-64 sm:h-72 bg-amber-50 overflow-hidden">
            <img
              src="/assets/aistudio/image_e528c57a.png"
              alt="Community Celebration marketplace stall with Nova and supplies"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/15 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-amber-200 mb-0.5">
                  Final Challenge · Apply Your Money Skills
                </p>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                  The Sunday Community Block Party
                </h1>
              </div>
              <div className="bg-amber-400 text-slate-950 font-mono font-bold text-lg px-3.5 py-2 rounded-2xl border-2 border-white shadow-sm shrink-0">
                $20 Budget
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3.5 bg-sky-50 border border-sky-200 rounded-2xl p-4">
              <NovaCharacter mood={feedback?.passed ? 'celebrating' : 'happy'} size="sm" className="shrink-0" />
              <div className="space-y-1">
                <div className="text-xs font-bold text-sky-800">Nova · Lead Planner Hand-Off</div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  “You did awesome with $50—now you’re in charge of a tighter <strong>$20 budget</strong> for the neighborhood booth! Cover what guests <strong>need</strong> first, then decide what makes it fun.”
                </p>
              </div>
            </div>

            {overBudgetMsg && (
              <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-3.5 flex items-start gap-2.5 text-sm text-orange-950">
                <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <span>{overBudgetMsg}</span>
              </div>
            )}

            {feedback && (
              <div
                className={`rounded-2xl border-2 p-4 space-y-2 ${
                  feedback.passed
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-amber-50 border-amber-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {feedback.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <RotateCcw className="w-5 h-5 text-amber-700 shrink-0" />
                  )}
                  <h3 className="font-display font-bold text-base text-slate-900">
                    {feedback.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{feedback.message}</p>

                {feedback.passed && (
                  <button
                    type="button"
                    onClick={() => onCompleteTransfer(selectedIds, totalCost)}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-sm shadow-[0_3px_0_#047857] cursor-pointer"
                  >
                    <span>Continue to Quick Reflection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Booth Supplies Selection Checklist */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-200 shadow-[0_6px_0_#CBD5E1] p-5 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <h2 className="font-display font-bold text-xl text-slate-900">
                Choose Booth Supplies
              </h2>
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 px-3 py-1 rounded-xl font-mono text-sm font-bold text-slate-900 tabular-nums">
                <Coins className="w-4 h-4 text-amber-600" />
                <span>${remaining} left</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {TRANSFER_ITEMS.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const wouldExceed = !isSelected && totalCost + item.price > TRANSFER_BUDGET;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={`w-full rounded-2xl border-2 p-3.5 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/70'
                        : wouldExceed
                          ? 'border-slate-200 bg-slate-50 opacity-80'
                          : 'border-slate-200 bg-white hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <ItemIcon iconKey={item.iconKey} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-sm text-slate-900">
                          {item.name}
                        </div>
                        <p className="text-xs text-slate-600 leading-snug mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="font-mono font-bold text-base text-slate-900 tabular-nums">
                        ${item.price}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-sky-600 border-sky-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600 px-1">
              <span>Selected Total: ${totalCost} / ${TRANSFER_BUDGET}</span>
              <span>Club Savings: ${remaining}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckChoices}
              className="w-full py-3.5 px-5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-base shadow-[0_4px_0_#0369A1] active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Check My Booth Plan</span>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
