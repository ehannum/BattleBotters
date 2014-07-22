// tests for AI on game update loop

var tests = {
  // todo: replace always with "otherwise"
  always: function () {
    return true;
  },
  facing: function (tile) {
    var facingPosition = getFacingPosition();
    if (facingPosition === null) return false;
    var facingTile = world[guy.currentWorld].map[facingPosition[0]][facingPosition[1]];

    return tile == facingTile;
  },
  dead: function () {
    if (!guy.alive) {
      return true;
    }
    return false;
  }
};