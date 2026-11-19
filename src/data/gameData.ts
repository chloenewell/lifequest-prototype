import {
  AvatarId,
  HintBundle,
  PurchaseItem,
  QuestDefinition,
  QuestId,
  ReflectionCard,
  TownLocation,
  TransferItem,
} from '../types/game';

export const STARTING_BUDGET = 50;
export const PLOT_TWIST_COST = 10;
export const HELPER_BONUS = 4;
export const TRANSFER_BUDGET = 20;

export const AVATARS: {
  id: AvatarId;
  name: string;
  title: string;
  favoriteColor: string;
  bgClass: string;
}[] = [
  {
    id: 'maya',
    name: 'Maya',
    title: 'Trail Explorer',
    favoriteColor: '#8B5CF6',
    bgClass: 'bg-violet-50',
  },
  {
    id: 'leo',
    name: 'Leo',
    title: 'Town Skater',
    favoriteColor: '#0EA5E9',
    bgClass: 'bg-sky-50',
  },
  {
    id: 'sam',
    name: 'Sam',
    title: 'Idea Inventor',
    favoriteColor: '#10B981',
    bgClass: 'bg-emerald-50',
  },
  {
    id: 'zara',
    name: 'Zara',
    title: 'Sketch Artist',
    favoriteColor: '#F59E0B',
    bgClass: 'bg-amber-50',
  },
];

export const QUESTS: QuestDefinition[] = [
  {
    id: 'movie-night',
    title: 'Movie Night',
    tagline: 'Plan an awesome movie outing with your best friend Maya.',
    friendName: 'Maya',
    goalSummary:
      'Pick a way to travel, enjoy a movie together, and choose snacks—while keeping money safe for surprises!',
    targetSavingsMin: 15,
    requiredHint: 'Include a travel plan, a movie experience, and a snack plan.',
    accentHex: '#0284C7',
    checklistLabels: {
      travel: 'Way to Get There',
      main: 'Movie Experience',
      food: 'Movie Snacks',
    },
  },
  {
    id: 'birthday-surprise',
    title: 'Birthday Surprise',
    tagline: 'Find a thoughtful birthday gift for Leo while staying on budget.',
    friendName: 'Leo',
    goalSummary:
      'Get to town, choose a meaningful gift (and wrap or card), and share a celebratory treat!',
    targetSavingsMin: 15,
    requiredHint: 'Include travel, a thoughtful gift, and a celebration snack or card.',
    accentHex: '#D97706',
    checklistLabels: {
      travel: 'Way to Get There',
      main: 'Thoughtful Gift',
      food: 'Party Treat or Card',
    },
  },
  {
    id: 'save-big',
    title: 'Save for Something Big',
    tagline: 'Save at least $25 toward your $45 Stellar Skateboard while having fun!',
    friendName: 'Sam',
    goalSummary:
      'You already have $20 in your jar at home. Finish the weekend with at least $25 saved in your wallet!',
    targetSavingsMin: 25,
    requiredHint: 'Keep at least $25 unspent by mixing free fun with smart low-cost picks.',
    accentHex: '#059669',
    checklistLabels: {
      travel: 'Travel Choice',
      main: 'Weekend Activity',
      food: 'Smart Fuel & Snacks',
    },
  },
];

export const TOWN_LOCATIONS: TownLocation[] = [
  {
    id: 'home',
    name: 'Home Base',
    subtitle: 'Free Prep & DIY',
    characterName: 'Mom & Dad',
    characterGreeting:
      'Before heading into town, check the kitchen and craft shelf! Making things at home can save big money.',
    accentColor: '#059669',
    bgTint: 'bg-emerald-50',
    mapPosition: { x: 16, y: 24 },
  },
  {
    id: 'transit',
    name: 'Town Transit',
    subtitle: 'Getting Around',
    characterName: 'Bus Driver Ray',
    characterGreeting:
      'Hop aboard or gear up! How you travel around town changes both your budget and your schedule.',
    accentColor: '#0EA5E9',
    bgTint: 'bg-sky-50',
    mapPosition: { x: 46, y: 22 },
  },
  {
    id: 'theater',
    name: 'Starlight Cinema',
    subtitle: 'Movies & Treats',
    characterName: 'Ticket Host Priya',
    characterGreeting:
      'Welcome to Starlight Cinema! Tickets and fresh popcorn smell amazing—just watch how fast extras add up!',
    accentColor: '#4F46E5',
    bgTint: 'bg-indigo-50',
    mapPosition: { x: 79, y: 26 },
  },
  {
    id: 'store',
    name: 'Sunny Marketplace',
    subtitle: 'Gifts & Supplies',
    characterName: 'Shopkeeper Elena',
    characterGreeting:
      'Take your time browsing! Thoughtful gifts and snacks come at lots of different prices.',
    accentColor: '#EA580C',
    bgTint: 'bg-orange-50',
    mapPosition: { x: 25, y: 66 },
  },
  {
    id: 'park',
    name: 'Riverside Park',
    subtitle: 'Fun & Outdoors',
    characterName: 'Ranger Carlos',
    characterGreeting:
      'Fresh air and friendship cost zero dollars! Or treat yourself to a scoop at the park cart.',
    accentColor: '#16A34A',
    bgTint: 'bg-green-50',
    mapPosition: { x: 68, y: 68 },
  },
];

export const TOWN_ITEMS: PurchaseItem[] = [
  // HOME BASE
  {
    id: 'home-snacks',
    name: 'Homemade Trail Mix & Water',
    price: 0,
    category: 'free-smart',
    locationId: 'home',
    slot: 'food',
    description: 'Pack pretzels, apple slices, and a reusable water bottle from your kitchen.',
    tradeoff: 'Costs $0 and keeps you energized, though it takes 10 minutes to prep at home.',
    iconKey: 'apple',
  },
  {
    id: 'home-card',
    name: 'Handmade Pop-Up Card',
    price: 0,
    category: 'free-smart',
    locationId: 'home',
    slot: 'bonus',
    description: 'Craft a personalized birthday or thank-you card using markers and paper at home.',
    tradeoff: 'Costs $0 and feels super meaningful! Takes creativity instead of cash.',
    iconKey: 'card',
    questTags: ['birthday-surprise'],
  },
  {
    id: 'home-movie',
    name: 'Blanket-Fort Home Movie',
    price: 0,
    category: 'free-smart',
    locationId: 'home',
    slot: 'main',
    description: 'Build a cozy living room blanket fort and stream a movie together.',
    tradeoff: 'Saves $12 compared to the cinema, though you miss the giant theater screen.',
    iconKey: 'tv',
    questTags: ['movie-night', 'save-big'],
  },

  // TOWN TRANSIT
  {
    id: 'transit-bus',
    name: 'Weekend Bus Pass',
    price: 5,
    category: 'need',
    locationId: 'transit',
    slot: 'travel',
    description: 'Ride the sunny town shuttle anywhere you need to go all weekend.',
    tradeoff: 'Fast, dry, and easy for $5—leaves $5 less in your wallet for treats.',
    iconKey: 'bus',
  },
  {
    id: 'transit-bike',
    name: 'Bike Tire Pump & Lock',
    price: 3,
    category: 'need',
    locationId: 'transit',
    slot: 'travel',
    description: 'Top off your bike tires at the corner station and ride with friends.',
    tradeoff: 'Costs $3 ($2 cheaper than the bus) and gets you moving outdoors.',
    iconKey: 'bike',
  },
  {
    id: 'transit-walk',
    name: 'Walk the Greenbelt Trail',
    price: 0,
    category: 'free-smart',
    locationId: 'transit',
    slot: 'travel',
    description: 'Take the shaded walking path across the bridge into town.',
    tradeoff: 'Completely free ($0)! Just give yourself 20 extra minutes to arrive.',
    iconKey: 'footprints',
  },

  // STARLIGHT CINEMA
  {
    id: 'theater-ticket',
    name: 'Movie Ticket',
    price: 12,
    category: 'want',
    locationId: 'theater',
    slot: 'main',
    description: 'A reserved seat for the afternoon animated adventure show.',
    tradeoff: 'Classic big-screen excitement for $12, leaving $38 out of $50 if bought first.',
    iconKey: 'ticket',
    questTags: ['movie-night'],
  },
  {
    id: 'theater-combo',
    name: 'VIP Ticket + Arcade Pass',
    price: 18,
    category: 'want',
    locationId: 'theater',
    slot: 'main',
    description: 'Movie seat plus 10 glowing tokens for the cinema arcade.',
    tradeoff: 'Double the fun upfront, but uses over a third of your whole weekend budget.',
    iconKey: 'gamepad',
    questTags: ['movie-night'],
  },
  {
    id: 'theater-popcorn',
    name: 'Giant Butter Popcorn',
    price: 7,
    category: 'want',
    locationId: 'theater',
    slot: 'food',
    description: 'A huge tub of warm movie theater popcorn to share.',
    tradeoff: 'Classic cinema treat! Costs $7—more than a full meal or bus pass.',
    iconKey: 'popcorn',
    questTags: ['movie-night'],
  },
  {
    id: 'theater-photobooth',
    name: 'Lobby Sticker Wall Pose',
    price: 0,
    category: 'free-smart',
    locationId: 'theater',
    slot: 'bonus',
    description: 'Snap goofy poses in front of the giant cardboard movie backdrop.',
    tradeoff: 'Zero dollars spent, awesome memories saved!',
    iconKey: 'camera',
  },

  // SUNNY MARKETPLACE
  {
    id: 'store-gift-science',
    name: 'Cosmic Lab Gift Set',
    price: 18,
    category: 'want',
    locationId: 'store',
    slot: 'main',
    description: 'A deluxe birthday science kit with glow slime and crystal experiments.',
    tradeoff: 'Big wow factor for Leo! Costs $18, so you will want lower-cost picks elsewhere.',
    iconKey: 'gift',
    questTags: ['birthday-surprise'],
  },
  {
    id: 'store-gift-sketch',
    name: 'Custom Sketchbook & Pens',
    price: 11,
    category: 'want',
    locationId: 'store',
    slot: 'main',
    description: 'A hardcover comic sketchbook with colorful gel pens Leo loves.',
    tradeoff: 'Personal and thoughtful for $11—saves $7 compared to the deluxe kit.',
    iconKey: 'palette',
    questTags: ['birthday-surprise'],
  },
  {
    id: 'store-snacks',
    name: 'Marketplace Snack Box',
    price: 6,
    category: 'want',
    locationId: 'store',
    slot: 'food',
    description: 'Cheesy crackers, fruit gummies, and juice boxes ready to grab and go.',
    tradeoff: 'Super convenient for $6, though packing snacks from home is free.',
    iconKey: 'cookie',
  },
  {
    id: 'store-wrap',
    name: 'Shiny Gift Bag & Ribbon',
    price: 3,
    category: 'want',
    locationId: 'store',
    slot: 'bonus',
    description: 'Bright wrapping paper and a big gold bow.',
    tradeoff: 'Looks festive for $3—or you could craft a card at Home Base for $0.',
    iconKey: 'sparkles',
    questTags: ['birthday-surprise'],
  },

  // RIVERSIDE PARK
  {
    id: 'park-picnic',
    name: 'Free Park Scavenger Hunt',
    price: 0,
    category: 'free-smart',
    locationId: 'park',
    slot: 'main',
    description: 'Team up with friends to spot turtles, bridges, and hidden nature clues.',
    tradeoff: 'Costs $0 and keeps your savings strong while having an outdoor blast!',
    iconKey: 'trees',
    questTags: ['save-big'],
  },
  {
    id: 'park-icecream',
    name: 'Sunny Scoop Ice Cream',
    price: 4,
    category: 'want',
    locationId: 'park',
    slot: 'food',
    description: 'A single-scoop waffle cone from the riverside bicycle cart.',
    tradeoff: 'Refreshing treat for $4—cheaper than theater popcorn ($7)!',
    iconKey: 'icecream',
  },
  {
    id: 'park-boats',
    name: 'Swan Paddle Boat Ride',
    price: 9,
    category: 'want',
    locationId: 'park',
    slot: 'bonus',
    description: 'Pedal a bright blue paddle boat across the pond for 30 minutes.',
    tradeoff: 'Memorable adventure for $9, though it takes a noticeable bite out of savings.',
    iconKey: 'ship',
  },
];

export const NOVA_GUIDANCE: Record<string, Record<QuestId, HintBundle>> = {
  TOWN_EXPLORE: {
    'movie-night': {
      hint: 'Check what you still need for Maya’s Movie Night! Can you find a lower-cost snack or travel choice so you keep a safety cushion?',
      strategy:
        'Try the "Compare Before Buying" strategy: look at Home Base and Riverside Park before spending at the Cinema. Essentials first, extras second!',
      walkthrough:
        'Example plan: Walk the Greenbelt Trail ($0) + Movie Ticket at Starlight Cinema ($12) + Sunny Scoop Ice Cream ($4) or Homemade Trail Mix ($0). Total spent: $12–$16, keeping $34+ safe!',
    },
    'birthday-surprise': {
      hint: 'Compare the gift prices at Sunny Marketplace with DIY options at Home Base. Does a gift have to be the most expensive item to be thoughtful?',
      strategy:
        'Add up your 3 parts (Travel + Gift + Card/Treat) BEFORE buying extras. Always leave $10–$15 untouched in case the weekend surprises you!',
      walkthrough:
        'Example plan: Bike Pump & Lock ($3) + Custom Sketchbook ($11) + Handmade Pop-Up Card at Home ($0) + Park Ice Cream ($4) = $18 total, with $32 still saved!',
    },
    'save-big': {
      hint: 'Remember your goal: finish with at least $25 saved! Which locations in town offer awesome $0 activities?',
      strategy:
        'Use the "Free Fun + One Treat" strategy: pair $0 activities at Home Base or Riverside Park with just one small treat you really care about.',
      walkthrough:
        'Example plan: Walk Greenbelt ($0) + Free Park Scavenger Hunt ($0) + Homemade Trail Mix ($0) + one $4 Ice Cream Cone = only $4 spent, saving $46!',
    },
  },
  PLOT_TWIST: {
    'movie-night': {
      hint: 'You need $10 for replacement science poster supplies before Monday. Look at your Weekend Plan—are there any "Wants" you can return or swap?',
      strategy:
        'Try "Needs First, Swap Wants": return one higher-cost Want (like $7 Popcorn or $5 Bus Pass) for a $0 option, OR complete the $4 Park Helper Cleanup!',
      walkthrough:
        'Example fix: Return Giant Popcorn (+$7 back) and pick Homemade Trail Mix ($0) at Home Base. Now you have enough to pay the $10 supply need and still enjoy the movie!',
    },
    'birthday-surprise': {
      hint: 'A $10 school supply emergency popped up! Can you swap an expensive Want in your backpack for a thoughtful lower-cost choice?',
      strategy:
        'Check your backpack items: swapping an $18 Deluxe Gift for an $11 Custom Sketchbook frees up $7 right away—or earn $4 at the Park Helper station!',
      walkthrough:
        'Example fix: Return Shiny Gift Bag (+$3) or swap Popcorn/Snacks for Home Prep, and pitch in at the Park Helper Cleanup (+$4) to cover the $10 supply need smoothly!',
    },
    'save-big': {
      hint: 'Uh oh—the $10 supply need cuts into your $25 savings goal! Look at how much you have left and see if you can return a Want or earn the $4 Park Helper bonus.',
      strategy:
        'Calculate: (Current Wallet) - $10. If that drops you below $25, return a non-essential Want AND grab the $4 Community Helper bonus!',
      walkthrough:
        'Example fix: If you have $30 left, paying $10 leaves $20 (short of $25). Complete the Park Helper Cleanup (+$4) and return a $4 treat so you end with $28 saved!',
    },
  },
  TRANSFER_CHALLENGE: {
    'movie-night': {
      hint: 'With $20 for the Block Party, ask yourself: What do guests actually NEED first so everyone stays safe and fed?',
      strategy:
        'Add up the two Needs first ($6 Water + $5 Snacks = $11). Subtract $11 from $20 to see your exact "Fun & Comfort" allowance ($9)!',
      walkthrough:
        'Example booth: Water & Cups ($6) + Healthy Snacks ($5) + Colorful Balloons ($5) = $16 spent! Everyone is hydrated, fed, and happy, plus $4 saved for the club!',
    },
    'birthday-surprise': {
      hint: 'You only have $20 this time—less than half of your $50 weekend! Which two items keep guests healthy and comfortable first?',
      strategy:
        'Lock in the two essential Needs ($6 Water + $5 Snacks = $11), then compare the remaining $9 against Shade Tent ($8), Decorations ($6), or Balloons ($5).',
      walkthrough:
        'Example booth: Water & Cups ($6) + Healthy Snacks ($5) + Shade Canopy Tent ($8) = $19 spent! Safe, shady, and well-fed with $1 left over.',
    },
    'save-big': {
      hint: 'Can you meet every essential Need for the Block Party AND still keep a few club dollars saved?',
      strategy:
        'Needs total $11 ($6 Water + $5 Snacks). Picking one $5 Want (Balloons or Music) spends $16 total and leaves $4 in the club jar!',
      walkthrough:
        'Example booth: Water & Cups ($6) + Healthy Snacks ($5) + Music Speaker ($5) = $16 spent, $4 saved for next month’s neighborhood event!',
    },
  },
};

export const TRANSFER_ITEMS: TransferItem[] = [
  {
    id: 'party-water',
    name: 'Drinking Water & Cups',
    price: 6,
    category: 'need',
    description: 'Chilled water dispensers and reusable cups for sunny afternoon guests.',
    impactText: 'Keeps everyone hydrated and energized all afternoon.',
    iconKey: 'droplets',
  },
  {
    id: 'party-snacks',
    name: 'Healthy Snack Packs',
    price: 5,
    category: 'need',
    description: 'Fresh fruit cups, pretzels, and bite-sized sandwiches.',
    impactText: 'Gives hungry neighbors wholesome fuel so nobody gets hangry.',
    iconKey: 'apple',
  },
  {
    id: 'party-tent',
    name: 'Shade Canopy Tent',
    price: 8,
    category: 'want',
    description: 'A breezy blue pop-up canopy to keep the sun off the booth.',
    impactText: 'Super comfortable shade—takes $8 of your $20 budget.',
    iconKey: 'tent',
  },
  {
    id: 'party-decorations',
    name: 'Festive Bunting & Banners',
    price: 6,
    category: 'want',
    description: 'Colorful flags and table banners that brighten the street.',
    impactText: 'Draws neighbors over with cheerful street-party vibes.',
    iconKey: 'flag',
  },
  {
    id: 'party-balloons',
    name: 'Colorful Balloons',
    price: 5,
    category: 'want',
    description: 'Biodegradable party balloons tied around the booth posts.',
    impactText: 'Adds instant excitement for kids at a modest $5 cost.',
    iconKey: 'party',
  },
  {
    id: 'party-music',
    name: 'Portable Music Speaker',
    price: 5,
    category: 'want',
    description: 'Rent a cheerful speaker with an upbeat family playlist.',
    impactText: 'Gets neighbors dancing and smiling while keeping costs low.',
    iconKey: 'music',
  },
];

export const REFLECTION_CARDS: ReflectionCard[] = [
  {
    id: 'ref-poster',
    label: 'Replacement Science Poster ($10)',
    correctType: 'need',
    explanation: 'You needed these supplies for Monday’s school assignment—a true Need!',
  },
  {
    id: 'ref-popcorn',
    label: 'Giant Theater Popcorn ($7)',
    correctType: 'want',
    explanation: 'Popcorn is fun and tasty, not essential—making it a Want you can choose or swap.',
  },
  {
    id: 'ref-water',
    label: 'Block Party Water & Cups ($6)',
    correctType: 'need',
    explanation: 'Guests need water to stay healthy outdoors—always cover Needs first!',
  },
  {
    id: 'ref-balloons',
    label: 'Colorful Balloons ($5)',
    correctType: 'want',
    explanation: 'Balloons add celebration fun, so they fit best after your Needs are covered.',
  },
];
