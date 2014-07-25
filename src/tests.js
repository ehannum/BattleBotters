// tests for AI on game update loop

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
  }
};