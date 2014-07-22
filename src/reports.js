// bot reports of events

var reports = {
  dmgSource: function (data) {
    writeConsole(guy.name.toUpperCase() + ': ' + getTimestamp() + ' Took ' + guy.lastDamageAmmount + ' damage from "' + guy.lastDamageSource + '".');
  },
  inventory: function () {
    // todo: this very time-consuming task
  },
  health: function () {
    writeConsole(guy.name.toUpperCase() + ': ' + getTimestamp() + ' Has ' + guy.health + '/' + guy.maxHealth + ' HP.');
  },
  drawMap: function () {
    var map = world[guy.currentWorld].map;

    for (var i = 0; i < map.length; i++) {
      writeConsole(map[i].join(' '));
    }
  }
};
