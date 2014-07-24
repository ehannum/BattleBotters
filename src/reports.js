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
    var mapData = world[guy.currentWorld].map;

    var borderLength = new Array(mapData[0].length+1);
    border = '@' + borderLength.join('--') + '-@';

    writeConsole(border);
    for (var i = 0; i < mapData.length; i++) {
      var map = mapData[i].join(' ').replace(/1/g, '<span class="blue">~</span>').replace(/0/g, '<span class="black">.</span>');
      writeConsole('| ' + map + ' |');
    }
    writeConsole(border);
  }
};
