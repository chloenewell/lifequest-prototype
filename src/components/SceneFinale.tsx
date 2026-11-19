import {
  Award,
  CheckCircle2,
  Coins,
  PiggyBank,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PLOT_TWIST_COST, STARTING_BUDGET } from '../data/gameData';
import {
  AvatarId,
  DecisionLogEntry,
  PurchaseItem,
  QuestDefinition,
} from '../types/game';
import { AvatarPortrait, ItemIcon } from './AvatarPortrait';
import { NovaCharacter } from './NovaCharacter';

interface SceneFinaleProps {
  nickname: string;
  avatarId: AvatarId;
  quest: QuestDefinition;
  selectedItems: PurchaseItem[];
  walletBalance: number;
  helperBonusClaimed: boolean;
  transferSpent: number;
  reflectionTakeaway: string;
  decisionLog: DecisionLogEntry[];
  hintsUsedCount: number;
  onRestart: () => void;
}

export function SceneFinale({
  nickname,
  avatarId,
  quest,
  selectedItems,
  walletBalance,
  helperBonusClaimed,
  transferSpent,
  reflectionTakeaway,
  decisionLog,
  hintsUsedCount,
  onRestart,
}: SceneFinaleProps) {
  const weekendSpent =
    selectedItems.reduce((sum, i) => sum + i.price, 0) + PLOT_TWIST_COST;
  const totalSaved = Math.max(0, walletBalance);

  const returnCount = decisionLog.filter((d) => d.action === 'return').length;
  const blockedCount = decisionLog.filter((d) => d.action === 'blocked').length;
  const freeChoicesCount = selectedItems.filter((i) => i.price === 0).length;

  // Celebrate thoughtful decision-making, persistence, and improvement
  const getSkillDemonstrated = () => {
    if (returnCount > 0 || blockedCount > 0) {
      return {
        title: 'Resilient Budget Adjuster',
        detail:
          'When prices or surprises got tight, you paused, swapped choices without giving up, and made your plan work!',
      };
    }
    if (quest.id === 'save-big' && totalSaved >= quest.targetSavingsMin) {
      return {
        title: 'Future-Focused Saver',
        detail: `You protected $${totalSaved} toward your big goal while still enjoying memorable weekend fun!`,
      };
    }
    if (freeChoicesCount >= 2 || helperBonusClaimed) {
      return {
        title: 'Creative Trade-Off Thinker',
        detail:
          'You blended $0 smart ideas and community effort with paid treats so your $50 stretched even further!',
      };
    }
    if (hintsUsedCount === 0) {
      return {
        title: 'Independent Money Planner',
        detail:
          'You weighed Needs and Wants carefully from start to finish and tackled every challenge head-on!',
      };
    }
    return {
      title: 'Thoughtful Strategy Builder',
      detail:
        'You tested ideas, asked smart questions when needed, and balanced Needs before Wants!',
    };
  };

  const skill = getSkillDemonstrated();

  const goalsAccomplished = [
    `${quest.title}: Planned with ${quest.friendName}`,
    'Handled the $10 Science Poster Plot Twist',
    `Managed the $20 Block Party Booth (Spent $${transferSpent}, Saved $${20 - transferSpent})`,
  ];

  const getEndingNarrative = () => {
    if (quest.id === 'movie-night') {
      return `You and ${quest.friendName} had an unforgettable weekend! Even after the sudden science poster spill, your smart planning kept the movie adventure rolling and finished with $${totalSaved} saved.`;
    }
    if (quest.id === 'birthday-surprise') {
      return `${quest.friendName} was thrilled with your thoughtful birthday plan! You balanced kindness, fun, and surprise expenses while keeping $${totalSaved} safely in your wallet.`;
    }
    return totalSaved >= quest.targetSavingsMin
      ? `Woohoo! Adding $${totalSaved} to your $20 jar at home gives you $${
          20 + totalSaved
        } total—you reached your $45 Stellar Skateboard goal with money to spare!`
      : `You made real progress toward your skateboard goal—adding $${totalSaved} to your $20 jar gives you $${
          20 + totalSaved
        } total, and you handled an unexpected $10 school need along the way!`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8 space-y-6"
    >
      {/* Hero Celebration Card */}
      <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-[0_8px_0_#1E3A8A] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="flex items-center -space-x-3">
              <AvatarPortrait avatarId={avatarId} size="lg" />
              <NovaCharacter mood="celebrating" size="md" />
            </div>
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 px-3 py-1 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Your Weekend, Your Way</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
                Awesome Job, {nickname}!
              </h1>
              <p className="text-sky-50 text-sm sm:text-base leading-relaxed">
                {getEndingNarrative()}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold text-base shadow-[0_4px_0_#B45309] active:translate-y-0.5 inline-flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play a New Weekend</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Row: Money Spent, Money Saved, Skill Demonstrated */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
            <Coins className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Money Spent</div>
            <div className="font-mono font-extrabold text-3xl text-slate-900 tabular-nums">
              ${weekendSpent}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Out of ${STARTING_BUDGET}
              {helperBonusClaimed ? ` (+$${4} earned)` : ''}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <PiggyBank className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Money Saved</div>
            <div className="font-mono font-extrabold text-3xl text-emerald-700 tabular-nums">
              ${totalSaved}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">Kept safe for future goals</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-amber-300 bg-amber-50/40 shadow-[0_5px_0_#FCD34D] p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-800">Skill You Demonstrated</div>
            <div className="font-display font-bold text-lg text-slate-900 leading-snug">
              {skill.title}
            </div>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">{skill.detail}</p>
          </div>
        </div>
      </div>

      {/* Goals Accomplished & Decisions Made */}
      <div className="grid lg:grid-cols-12 gap-5">
        {/* Goals & Reflection */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-6 space-y-5">
          <div className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">
              Goals Accomplished
            </h2>
            <ul className="space-y-2.5">
              {goalsAccomplished.map((goal) => (
                <li
                  key={goal}
                  className="flex items-start gap-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-sm font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
              <TrendingUp className="w-4 h-4" />
              <span>Your Money Takeaway</span>
            </div>
            <p className="text-sm text-slate-700 bg-sky-50 border border-sky-200 rounded-2xl p-3.5 leading-relaxed">
              “{reflectionTakeaway}”
            </p>
          </div>
        </div>

        {/* Financial Decisions Storyboard */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-slate-900">
              Financial Decisions You Made
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              {selectedItems.length + 1} weekend choices
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-sky-600 flex items-center justify-center shrink-0">
                  <ItemIcon iconKey={item.iconKey} className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-sm text-slate-900 truncate">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700 shrink-0 tabular-nums">
                      {item.price === 0 ? '$0' : `$${item.price}`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    {item.tradeoff}
                  </p>
                </div>
              </div>
            ))}

            {/* Plot Twist Need Entry */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-3.5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                Need
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display font-bold text-sm text-slate-900">
                    Science Poster Supplies
                  </span>
                  <span className="font-mono text-xs font-bold text-orange-800 tabular-nums">
                    $10
                  </span>
                </div>
                <p className="text-xs text-slate-700 mt-0.5 leading-snug">
                  Handled an unexpected Monday school need without derailing your weekend!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
