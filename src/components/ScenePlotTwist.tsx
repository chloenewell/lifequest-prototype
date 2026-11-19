import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Newspaper,
  Plus,
  Undo2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { HELPER_BONUS, PLOT_TWIST_COST, TOWN_ITEMS } from '../data/gameData';
import { PurchaseItem, QuestDefinition } from '../types/game';
import { ItemIcon } from './AvatarPortrait';
import { NovaCharacter } from './NovaCharacter';

interface ScenePlotTwistProps {
  quest: QuestDefinition;
  walletBalance: number;
  selectedItems: PurchaseItem[];
  helperBonusClaimed: boolean;
  twistResolved: boolean;
  onReturnItem: (itemId: string) => void;
  onAddFreeReplacement: (item: PurchaseItem) => void;
  onClaimHelperBonus: () => void;
  onPayTwistAndContinue: () => void;
}

export function ScenePlotTwist({
  quest,
  walletBalance,
  selectedItems,
  helperBonusClaimed,
  twistResolved,
  onReturnItem,
  onAddFreeReplacement,
  onClaimHelperBonus,
  onPayTwistAndContinue,
}: ScenePlotTwistProps) {
  const canAffordTwist = walletBalance >= PLOT_TWIST_COST;
  const freeSwaps = TOWN_ITEMS.filter(
    (i) => i.price === 0 && !selectedItems.some((s) => s.id === i.id)
  );
  const balanceAfterTwist = walletBalance - PLOT_TWIST_COST;
  const isSaveBigWarning =
    quest.id === 'save-big' && balanceAfterTwist < quest.targetSavingsMin;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6"
    >
      {/* Dramatic Playful Plot Twist Header */}
      <div className="bg-orange-50 border-2 border-orange-300 rounded-3xl p-5 sm:p-6 shadow-[0_5px_0_#FDBA74] flex flex-col md:flex-row items-center gap-5">
        <NovaCharacter mood="surprised" size="md" className="shrink-0" />
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-200/70 px-3 py-1 rounded-lg">
            <Newspaper className="w-4 h-4" />
            <span>Plot Twist · Unexpected Weekend Surprise</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Uh oh! Berry Juice Spilled on Your Science Poster!
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Your little sibling accidentally knocked grape juice across your Monday science fair poster board and markers. You <strong>NEED $10</strong> for replacement school supplies before Monday morning!
          </p>
        </div>
        <div className="bg-white rounded-2xl border-2 border-orange-300 px-5 py-3 text-center shrink-0">
          <div className="text-xs font-bold text-orange-700">Required Need</div>
          <div className="font-mono font-extrabold text-3xl text-slate-900 tabular-nums">
            $10
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-5 items-start">
        {/* Left: Adjust Your Plans + Community Helper Opportunity */}
        <div className="lg:col-span-7 space-y-5">
          {/* Status Card */}
          <div
            className={`rounded-3xl border-2 p-5 ${
              canAffordTwist
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-white border-orange-300'
            }`}
          >
            <div className="flex items-start gap-3">
              {canAffordTwist ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h2 className="font-display font-bold text-lg text-slate-900">
                  {canAffordTwist
                    ? `You have $${walletBalance} available—enough to cover the $10 need!`
                    : `You have $${walletBalance} left—you need $${
                        PLOT_TWIST_COST - walletBalance
                      } more to cover the $10 supplies!`}
                </h2>
                <p className="text-sm text-slate-700">
                  {canAffordTwist
                    ? `After paying $10, you’ll finish the weekend with $${balanceAfterTwist} saved. Want to adjust any earlier Wants to save even more? You still can!`
                    : 'No worries! You can return a paid item from your Weekend Plan on the right, swap in a free $0 alternative below, or pitch in at the Park Helper Boost.'}
                </p>
                {isSaveBigWarning && (
                  <p className="text-xs font-bold text-amber-800 bg-amber-100 rounded-xl px-3 py-2 mt-2">
                    Heads up for Save for Something Big: Paying $10 now leaves ${balanceAfterTwist}, which is under your $25 target. Try returning one Want or claiming the +$4 Park Boost!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Discounted / Community Helper Activity */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Town Bulletin Bonus: Park Cleanup Helper (+${HELPER_BONUS})
                  </h3>
                  <p className="text-sm text-slate-600">
                    Ranger Carlos is offering a $4 Community Voucher to explorers who help sort park recycling for 20 minutes!
                  </p>
                </div>
              </div>

              {helperBonusClaimed ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                  +$4 Earned!
                </span>
              ) : (
                <button
                  type="button"
                  onClick={onClaimHelperBonus}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-[0_3px_0_#047857] active:translate-y-0.5 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  Help Clean Park (+${HELPER_BONUS})
                </button>
              )}
            </div>
          </div>

          {/* Quick Free Replacements */}
          {freeSwaps.length > 0 && (
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 space-y-3">
              <h3 className="font-display font-bold text-base text-slate-900">
                Smart $0 Alternatives You Can Swap In
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {freeSwaps.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onAddFreeReplacement(item)}
                    className="flex items-center justify-between gap-2 p-3 rounded-2xl border-2 border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/60 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ItemIcon iconKey={item.iconKey} className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold">Free ($0)</div>
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Adjust Weekend Plan & Pay $10 */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Adjust Your Weekend Plan
            </h3>
            <span className="font-mono text-xs font-bold text-slate-600 tabular-nums">
              Wallet: ${walletBalance}
            </span>
          </div>

          <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {selectedItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <ItemIcon iconKey={item.iconKey} className="w-4 h-4 text-sky-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.price === 0 ? 'Free ($0)' : `$${item.price}`} ·{' '}
                      {item.category === 'need'
                        ? 'Need'
                        : item.category === 'free-smart'
                          ? 'Smart Free'
                          : 'Want'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onReturnItem(item.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 text-xs font-bold cursor-pointer shrink-0"
                >
                  <Undo2 className="w-3 h-3" />
                  <span>{item.price > 0 ? `Return +$${item.price}` : 'Remove'}</span>
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            disabled={!canAffordTwist || twistResolved}
            onClick={onPayTwistAndContinue}
            className={`w-full py-3.5 px-5 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 transition-all ${
              canAffordTwist
                ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-[0_4px_0_#0369A1] active:translate-y-0.5 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Pay $10 for Supplies & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
