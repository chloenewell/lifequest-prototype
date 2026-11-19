import { ArrowRight, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { REFLECTION_CARDS } from '../data/gameData';
import { NovaCharacter } from './NovaCharacter';

interface SceneReflectionProps {
  nickname: string;
  onCompleteReflection: (takeaway: string) => void;
}

const TAKEAWAY_OPTIONS = [
  'Cover Needs first so surprise costs never catch me off guard.',
  'Swapping a pricey Want for a free or lower-cost option lets me enjoy more overall.',
  'Comparing choices before buying helps me reach big savings goals faster.',
];

export function SceneReflection({ nickname, onCompleteReflection }: SceneReflectionProps) {
  const [answers, setAnswers] = useState<Record<string, 'need' | 'want'>>({});
  const [selectedTakeaway, setSelectedTakeaway] = useState<string>(TAKEAWAY_OPTIONS[0]);
  const [customNote, setCustomNote] = useState('');

  const allSorted = REFLECTION_CARDS.every((card) => Boolean(answers[card.id]));

  const handleFinish = () => {
    const finalNote = customNote.trim() ? customNote.trim() : selectedTakeaway;
    onCompleteReflection(finalNote);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-8 space-y-6"
    >
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 shadow-xs">
        <NovaCharacter mood="happy" size="sm" className="shrink-0" />
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">
            Quick Pit Stop: Look Back on Your Choices, {nickname}!
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Before we celebrate your weekend finale, sort these 4 moments into <strong>Needs</strong> vs. <strong>Wants</strong> and pick your biggest money lesson.
          </p>
        </div>
      </div>

      {/* Step 1: Needs vs Wants Quick Sort */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 sm:p-6 space-y-4">
        <h2 className="font-display font-bold text-lg text-slate-900">
          1. Need or Want?
        </h2>

        <div className="grid sm:grid-cols-2 gap-3.5">
          {REFLECTION_CARDS.map((card) => {
            const chosen = answers[card.id];
            const isCorrect = chosen === card.correctType;

            return (
              <div
                key={card.id}
                className={`rounded-2xl border-2 p-4 space-y-3 transition-colors ${
                  !chosen
                    ? 'border-slate-200 bg-slate-50/60'
                    : isCorrect
                      ? 'border-emerald-300 bg-emerald-50/60'
                      : 'border-amber-300 bg-amber-50/60'
                }`}
              >
                <div className="font-display font-bold text-sm text-slate-900">
                  {card.label}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [card.id]: 'need' }))}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-colors cursor-pointer ${
                      chosen === 'need'
                        ? 'bg-sky-600 border-sky-600 text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                    }`}
                  >
                    Need
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [card.id]: 'want' }))}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-colors cursor-pointer ${
                      chosen === 'want'
                        ? 'bg-amber-500 border-amber-500 text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    Want
                  </button>
                </div>

                {chosen && (
                  <p className="text-xs text-slate-700 leading-relaxed flex items-start gap-1.5">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isCorrect ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    />
                    <span>{card.explanation}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Trade-off Reflection */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[0_5px_0_#CBD5E1] p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquareHeart className="w-5 h-5 text-sky-600" />
          <h2 className="font-display font-bold text-lg text-slate-900">
            2. Your Biggest Trade-Off Lesson
          </h2>
        </div>

        <div className="space-y-2.5">
          {TAKEAWAY_OPTIONS.map((opt) => {
            const isPicked = selectedTakeaway === opt && !customNote.trim();
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSelectedTakeaway(opt);
                  setCustomNote('');
                }}
                className={`w-full text-left p-3.5 rounded-2xl border-2 text-sm font-medium transition-all cursor-pointer ${
                  isPicked
                    ? 'border-sky-500 bg-sky-50 text-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="custom-reflection" className="block text-xs font-bold text-slate-600">
            Or write your own takeaway (optional):
          </label>
          <input
            id="custom-reflection"
            type="text"
            maxLength={120}
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="One thing I learned about needs, wants, or trade-offs..."
            className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none text-sm text-slate-900 bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            disabled={!allSorted}
            onClick={handleFinish}
            className={`px-6 py-3.5 rounded-2xl font-display font-bold text-base inline-flex items-center gap-2 transition-all ${
              allSorted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_0_#047857] active:translate-y-0.5 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>See Your Weekend Finale</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
