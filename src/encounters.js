// enemies and other encounters

var encounters = {
  Rat: {
    symbol: 'R',
    name: 'Sick Rat',
    level: 1,
    health: 5,
    dmg: 1
  },
  wolf: {
    symbol: 'W',
    name: 'Feral Wolf',
    level: 1,
    health: 10,
    dmg: 1
  },
  alpha: {
    symbol: 'A',
    name: 'Alpha Wolf',
    level: 2,
    health: 16,
    dmg: 2
  },
  ghost: {
    symbol: 'G',
    name: 'Spooky Ghost',
    level: 2,
    health: 1,
    dmg: 10
  },
  lackey: {
    symbol: 'L',
    name: 'Eight Finger Triad Lackey',
    level: 3,
    health: 28,
    dmg: 3,
    loot: {name: 'Retractable Kneecapper', type: 'wep', dmg: 2}
  },
  lionTurtle: {
    symbol: 'A',
    name: 'White Tiger Huajaka',
    level: 50,
    health: 820,
    dmg: 55,
    loot: {name: 'Huajaka\'s Razor Claw' , type: 'wep', dmg: 35}
  }
};