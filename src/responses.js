// bot responses when tests are true

var responses = {
  walkForward: function () {
    guy.position[0] += guy.position[2][0];
    guy.position[1] += guy.position[2][1];
  },
  die: function () {
    takeDamage(guy.maxHealth, guy.name);
  },
  turnLeft: function () {
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
  turnRight: function () {
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
    enemy.health -= guy.inventory.weapon.dmg;
  }
};