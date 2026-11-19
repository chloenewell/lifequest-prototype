import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { AVATARS } from '../data/gameData';
import { AvatarId } from '../types/game';
import { AvatarPortrait } from './AvatarPortrait';
import { NovaCharacter } from './NovaCharacter';

interface SceneWelcomeProps {
  nickname: string;
  selectedAvatar: AvatarId;
  onChangeNickname: (name: string) => void;
  onSelectAvatar: (id: AvatarId) => void;
  onStart: () => void;
}

const QUICK_NAMES = ['Alex', 'Jordan', 'Riley', 'Taylor'];

export function SceneWelcome({
  nickname,
  selectedAvatar,
  onChangeNickname,
  onSelectAvatar,
  onStart,
}: SceneWelcomeProps) {
  const canStart = nickname.trim().length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-10"
    >
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Visual Stage: Town Panorama & Nova Welcome */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl border-2 border-slate-200 shadow-[0_6px_0_#CBD5E1] overflow-hidden">
          <div className="relative h-64 sm:h-80 bg-sky-100 overflow-hidden">
            <img
              src="/assets/aistudio/image_aa351931.png"
              alt="Sunny LifeQuest town map with explorer and Nova"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-sky-200 tracking-wide mb-1">
                  Weekend Budget Adventure · Ages 8–11
                </p>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight [text-wrap:balance]">
                  LifeQuest: The Weekend Challenge
                </h1>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-amber-400 text-slate-950 font-mono font-bold text-xl px-4 py-2 rounded-2xl border-2 border-white shadow-md shrink-0">
                <span>$50</span>
              </div>
            </div>
          </div>

          {/* Nova Speech Bubble */}
          <div className="p-5 sm:p-6 bg-sky-50/70 flex flex-col sm:flex-row items-center gap-4">
            <NovaCharacter mood="happy" size="md" className="shrink-0" />
            <div className="bg-white rounded-2xl border-2 border-sky-200 p-4 shadow-xs relative flex-1">
              <p className="text-xs font-bold text-sky-700 mb-1">Nova · Your Adventure Guide</p>
              <p className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
                “You’ve got $50 and a whole weekend ahead! What will you do with your money? Your choices shape your adventure!”
              </p>
            </div>
          </div>
        </div>

        {/* Right Setup Panel: Player Profile */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-200 shadow-[0_6px_0_#CBD5E1] p-6 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-slate-900 mb-1">
                Create Your Explorer
              </h2>
              <p className="text-sm text-slate-600">
                Pick a nickname and character before stepping into town.
              </p>
            </div>

            {/* Nickname Input */}
            <div className="space-y-2.5">
              <label
                htmlFor="player-nickname"
                className="block text-sm font-bold text-slate-800"
              >
                Your Nickname
              </label>
              <input
                id="player-nickname"
                type="text"
                maxLength={18}
                value={nickname}
                onChange={(e) => onChangeNickname(e.target.value)}
                placeholder="Type your name or nickname..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none text-base font-semibold text-slate-900 bg-slate-50 focus:bg-white transition-colors"
              />
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-500">Quick picks:</span>
                {QUICK_NAMES.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onChangeNickname(name)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Picker */}
            <div className="space-y-2.5">
              <span className="block text-sm font-bold text-slate-800">
                Choose Your Avatar
              </span>
              <div className="grid grid-cols-2 gap-3">
                {AVATARS.map((av) => {
                  const isSelected = selectedAvatar === av.id;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => onSelectAvatar(av.id)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50 shadow-[0_3px_0_#0284C7] -translate-y-0.5'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <AvatarPortrait avatarId={av.id} size="sm" />
                      <div className="min-w-0">
                        <div className="font-display font-bold text-sm text-slate-900 truncate">
                          {av.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">{av.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={!canStart}
            onClick={onStart}
            className={`w-full py-3.5 px-6 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 transition-all ${
              canStart
                ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-[0_4px_0_#0369A1] active:translate-y-0.5 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Weekend Adventure</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
