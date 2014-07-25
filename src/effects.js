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
    if (enemy && enemy.health <= 0) {
      setFacingTile(0);
      console.log('killed ' + enemy.name);
      enemy = null;
    }
  }
};