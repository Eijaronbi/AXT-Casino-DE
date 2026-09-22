export type Game = { id: string; name: string; provider: string; hot?: boolean; fresh?: boolean };
export type Category = { id: string; title: string; count: number; icon: string; games: Game[] };

const game = (id: string, name: string, provider: string, hot = false, fresh = false): Game => ({ id, name, provider, hot, fresh });
const axe = game('bgmng/AxeLegends', 'Axe Legends', 'BGaming', true, true);
const train = game('onlyplay/FruitTrainExpressHoldAndWin', 'Fruit Train Express: Hold & Win', 'Onlyplay', true);
export const categories: Category[] = [
  { id: 'hot', title: 'Hot', count: 148, icon: 'hot', games: [axe, train, game('zillion/BookoftheEgyptianBuffalo', 'Book of the Egyptian Buffalo', 'Zillion', true), game('belatra/HunttheBucks', 'Hunt the Bucks', 'Belatra', true), game('1spin4win/HoldTheGoldHoldAndWin', 'Hold The Gold', '1spin4win', true), game('1spin4win/CashnFruitsFortune243', "Cash’n Fruits Fortune 243", '1spin4win', true)] },
  { id: 'top', title: 'Top', count: 16429, icon: 'top', games: [game('belatra/BlasttheBass', 'Blast the Bass', 'Belatra', true), axe, game('belatra/VoodooCoins', 'Voodoo Coins', 'Belatra', true), train, game('pragmaticexternal/GatesofOlympusSuperScatter', 'Gates of Olympus Super Scatter', 'Pragmatic Play'), game('belatra/MummylandTreasures', 'Mummyland Treasures', 'Belatra', true)] },
  { id: 'slots', title: 'Slots', count: 13943, icon: 'slots', games: [game('bgmng/ElvisFrogTrueways', 'Elvis Frog TRUEWAYS', 'BGaming'), game('1spin4win/HotCoinsAndFruits243', 'Hot Coins & Fruits 243', '1spin4win', true), game('onlyplay/FlameRush', 'Flame Rush', 'Onlyplay', false, true), game('1spin4win/WishAndSpinFortune', 'Wish And Spin Fortune', '1spin4win'), game('1spin4win/LuckyGoldMiner', 'Lucky Gold Miner', '1spin4win', true), game('bfgames/MagneticCoins', 'Magnetic Coins', 'BF Games')] },
  { id: 'axe_original', title: 'Axe Originals', count: 72, icon: 'axe_original', games: [axe, game('inout/ChickenRoad2', 'Chicken Road 2.0', 'InOut', true), game('inout/RumpAndFriends', 'Rump And Friends', 'InOut', false, true), game('inout/LuckyMines', 'Lucky Mines', 'InOut'), game('inout/DragonPots', 'Dragon Pots', 'InOut', false, true), game('inout/ChikenRoad', 'Chicken Road', 'InOut', true)] },
  { id: 'instantwins', title: 'Instant Wins', count: 91, icon: 'instantwins', games: [game('bgmng/BalloonMania', 'Balloon Mania', 'BGaming'), game('100hp/ChickenSubwayChooseandWin', 'Chicken Subway: Choose and Win', '100HP Gaming'), game('bgmng/ElementsOfPower', 'Elements of Power', 'BGaming'), game('bgmng/ChickenShot', 'Chicken Shot', 'BGaming'), game('bsg/PlinkoRush', 'Plinko Rush', 'Betsoft'), game('100hp/Double', 'Double', '100HP Gaming')] },
  { id: 'new', title: 'New', count: 214, icon: 'newGames', games: [axe, game('1spin4win/CoinsnDiamondsFortune', "Coins’n Diamonds Fortune", '1spin4win', false, true), game('bsg/THEVIP', 'THE VIP', 'Betsoft', true, true), game('bgmng/BookOfHiddenTombs', 'Book of Hidden Tombs', 'BGaming', false, true), game('bgmng/MissCherryWildFrames', 'Miss Cherry Wild Frames', 'BGaming', false, true), game('bgmng/FortuneTrioMinionsOfFu', 'Fortune Trio: Minions of Fu', 'BGaming', false, true)] },
  { id: 'bonus_buy', title: 'Bonus Buy', count: 5759, icon: 'bonus_buy', games: [game('1spin4win/CashTheGoldHoldAndWin', 'Cash The Gold Hold And Win', '1spin4win'), game('1spin4win/LuckyBandHoldAndWin', 'Lucky Band Hold And Win', '1spin4win', false, true), game('1spin4win/Lucky1Spin4WinHoldAndWin', 'Lucky 1Spin4Win Hold And Win', '1spin4win'), game('bgmng/AztecMagicBonanza', 'Aztec Magic Bonanza', 'BGaming'), game('1spin4win/MysteryCoin243', 'Mystery Coin 243', '1spin4win'), game('bgmng/DustyDuel', 'Dusty Duel', 'BGaming')] },
  { id: 'jackpot', title: 'Jackpot', count: 4265, icon: 'jackpot', games: [game('voltent/SunofFortune94', 'Sun of Fortune', 'VoltEnt'), game('voltent/BurningStars394', 'Burning Stars 3', 'VoltEnt'), game('voltent/PowerofGodsMedusa94', 'Power of Gods: Medusa', 'VoltEnt'), game('onlyplay/JackPotter', 'Jack Potter', 'Onlyplay', true), game('voltent/FortuneReels94', 'Fortune Reels', 'VoltEnt'), game('voltent/ProsperityPearls94', 'Prosperity Pearls', 'VoltEnt')] },
];
export const allGames = [...new Map(categories.flatMap(c => c.games).map(g => [g.id, g])).values()];
export const gameImage = (game: Game) => `/reference/cdn/axecasino/i/s6/${game.id}.webp`;
export const siteAsset = (path: string) => `/reference/site/${path}`;
export const filters = [
  ['all', 'All Games', 'all'], ['hot', 'Hot', 'hot'], ['top', 'Top', 'top'], ['new', 'New', 'newGames'], ['slots', 'Slots', 'slots'], ['jackpot', 'Jackpot', 'jackpot'], ['bonus_buy', 'Bonus Buy', 'bonus_buy'], ['megaways', 'Megaways', 'megaways'], ['instantwins', 'Instant Wins', 'instantwins'], ['book_slots', 'Books', 'book_slots'], ['fruit_slots', 'Fruits', 'fruit_slots'], ['hold_and_win', 'Hold & Win', 'hold_and_win'], ['table', 'Table', 'table'], ['axe_original', 'Axe Originals', 'axe_original'], ['fishing2', 'Fishing', 'fishing2'],
] as const;
export const promotions = [
  { image: 'welcome', label: 'Welcome Package', title: '3750 EUR + 200 FS' },
  { image: 'live', label: 'Live Casino', title: 'Face the Dealers' },
  { image: 'wins', label: 'Daily Reload', title: 'More Wins Every Day' },
  { image: 'bgaming', label: 'BGaming Tournament', title: 'Achieve Epic Prizes' },
  { image: 'vip', label: 'Become a VIP', title: 'Get a Personal Manager' },
];
export const footerGroups = [
  { title: 'General Info', links: [['About Us', 'about-us'], ['Help Center', 'support'], ['Payments', 'payments'], ['Partners', 'https://axecasinoaffiliates.com/'], ['FAQ', 'faq']] },
  { title: 'Casino', links: [['Top Games', 'games/top'], ['New Games', 'games/new'], ['Hot Games', 'games/hot'], ['Megaways', 'games/megaways'], ['All Games', 'games/all']] },
  { title: 'Live Casino', links: [['Blackjack', 'live/games/blackjack'], ['Baccarat', 'live/games/baccarat'], ['Roulette', 'live/games/roulette'], ['Poker', 'live/games/poker'], ['All Live', 'live/games']] },
  { title: 'Jackpots', links: [['All Jackpots', 'games/jackpot']] },
  { title: 'Security and Privacy', links: [['Terms And Conditions', 'terms-and-conditions'], ['Privacy Policy', 'privacy-policy'], ['Responsible Gambling', 'responsible-gambling'], ['Cookie Policy', 'cookie-policy'], ['Complaints', 'complaints'], ['AML Policy', 'aml-policy']] },
  { title: 'Promotions', links: [['Bonus Terms And Conditions', 'bonus-terms-and-conditions'], ['Casino Promotions', 'promotions'], ['Tournaments', 'tournaments'], ['VIP', 'vip']] },
];
