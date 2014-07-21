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
  }
};
