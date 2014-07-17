var ai = [];

var startGame = function () {
  var guyActions = $('.action');

  for (var i = 0; i < guyActions.length; i++) {
    var trigger = guyActions[i].children('.action-if').val();
    var arg = guyActions[i].children('.action-arg').val();
    var response = guyActions[i].children('.action-then').val();

    ai.push(function () {
      if (tests[trigger](arg)) {
        actions[response]();
      }
    });
  }
};

var update = function () {
  for (var i = 0; i < ai.length; i++) {
    ai[i]();
  }
};

var tests = {
  facing: function (tile) {
    if (/*tile in front of guy === tile*/1) {
      return true;
    }
    return false;
  }
};

var effects = {
  die: function () {

  }
};

