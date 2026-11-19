/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GameHud } from './components/GameHud';
import { NovaGuideModal } from './components/NovaGuideModal';
import { SceneFinale } from './components/SceneFinale';
import { SceneGoalSelect } from './components/SceneGoalSelect';
import { ScenePlotTwist } from './components/ScenePlotTwist';
import { SceneReflection } from './components/SceneReflection';
import { SceneTownExplore } from './components/SceneTownExplore';
import { SceneTransferChallenge } from './components/SceneTransferChallenge';
import { SceneWelcome } from './components/SceneWelcome';
import {
  HELPER_BONUS,
  NOVA_GUIDANCE,
  PLOT_TWIST_COST,
  QUESTS,
  STARTING_BUDGET,
  TRANSFER_BUDGET,
} from './data/gameData';
import {
  AvatarId,
  DecisionLogEntry,
  PurchaseItem,
  QuestId,
  SceneId,
  TownLocationId,
} from './types/game';
import { soundFX } from './utils/sound';

type GuidanceStage = 'TOWN_EXPLORE' | 'PLOT_TWIST' | 'TRANSFER_CHALLENGE';

export default function App() {
  const [scene, setScene] = useState<SceneId>('WELCOME');
  const [nickname, setNickname] = useState('Alex');
  const [avatarId, setAvatarId] = useState<AvatarId>('maya');
  const [selectedQuestId, setSelectedQuestId] = useState<QuestId | null>(null);

  const [walletBalance, setWalletBalance] = useState<number>(STARTING_BUDGET);
  const [lastDelta, setLastDelta] = useState<{ amount: number; key: number } | null>(null);

  const [activeLocation, setActiveLocation] = useState<TownLocationId>('home');
  const [selectedItems, setSelectedItems] = useState<PurchaseItem[]>([]);
  const [blockedNotice, setBlockedNotice] = useState<{
    itemName: string;
    price: number;
    shortBy: number;
  } | null>(null);

  const [helperBonusClaimed, setHelperBonusClaimed] = useState(false);
  const [twistResolved, setTwistResolved] = useState(false);

  const [transferSpent, setTransferSpent] = useState(0);
  const [transferRemaining, setTransferRemaining] = useState(TRANSFER_BUDGET);
  const [reflectionTakeaway, setReflectionTakeaway] = useState('');

  const [decisionLog, setDecisionLog] = useState<DecisionLogEntry[]>([]);
  const [muted, setMuted] = useState(false);

  // Scaffolded Support & Productive Struggle state
  const [guideOpen, setGuideOpen] = useState(false);
  const [attemptsByStage, setAttemptsByStage] = useState<Record<GuidanceStage, number>>({
    TOWN_EXPLORE: 0,
    PLOT_TWIST: 0,
    TRANSFER_CHALLENGE: 0,
  });
  const [hintLevelByStage, setHintLevelByStage] = useState<
    Record<GuidanceStage, 0 | 1 | 2 | 3>
  >({
    TOWN_EXPLORE: 0,
    PLOT_TWIST: 0,
    TRANSFER_CHALLENGE: 0,
  });

  const activeQuest = QUESTS.find((q) => q.id === selectedQuestId) ?? QUESTS[0];

  const triggerWalletDelta = (amount: number) => {
    if (amount === 0) return;
    setLastDelta({ amount, key: Date.now() + Math.random() });
  };

  const appendLog = (
    action: DecisionLogEntry['action'],
    itemName: string,
    amount: number,
    note: string
  ) => {
    setDecisionLog((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        action,
        itemName,
        amount,
        note,
        timestamp: Date.now(),
      },
    ]);
  };

  const incrementStageAttempt = (stage: GuidanceStage) => {
    setAttemptsByStage((prev) => ({ ...prev, [stage]: prev[stage] + 1 }));
  };

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    soundFX.setMuted(next);
    if (!next) {
      soundFX.playTap();
    }
  };

  const handleStartFromWelcome = () => {
    soundFX.playSuccess();
    setScene('GOAL_SELECT');
  };

  const handleConfirmQuest = () => {
    if (!selectedQuestId) return;
    soundFX.playSuccess();
    setScene('TOWN_EXPLORE');
  };

  const handleSelectLocation = (id: TownLocationId) => {
    soundFX.playTap();
    setActiveLocation(id);
  };

  const handleBuyItem = (item: PurchaseItem) => {
    incrementStageAttempt('TOWN_EXPLORE');

    if (selectedItems.some((s) => s.id === item.id)) {
      return;
    }

    if (item.price > walletBalance) {
      soundFX.playBlocked();
      setBlockedNotice({
        itemName: item.name,
        price: item.price,
        shortBy: item.price - walletBalance,
      });
      appendLog('blocked', item.name, item.price, 'Blocked over-budget purchase');
      return;
    }

    setBlockedNotice(null);
    setSelectedItems((prev) => [...prev, item]);
    setWalletBalance((prev) => prev - item.price);
    triggerWalletDelta(-item.price);
    if (item.price === 0) {
      soundFX.playSuccess();
    } else {
      soundFX.playCoinSpend();
    }
    appendLog('buy', item.name, item.price, item.tradeoff);
  };

  const handleReturnItem = (itemId: string) => {
    const target = selectedItems.find((i) => i.id === itemId);
    if (!target) return;

    if (scene === 'TOWN_EXPLORE') {
      incrementStageAttempt('TOWN_EXPLORE');
    } else if (scene === 'PLOT_TWIST') {
      incrementStageAttempt('PLOT_TWIST');
    }

    setBlockedNotice(null);
    setSelectedItems((prev) => prev.filter((i) => i.id !== itemId));
    setWalletBalance((prev) => prev + target.price);
    triggerWalletDelta(target.price);
    soundFX.playCoinRefund();
    appendLog('return', target.name, target.price, 'Swapped or returned item');
  };

  const handleAddFreeReplacement = (item: PurchaseItem) => {
    incrementStageAttempt('PLOT_TWIST');
    if (selectedItems.some((s) => s.id === item.id)) return;
    setSelectedItems((prev) => [...prev, item]);
    soundFX.playSuccess();
    appendLog('buy', item.name, 0, 'Added $0 smart swap during plot twist');
  };

  const handleClaimHelperBonus = () => {
    if (helperBonusClaimed) return;
    incrementStageAttempt('PLOT_TWIST');
    setHelperBonusClaimed(true);
    setWalletBalance((prev) => prev + HELPER_BONUS);
    triggerWalletDelta(HELPER_BONUS);
    soundFX.playSuccess();
    appendLog('helper-earn', 'Park Cleanup Helper Bonus', HELPER_BONUS, 'Earned $4 community voucher');
  };

  const handleContinueToTwist = () => {
    soundFX.playPlotTwist();
    setBlockedNotice(null);
    setScene('PLOT_TWIST');
  };

  const handlePayTwistAndContinue = () => {
    if (walletBalance < PLOT_TWIST_COST) {
      soundFX.playBlocked();
      incrementStageAttempt('PLOT_TWIST');
      return;
    }
    setWalletBalance((prev) => prev - PLOT_TWIST_COST);
    triggerWalletDelta(-PLOT_TWIST_COST);
    setTwistResolved(true);
    soundFX.playSuccess();
    appendLog(
      'twist-pay',
      'Science Poster Replacement Supplies',
      PLOT_TWIST_COST,
      'Covered unexpected school need'
    );
    setTransferRemaining(TRANSFER_BUDGET);
    setScene('TRANSFER_CHALLENGE');
  };

  const handleCompleteTransfer = (_chosenIds: string[], spent: number) => {
    setTransferSpent(spent);
    soundFX.playSuccess();
    setScene('REFLECTION');
  };

  const handleCompleteReflection = (takeaway: string) => {
    setReflectionTakeaway(takeaway);
    soundFX.playCelebration();
    setScene('FINALE');
  };

  const handleRestart = () => {
    soundFX.playTap();
    setScene('WELCOME');
    setSelectedQuestId(null);
    setWalletBalance(STARTING_BUDGET);
    setLastDelta(null);
    setActiveLocation('home');
    setSelectedItems([]);
    setBlockedNotice(null);
    setHelperBonusClaimed(false);
    setTwistResolved(false);
    setTransferSpent(0);
    setTransferRemaining(TRANSFER_BUDGET);
    setReflectionTakeaway('');
    setDecisionLog([]);
    setGuideOpen(false);
    setAttemptsByStage({
      TOWN_EXPLORE: 0,
      PLOT_TWIST: 0,
      TRANSFER_CHALLENGE: 0,
    });
    setHintLevelByStage({
      TOWN_EXPLORE: 0,
      PLOT_TWIST: 0,
      TRANSFER_CHALLENGE: 0,
    });
  };

  const currentGuidanceStage: GuidanceStage | null =
    scene === 'TOWN_EXPLORE' ||
    scene === 'PLOT_TWIST' ||
    scene === 'TRANSFER_CHALLENGE'
      ? scene
      : null;

  const currentGuidanceBundle = currentGuidanceStage
    ? NOVA_GUIDANCE[currentGuidanceStage][activeQuest.id]
    : NOVA_GUIDANCE.TOWN_EXPLORE['movie-night'];

  const canAccessHints = currentGuidanceStage
    ? attemptsByStage[currentGuidanceStage] >= 1
    : true;

  const unlockedLevel = currentGuidanceStage
    ? hintLevelByStage[currentGuidanceStage]
    : 0;

  const hintsUsedCount =
    hintLevelByStage.TOWN_EXPLORE +
    hintLevelByStage.PLOT_TWIST +
    hintLevelByStage.TRANSFER_CHALLENGE;

  const hudStageTitle =
    scene === 'TOWN_EXPLORE'
      ? 'Exploring Sunnybrook Town'
      : scene === 'PLOT_TWIST'
        ? 'Plot Twist: Adjusting Your Budget'
        : 'Block Party Transfer Challenge';

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FB] text-slate-900">
      <GameHud
        scene={scene}
        nickname={nickname.trim() || 'Explorer'}
        avatarId={avatarId}
        questTitle={selectedQuestId ? activeQuest.title : undefined}
        walletBalance={
          scene === 'TRANSFER_CHALLENGE' ? transferRemaining : walletBalance
        }
        walletLabel={scene === 'TRANSFER_CHALLENGE' ? 'Party Budget' : 'Wallet'}
        lastDelta={lastDelta}
        muted={muted}
        onToggleMute={handleToggleMute}
        onOpenGuide={() => {
          soundFX.playTap();
          setGuideOpen(true);
        }}
        onRestart={handleRestart}
        showGuideButton={Boolean(currentGuidanceStage)}
      />

      <main className="flex-1 pb-10">
        {scene === 'WELCOME' && (
          <SceneWelcome
            nickname={nickname}
            selectedAvatar={avatarId}
            onChangeNickname={setNickname}
            onSelectAvatar={(id) => {
              soundFX.playTap();
              setAvatarId(id);
            }}
            onStart={handleStartFromWelcome}
          />
        )}

        {scene === 'GOAL_SELECT' && (
          <SceneGoalSelect
            nickname={nickname.trim() || 'Explorer'}
            selectedQuestId={selectedQuestId}
            onSelectQuest={(id) => {
              soundFX.playTap();
              setSelectedQuestId(id);
            }}
            onConfirmQuest={handleConfirmQuest}
          />
        )}

        {scene === 'TOWN_EXPLORE' && (
          <SceneTownExplore
            quest={activeQuest}
            walletBalance={walletBalance}
            activeLocation={activeLocation}
            selectedItems={selectedItems}
            blockedNotice={blockedNotice}
            onSelectLocation={handleSelectLocation}
            onBuyItem={handleBuyItem}
            onReturnItem={handleReturnItem}
            onDismissBlocked={() => setBlockedNotice(null)}
            onContinueToTwist={handleContinueToTwist}
          />
        )}

        {scene === 'PLOT_TWIST' && (
          <ScenePlotTwist
            quest={activeQuest}
            walletBalance={walletBalance}
            selectedItems={selectedItems}
            helperBonusClaimed={helperBonusClaimed}
            twistResolved={twistResolved}
            onReturnItem={handleReturnItem}
            onAddFreeReplacement={handleAddFreeReplacement}
            onClaimHelperBonus={handleClaimHelperBonus}
            onPayTwistAndContinue={handlePayTwistAndContinue}
          />
        )}

        {scene === 'TRANSFER_CHALLENGE' && (
          <SceneTransferChallenge
            onRecordAttempt={() => incrementStageAttempt('TRANSFER_CHALLENGE')}
            onBudgetChange={(rem) => setTransferRemaining(rem)}
            onCompleteTransfer={handleCompleteTransfer}
          />
        )}

        {scene === 'REFLECTION' && (
          <SceneReflection
            nickname={nickname.trim() || 'Explorer'}
            onCompleteReflection={handleCompleteReflection}
          />
        )}

        {scene === 'FINALE' && (
          <SceneFinale
            nickname={nickname.trim() || 'Explorer'}
            avatarId={avatarId}
            quest={activeQuest}
            selectedItems={selectedItems}
            walletBalance={walletBalance}
            helperBonusClaimed={helperBonusClaimed}
            transferSpent={transferSpent}
            reflectionTakeaway={reflectionTakeaway}
            decisionLog={decisionLog}
            hintsUsedCount={hintsUsedCount}
            onRestart={handleRestart}
          />
        )}
      </main>

      {currentGuidanceStage && (
        <NovaGuideModal
          open={guideOpen}
          onClose={() => setGuideOpen(false)}
          stageTitle={hudStageTitle}
          canAccessHints={canAccessHints}
          unlockedLevel={unlockedLevel}
          onUnlockLevel={(level) => {
            soundFX.playTap();
            setHintLevelByStage((prev) => ({
              ...prev,
              [currentGuidanceStage]: level,
            }));
          }}
          guidance={currentGuidanceBundle}
          isReducedSupportStage={currentGuidanceStage === 'TRANSFER_CHALLENGE'}
        />
      )}
    </div>
  );
}
