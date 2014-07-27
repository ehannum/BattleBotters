// tests used by AI and reports on game update loop

var comparison = {};

var tests = {
  always: function () {
    return true;
  },
  never: function () {
    return false;
  },
  facing: function (tile) {
    if (tile == 3 && typeof getFacingTile() === 'object') return true;
    var facingPosition = getFacingPosition();
    if (facingPosition === null) return false;

    return tile == getFacingTile();
  },
  dead: function () {
    if (!guy.alive) {
      return true;
    }
    return false;
  },
  takeDamage: function () {
    if (guy.health < comparison.health) {
      return true;
    }
    return false;
  },
  attack: function () {
    if (!attacked) {
      return true;
    }
    return false;
  },
  levelUp: function () {
    if (guy.level > comparison.level) {
      return true;
    }
    return false;
  }
};