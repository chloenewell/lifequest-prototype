export type SceneId =
  | 'WELCOME'
  | 'GOAL_SELECT'
  | 'TOWN_EXPLORE'
  | 'PLOT_TWIST'
  | 'TRANSFER_CHALLENGE'
  | 'REFLECTION'
  | 'FINALE';

export type QuestId = 'movie-night' | 'birthday-surprise' | 'save-big';

export type AvatarId = 'maya' | 'leo' | 'sam' | 'zara';

export type TownLocationId = 'home' | 'theater' | 'store' | 'park' | 'transit';

export type ItemCategory = 'need' | 'want' | 'free-smart';

export type DecisionSlot = 'travel' | 'main' | 'food' | 'bonus';

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  category: ItemCategory;
  locationId: TownLocationId;
  slot: DecisionSlot;
  description: string;
  tradeoff: string;
  iconKey: string;
  questTags?: QuestId[];
}

export interface TownLocation {
  id: TownLocationId;
  name: string;
  subtitle: string;
  characterName: string;
  characterGreeting: string;
  accentColor: string;
  bgTint: string;
  mapPosition: { x: number; y: number };
}

export interface QuestDefinition {
  id: QuestId;
  title: string;
  tagline: string;
  friendName: string;
  goalSummary: string;
  targetSavingsMin: number;
  requiredHint: string;
  accentHex: string;
  checklistLabels: {
    travel: string;
    main: string;
    food: string;
  };
}

export interface HintBundle {
  hint: string;
  strategy: string;
  walkthrough: string;
}

export interface DecisionLogEntry {
  id: string;
  action: 'buy' | 'return' | 'twist-pay' | 'helper-earn' | 'blocked';
  itemName: string;
  amount: number;
  note: string;
  timestamp: number;
}

export interface TransferItem {
  id: string;
  name: string;
  price: number;
  category: 'need' | 'want';
  description: string;
  impactText: string;
  iconKey: string;
}

export interface ReflectionCard {
  id: string;
  label: string;
  correctType: 'need' | 'want';
  explanation: string;
}
