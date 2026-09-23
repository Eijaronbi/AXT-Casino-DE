export type Game = { id: string; name: string; provider: string; hot?: boolean; fresh?: boolean };
export type Category = { id: string; title: string; count: number; icon: string; games: Game[] };

const game = (id: string, name: string, provider: string, hot = false, fresh = false): Game => ({ id, name, provider, hot, fresh });
const axe = game('bgmng/AxeLegends', 'Axe Legends', 'BGaming', true, true);
const train = game('onlyplay/FruitTrainExpressHoldAndWin', 'Fruit Train Express: Hold & Win', 'Onlyplay', true);
export const categories: Category[] = [
  { id: 'hot', title: 'Heiß', count: 148, icon: 'hot', games: [axe, train, game('zillion/BookoftheEgyptianBuffalo', 'Book of the Egyptian Buffalo', 'Zillion', true), game('belatra/HunttheBucks', 'Hunt the Bucks', 'Belatra', true), game('1spin4win/HoldTheGoldHoldAndWin', 'Hold The Gold', '1spin4win', true), game('1spin4win/CashnFruitsFortune243', "Cash’n Fruits Fortune 243", '1spin4win', true)] },
  { id: 'top', title: 'Top', count: 16429, icon: 'top', games: [game('belatra/BlasttheBass', 'Blast the Bass', 'Belatra', true), axe, game('belatra/VoodooCoins', 'Voodoo Coins', 'Belatra', true), train, game('pragmaticexternal/GatesofOlympusSuperScatter', 'Gates of Olympus Super Scatter', 'Pragmatic Play'), game('belatra/MummylandTreasures', 'Mummyland Treasures', 'Belatra', true)] },
  { id: 'slots', title: 'Slots', count: 13943, icon: 'slots', games: [game('bgmng/ElvisFrogTrueways', 'Elvis Frog TRUEWAYS', 'BGaming'), game('1spin4win/HotCoinsAndFruits243', 'Hot Coins & Fruits 243', '1spin4win', true), game('onlyplay/FlameRush', 'Flame Rush', 'Onlyplay', false, true), game('1spin4win/WishAndSpinFortune', 'Wish And Spin Fortune', '1spin4win'), game('1spin4win/LuckyGoldMiner', 'Lucky Gold Miner', '1spin4win', true), game('bfgames/MagneticCoins', 'Magnetic Coins', 'BF Games')] },
  { id: 'axe_original', title: 'AXT Originale', count: 72, icon: 'axe_original', games: [axe, game('inout/ChickenRoad2', 'Chicken Road 2.0', 'InOut', true), game('inout/RumpAndFriends', 'Rump And Friends', 'InOut', false, true), game('inout/LuckyMines', 'Lucky Mines', 'InOut'), game('inout/DragonPots', 'Dragon Pots', 'InOut', false, true), game('inout/ChikenRoad', 'Chicken Road', 'InOut', true)] },
  { id: 'instantwins', title: 'Sofortgewinne', count: 91, icon: 'instantwins', games: [game('bgmng/BalloonMania', 'Balloon Mania', 'BGaming'), game('100hp/ChickenSubwayChooseandWin', 'Chicken Subway: Choose and Win', '100HP Gaming'), game('bgmng/ElementsOfPower', 'Elements of Power', 'BGaming'), game('bgmng/ChickenShot', 'Chicken Shot', 'BGaming'), game('bsg/PlinkoRush', 'Plinko Rush', 'Betsoft'), game('100hp/Double', 'Double', '100HP Gaming')] },
  { id: 'new', title: 'Neu', count: 214, icon: 'newGames', games: [axe, game('1spin4win/CoinsnDiamondsFortune', "Coins’n Diamonds Fortune", '1spin4win', false, true), game('bsg/THEVIP', 'THE VIP', 'Betsoft', true, true), game('bgmng/BookOfHiddenTombs', 'Book of Hidden Tombs', 'BGaming', false, true), game('bgmng/MissCherryWildFrames', 'Miss Cherry Wild Frames', 'BGaming', false, true), game('bgmng/FortuneTrioMinionsOfFu', 'Fortune Trio: Minions of Fu', 'BGaming', false, true)] },
  { id: 'bonus_buy', title: 'Bonuskauf', count: 5759, icon: 'bonus_buy', games: [game('1spin4win/CashTheGoldHoldAndWin', 'Cash The Gold Hold And Win', '1spin4win'), game('1spin4win/LuckyBandHoldAndWin', 'Lucky Band Hold And Win', '1spin4win', false, true), game('1spin4win/Lucky1Spin4WinHoldAndWin', 'Lucky 1Spin4Win Hold And Win', '1spin4win'), game('bgmng/AztecMagicBonanza', 'Aztec Magic Bonanza', 'BGaming'), game('1spin4win/MysteryCoin243', 'Mystery Coin 243', '1spin4win'), game('bgmng/DustyDuel', 'Dusty Duel', 'BGaming')] },
  { id: 'jackpot', title: 'Jackpot', count: 4265, icon: 'jackpot', games: [game('voltent/SunofFortune94', 'Sun of Fortune', 'VoltEnt'), game('voltent/BurningStars394', 'Burning Stars 3', 'VoltEnt'), game('voltent/PowerofGodsMedusa94', 'Power of Gods: Medusa', 'VoltEnt'), game('onlyplay/JackPotter', 'Jack Potter', 'Onlyplay', true), game('voltent/FortuneReels94', 'Fortune Reels', 'VoltEnt'), game('voltent/ProsperityPearls94', 'Prosperity Pearls', 'VoltEnt')] },
];
export const allGames = [...new Map(categories.flatMap(c => c.games).map(g => [g.id, g])).values()];
export const gameImage = (game: Game) => `/reference/cdn/axecasino/i/s6/${game.id}.webp`;
export const siteAsset = (path: string) => `/reference/site/${path}`;
export const filters = [
  ['all', 'Alle Spiele', 'all'], ['hot', 'Heiß', 'hot'], ['top', 'Top', 'top'], ['new', 'Neu', 'newGames'], ['slots', 'Slots', 'slots'], ['jackpot', 'Jackpot', 'jackpot'], ['bonus_buy', 'Bonuskauf', 'bonus_buy'], ['megaways', 'Megaways', 'megaways'], ['instantwins', 'Sofortgewinne', 'instantwins'], ['book_slots', 'Bücher', 'book_slots'], ['fruit_slots', 'Früchte', 'fruit_slots'], ['hold_and_win', 'Hold & Win', 'hold_and_win'], ['table', 'Tischspiele', 'table'], ['axe_original', 'AXT Originale', 'axe_original'], ['fishing2', 'Angeln & Jagd', 'fishing2'],
] as const;
export const promotions = [
  { image: 'welcome', label: 'Willkommenspaket', title: '3750 EUR + 200 FS' },
  { image: 'live', label: 'Live-Casino', title: 'Sich den echten Croupiers stellen' },
  { image: 'wins', label: 'Täglicher Reload', title: 'Mehr Gewinne jeden Tag' },
  { image: 'bgaming', label: 'BGaming-Turnier', title: 'Wahrhaft epische Preise erzielen' },
  { image: 'vip', label: 'VIP werden', title: 'Erhalte einen persönlichen Manager' },
];
export const footerGroups = [
  { title: 'Allgemeine Informationen', links: [['Über uns', 'de/about-us'], ['Hilfezentrum', 'de/support'], ['Zahlungen', 'de/payments'], ['Partner', 'https://axecasinoaffiliates.com/'], ['FAQ', 'de/faq']] },
  { title: 'Casino', links: [['Top-Spiele', 'de/games/top'], ['Neue Spiele', 'de/games/new'], ['Beliebte Spiele', 'de/games/hot'], ['Megaways', 'de/games/megaways'], ['Alle Spiele', 'de/games/all']] },
  { title: 'Live-Casino', links: [['Blackjack', 'de/live/games/blackjack'], ['Baccarat', 'de/live/games/baccarat'], ['Roulette', 'de/live/games/roulette'], ['Poker', 'de/live/games/poker'], ['Alle Live-Spiele', 'de/live/games']] },
  { title: 'Jackpots', links: [['Alle Jackpots', 'de/games/jackpot']] },
  { title: 'Sicherheit und Datenschutz', links: [['Allgemeine Geschäftsbedingungen', 'de/terms-and-conditions'], ['Datenschutzrichtlinie', 'de/privacy-policy'], ['Verantwortungsbewusstes Spielen', 'de/responsible-gambling'], ['Cookie-Richtlinie', 'de/cookie-policy'], ['Beschwerden', 'de/complaints'], ['AML-Richtlinie', 'de/aml-policy']] },
  { title: 'Aktionen', links: [['Bonusbedingungen', 'de/bonus-terms-and-conditions'], ['Casino-Aktionen', 'de/promotions'], ['Turniere', 'de/tournaments'], ['VIP', 'de/vip']] },
];
