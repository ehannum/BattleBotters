// bot responses when tests are true

var responses = {
  walkForward: function () {
    var facing = getFacingTile();
    if ((facing === 0 || facing === 1) && !moved) {
      guy.position[0] += guy.position[2][0];
      guy.position[1] += guy.position[2][1];
      moved = true;
    }
  },
  die: function () {
    takeDamage(guy.maxHealth, guy.name);
  },
  turnRight: function () {
    var directions = [[0, -1], [-1, 0], [0, 1], [1, 0]];
    for (var i = 0; i < directions.length; i++) {
      if (guy.position[2][0] === directions[i][0] && guy.position[2][1] === directions[i][1]) {
        if (i === 3) {
          guy.position[2][0] = directions[0][0];
          guy.position[2][1] = directions[0][1];
        } else {
          guy.position[2][0] = directions[i+1][0];
          guy.position[2][1] = directions[i+1][1];
        }
        break;
      }
    }
  },
  turnLeft: function () {
    var directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    for (var i = 0; i < directions.length; i++) {
      if (guy.position[2][0] === directions[i][0] && guy.position[2][1] === directions[i][1]) {
        if (i === 3) {
          guy.position[2][0] = directions[0][0];
          guy.position[2][1] = directions[0][1];
        } else {
          guy.position[2][0] = directions[i+1][0];
          guy.position[2][1] = directions[i+1][1];
        }
        break;
      }
    }
  },
  turnAround: function () {
    guy.position[2][0] *= -1;
    guy.position[2][1] *= -1;
  },
  attack: function () {
    var enemy = getFacingTile();
    if (!attacked && typeof enemy === 'object') {
      enemy.health -= guy.inventory.weapon.dmg + Math.floor(guy.brawn);
      attacked = true;
      guy.brawn += 0.05;
    }
  },
  // todo: make this work somehow
  cast: function (spell) {
    if (guy.inventory.spellbook[spell].cost > guy.mana) return;
    if (!attacked && typeof enemy === 'object' && guy.inventory.spellbook[spell].dmg) {
      enemy.health -= guy.inventory.spellbook[spell].dmg + Math.floor(guy.brains);
      attacked = true;
      guy.brawn += 0.05;
    } else if (!attackedguy.inventory.spellbook[spell].heal) {
      guy.health += guy.inventory.spellbook[spell].heal;
    }
    guy.mana -= guy.inventory.spellbook[spell].cost;
  },
  nothing: function () {
    // lol no
  }
};