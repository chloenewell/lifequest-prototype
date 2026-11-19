import { ArrowRight, CheckCircle2, Film, Gift, PiggyBank } from 'lucide-react';
import { motion } from 'motion/react';
import { QUESTS } from '../data/gameData';
import { QuestId } from '../types/game';
import { NovaCharacter } from './NovaCharacter';

interface SceneGoalSelectProps {
  nickname: string;
  selectedQuestId: QuestId | null;
  onSelectQuest: (questId: QuestId) => void;
  onConfirmQuest: () => void;
}

export function SceneGoalSelect({
  nickname,
  selectedQuestId,
  onSelectQuest,
  onConfirmQuest,
}: SceneGoalSelectProps) {
  const activeQuest = QUESTS.find((q) => q.id === selectedQuestId) ?? null;

  const getQuestIcon = (id: QuestId) => {
    switch (id) {
      case 'movie-night':
        return <Film className="w-7 h-7" />;
      case 'birthday-surprise':
        return <Gift className="w-7 h-7" />;
      case 'save-big':
        return <PiggyBank className="w-7 h-7" />;
    }
  };

  const getQuestStyle = (id: QuestId, isSelected: boolean) => {
    if (id === 'movie-night') {
      return isSelected
        ? 'border-sky-500 bg-sky-50/70 shadow-[0_5px_0_#0284C7]'
        : 'border-slate-200 bg-white hover:border-sky-300';
    }
    if (id === 'birthday-surprise') {
      return isSelected
        ? 'border-amber-500 bg-amber-50/70 shadow-[0_5px_0_#D97706]'
        : 'border-slate-200 bg-white hover:border-amber-300';
    }
    return isSelected
      ? 'border-emerald-500 bg-emerald-50/70 shadow-[0_5px_0_#059669]'
      : 'border-slate-200 bg-white hover:border-emerald-300';
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8 space-y-6"
    >
      {/* Nova Prompt Banner */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 shadow-xs">
        <NovaCharacter mood="happy" size="sm" className="shrink-0" />
        <div className="text-center sm:text-left">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Choose Your Weekend Adventure, {nickname}!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            You have <strong className="text-slate-900">$50</strong> in your wallet. Pick the weekend mission you want to lead—every goal changes your story and choices!
          </p>
        </div>
      </div>

      {/* Three Interactive Quest Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {QUESTS.map((quest) => {
          const isSelected = selectedQuestId === quest.id;
          return (
            <button
              key={quest.id}
              type="button"
              onClick={() => onSelectQuest(quest.id)}
              className={`rounded-3xl border-2 p-6 text-left flex flex-col justify-between transition-all cursor-pointer ${getQuestStyle(
                quest.id,
                isSelected
              )}`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: quest.accentHex }}
                  >
                    {getQuestIcon(quest.id)}
                  </div>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                      Selected
                    </span>
                  )}
                </div>

                <h2 className="font-display font-bold text-xl text-slate-900 mb-2">
                  {quest.title}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  {quest.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                <div className="font-bold text-slate-800">Weekend Mission:</div>
                <p className="leading-relaxed">{quest.goalSummary}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Quest Preview & Launch CTA */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5">
        {activeQuest ? (
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-sky-700">
              Ready to plan with {activeQuest.friendName}
            </div>
            <div className="font-display font-bold text-lg text-slate-900">
              {activeQuest.title}: {activeQuest.requiredHint}
            </div>
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-500">
            Select one of the three weekend adventures above to see your town map!
          </p>
        )}

        <button
          type="button"
          disabled={!activeQuest}
          onClick={onConfirmQuest}
          className={`px-7 py-3.5 rounded-2xl font-display font-bold text-base inline-flex items-center gap-2 shrink-0 transition-all ${
            activeQuest
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_0_#047857] active:translate-y-0.5 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Explore the Town Map</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.section>
  );
}
