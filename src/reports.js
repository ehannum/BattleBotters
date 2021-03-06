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
    var oldTile = mapData[guy.position[0]][guy.position[1]];
    mapData[guy.position[0]][guy.position[1]] = '#';

    var borderLength = new Array(mapData[0].length+1);
    border = '@' + borderLength.join('--') + '-@';

    writeConsole(guy.name.toUpperCase() + ': Current map of ' + world[guy.currentWorld].name);
    writeConsole(border);
    for (var i = 0; i < mapData.length; i++) {
      var map = mapData[i].join(' ');

      // map formatting
      map = map.replace(/0/g, '<span class="black">.</span>');
      map = map.replace(/1/g, '<span class="blue">~</span>');
      map = map.replace(/2/g, '<span class="white">=</span>');
      map = map.replace(/\[object Object\]/g, '<span class="red">M</span>');

      writeConsole('| ' + map + ' |');
    }
    writeConsole(border);
    mapData[guy.position[0]][guy.position[1]] = oldTile;
  },
  botStats: function () {
    writeConsole(guy.name.toUpperCase() + ': ' + getTimestamp() + ' character stats:');
    writeConsole('Level: ' + guy.level);
    writeConsole('Health: ' + guy.health + '/' + guy.maxHealth);
    writeConsole('Mana: ' + guy.mana + '/' + guy.maxMana);
    writeConsole('Brains: ' + Math.floor(guy.brains));
    writeConsole('Brawn: ' + Math.floor(guy.brawn));
    writeConsole('Grit: ' + Math.floor(guy.grit));
  }
};
