// global effects

var effects = {
  swimming: function () {
    if (world[guy.currentWorld].map[guy.position[1]][guy.position[0]] === 1) {
      takeDamage(guy.maxHealth, 'drowning');
    }
  },
  die: function () {
    if (guy.health <= 0 || guy.alive === false) {
      guy.health = 0;
      guy.alive = false;
      endGame();
    }
  },
  kill: function () {
    var enemy = getFacingTile();
    if (enemy && typeof enemy === 'object' && enemy.health <= 0) {
      setFacingTile(0);
      console.log('killed ' + enemy.name);
      guy.exp += enemy.level;
    }
  },
  levelUp: function () {
    if (guy.exp > guy.level*11 && guy.level < 50) {
      guy.level++;
      guy.exp = 0;
      guy.maxHealth += Math.floor(guy.grit);
      guy.maxMana += Math.floor(guy.brains);
      guy.health = guy.maxHealth;
      guy.mana = guy.maxMana;
    }
  }
};