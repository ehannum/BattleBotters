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
  tookDamage: function () {
    if (guy.health < comparison.health) {
      return true;
    }
    return false;
  },
  leveledUp: function () {
    if (guy.level < comparison.level) {
      return true;
    }
    return false;
  }
};