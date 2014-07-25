// enemies and other encounters

var encounters = {
  Rat: {
    symbol: 'r',
    name: 'Sick Rat',
    level: 1,
    health: 5,
    dmg: 1
  },
  wolf: {
    symbol: 'w',
    name: 'Feral Wolf',
    level: 1,
    health: 10,
    dmg: 1
  },
  alpha: {
    symbol: 'a',
    name: 'Alpha Wolf',
    level: 2,
    health: 16,
    dmg: 2
  },
  ghost: {
    symbol: 'g',
    name: 'Spooky Ghost',
    level: 2,
    health: 1,
    dmg: 10
  },
  lackey: {
    symbol: 'l',
    name: 'Eight Finger Triad Lackey',
    level: 3,
    health: 28,
    dmg: 3,
    loot: {name: 'Retractable Kneecapper', type: 'wep', dmg: 2}
  },
  spider: {
    symbol: 's',
    name: 'Rather Large Spider',
    level: 3,
    health: 14,
    dmg: 4
  },
  whiteTiger: {
    symbol: 'H',
    name: 'White Tiger Huajaka',
    level: 50,
    health: 820,
    dmg: 55,
    loot: {name: 'Huajaka\'s Razor Claw' , type: 'wep', dmg: 35}
  }
};