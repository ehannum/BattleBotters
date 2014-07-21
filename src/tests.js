// tests for AI on game update loop

var tests = {
  always: function () {
    return true;
  },
  facing: function (tile) {
    var testWorld = world[guy.currentWorld];
    if (testWorld[guy.position[0]+guy.position[2][0]] === undefined) return false;
    if (testWorld[guy.position[0]+guy.position[2][0]][guy.position[1]+guy.position[2][1]] == tile) {
      return true;
    }
    return false;
  },
  dead: function () {
    if (!guy.alive) {
      return true;
    }
    return false;
  }
};