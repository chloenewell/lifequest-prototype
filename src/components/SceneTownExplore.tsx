import {
  AlertTriangle,
  ArrowRight,
  Backpack,
  CheckCircle2,
  Circle,
  Plus,
  Sparkles,
  Undo2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { TOWN_ITEMS, TOWN_LOCATIONS } from '../data/gameData';
import {
  PurchaseItem,
  QuestDefinition,
  TownLocationId,
} from '../types/game';
import { ItemIcon } from './AvatarPortrait';
import { NovaCharacter } from './NovaCharacter';
import { TownMapSvg } from './TownMapSvg';

interface SceneTownExploreProps {
  quest: QuestDefinition;
  walletBalance: number;
  activeLocation: TownLocationId;
  selectedItems: PurchaseItem[];
  blockedNotice: { itemName: string; price: number; shortBy: number } | null;
  onSelectLocation: (id: TownLocationId) => void;
  onBuyItem: (item: PurchaseItem) => void;
  onReturnItem: (itemId: string) => void;
  onDismissBlocked: () => void;
  onContinueToTwist: () => void;
}

export function SceneTownExplore({
  quest,
  walletBalance,
  activeLocation,
  selectedItems,
  blockedNotice,
  onSelectLocation,
  onBuyItem,
  onReturnItem,
  onDismissBlocked,
  onContinueToTwist,
}: SceneTownExploreProps) {
  const currentLoc =
    TOWN_LOCATIONS.find((l) => l.id === activeLocation) ?? TOWN_LOCATIONS[0];
  const locationItems = TOWN_ITEMS.filter((i) => i.locationId === activeLocation);

  const hasTravel = selectedItems.some((i) => i.slot === 'travel');
  const hasMain = selectedItems.some((i) => i.slot === 'main');
  const hasFoodOrBonus = selectedItems.some(
    (i) => i.slot === 'food' || i.slot === 'bonus'
  );

  const canProceed = selectedItems.length >= 2 && (hasTravel || hasMain);
  const totalSpent = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const getCategoryLabel = (cat: PurchaseItem['category']) => {
    if (cat === 'need') return { text: 'Need', cls: 'bg-sky-100 text-sky-800' };
    if (cat === 'free-smart')
      return { text: 'Smart $0 Choice', cls: 'bg-emerald-100 text-emerald-800' };
    return { text: 'Want', cls: 'bg-amber-100 text-amber-800' };
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-5 space-y-5"
    >
      {/* Over-Budget Gentle Explanation Banner */}
      <AnimatePresence>
        {blockedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Not Enough in Your Wallet for {blockedNotice.itemName} (${blockedNotice.price})
                </h3>
                <p className="text-sm text-slate-700">
                  You have <strong>${walletBalance}</strong> left, so you’re{' '}
                  <strong>${blockedNotice.shortBy} short</strong>. You can return an item from your Weekend Backpack on the right, or pick a lower-cost or free option!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onDismissBlocked}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-orange-200 text-orange-800 text-xs font-bold hover:bg-orange-100 cursor-pointer shrink-0"
            >
              Got It
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-12 gap-5 items-start">
        {/* Left/Main Zone (7 cols): Interactive Town Map + Active Location Choices */}
        <div className="lg:col-span-7 space-y-5">
          <TownMapSvg
            activeLocation={activeLocation}
            selectedItems={selectedItems}
            onSelectLocation={onSelectLocation}
          />

          {/* Active Location Scene Panel */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] overflow-hidden">
            <div
              className={`px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${currentLoc.bgTint}`}
            >
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900">
                  {currentLoc.name}
                </h2>
                <p className="text-sm text-slate-700">
                  <strong>{currentLoc.characterName}:</strong> “{currentLoc.characterGreeting}”
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              {locationItems.map((item) => {
                const isPicked = selectedItems.some((s) => s.id === item.id);
                const isQuestMatch = item.questTags?.includes(quest.id);
                const catBadge = getCategoryLabel(item.category);
                const cantAfford = !isPicked && item.price > walletBalance;

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border-2 p-4 transition-all ${
                      isPicked
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : cantAfford
                          ? 'border-slate-200 bg-slate-50/70'
                          : 'border-slate-200 bg-white hover:border-sky-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            isPicked
                              ? 'bg-emerald-500 text-white'
                              : 'bg-sky-50 text-sky-700 border border-sky-200'
                          }`}
                        >
                          <ItemIcon iconKey={item.iconKey} className="w-5 h-5" />
                        </div>

                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display font-bold text-base text-slate-900">
                              {item.name}
                            </h3>
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${catBadge.cls}`}
                            >
                              {catBadge.text}
                            </span>
                            {isQuestMatch && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                                <Sparkles className="w-3 h-3" />
                                Quest Match
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-700">{item.description}</p>
                          <p className="text-xs text-slate-500">
                            <strong>Trade-off:</strong> {item.tradeoff}
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <span className="font-mono font-bold text-lg text-slate-900 tabular-nums">
                          {item.price === 0 ? 'Free ($0)' : `$${item.price}`}
                        </span>

                        {isPicked ? (
                          <button
                            type="button"
                            onClick={() => onReturnItem(item.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-700 border-2 border-slate-300 hover:border-orange-300 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <Undo2 className="w-3.5 h-3.5" />
                            <span>Return {item.price > 0 ? `(+$${item.price})` : ''}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onBuyItem(item)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                              cantAfford
                                ? 'bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300'
                                : 'bg-sky-600 hover:bg-sky-700 text-white shadow-[0_3px_0_#0369A1] active:translate-y-0.5'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{item.price === 0 ? 'Add Free Plan' : 'Buy & Add'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Zone (5 cols): Quest Checklist + Weekend Backpack */}
        <div className="lg:col-span-5 space-y-5">
          {/* Quest Checklist Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 space-y-4">
            <div className="flex items-center gap-3">
              <NovaCharacter mood="happy" size="sm" className="shrink-0" />
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900">
                  {quest.title} Checklist
                </h2>
                <p className="text-xs text-slate-600">{quest.goalSummary}</p>
              </div>
            </div>

            <div className="space-y-2 bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
              <div className="flex items-center gap-2.5 text-sm">
                {hasTravel ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <span className={hasTravel ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                  {quest.checklistLabels.travel}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                {hasMain ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <span className={hasMain ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                  {quest.checklistLabels.main}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                {hasFoodOrBonus ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <span
                  className={hasFoodOrBonus ? 'font-semibold text-slate-900' : 'text-slate-600'}
                >
                  {quest.checklistLabels.food}
                </span>
              </div>
            </div>

            {quest.id === 'save-big' && (
              <div
                className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold border ${
                  walletBalance >= 25
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                Savings Goal Progress: <strong>${walletBalance}</strong> left in wallet (Target: at least $25 saved!)
              </div>
            )}
          </div>

          {/* Weekend Backpack */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Backpack className="w-5 h-5 text-sky-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Your Weekend Plan
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-slate-600 tabular-nums">
                Spent: ${totalSpent} · Left: ${walletBalance}
              </span>
            </div>

            {selectedItems.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                Your plan is empty! Visit places on the town map and pick items to start building your weekend.
              </div>
            ) : (
              <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {selectedItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
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
                      title="Return item and refund money"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 text-xs font-semibold cursor-pointer shrink-0"
                    >
                      <Undo2 className="w-3 h-3" />
                      <span>Swap</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              disabled={!canProceed}
              onClick={onContinueToTwist}
              className={`w-full py-3.5 px-5 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 transition-all ${
                canProceed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_0_#047857] active:translate-y-0.5 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Lock In Saturday Plan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {!canProceed && (
              <p className="text-xs text-center text-slate-500">
                Pick at least 2 items (including travel or your main weekend activity) to continue!
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
