console.log('                           11000111 1                           \n                      111111     11111011                       \n                   1111               0000 111                  \n                 101                   0001  10                 \n               101                       100  11                \n              01        11        111111  1001 11               \n             0     111000111    101    11011101 01              \n            11    11111       101        1    11 0              \n            0              1111                0  0             \n           0011111  11111111                   10001            \n          101    11111                          0000            \n          11                            11      00000           \n           0                    100000000       100000          \n           11                  11  1000000      100000          \n            0    1111         1     1000000      0000001        \n            11  11 1000       1     1000000      00000 01       \n             001    1000      10  100000000      00000  0       \n             111    00001      0 100000000       00000   0      \n              000 1000000       000000000        0001     0     \n               01  000000       01 111          10000 10111     \n               0 00000000                       0 101 1110      \n            11111  1000                      1101  0  111       \n            10  0                           0  0  1  001        \n              0 10                         11  0  0 10          \n               11 1                        0  11 0111           \n  1011110111111 01000                     0000000  100001       \n101110110    10000000001               10000001    000000011    \n 111011 10011   00000000000011111  110000011     100000000  0   \n          11101  00000000000000 1110000000      000000000   11  \n              1101     00000000     00000    11000000001    11  \n                 11      100000  11 1000  1001 100001        0  \n                   0 100000  00  01   001 00    0000         0  \n                  11  11001 1000101    0111      001         0  \n                  0         1  0  0    0          0111111111101 \n                  0         11 01  111 01       1111         11 \n                 101        11 110   1110   11111  0         10 \n                 0  111111111111 10     011111      0         0 \n                10           00    01   11           0        0 \n                0            00     111110           10       0 \n                0            00         10            01      11\n               11            00          10            01     11\n               0             01           0             0000   0\n              10             0            11             0000  0\n              0              0             0            10000  0\n              0              0             0             0000011\n             11 10000000001  01            100000000      00010 \n              01000000000001 0              00000000001   1111  \n              1  000000000001               1  00000000011111   \n                 0000000000                    00000001  11     \n                  10000001                    0 0011   111      \n                                                1111111         \nWelcome to the dev console! Your character is globally scoped, go nuts!');

var guy = {alive: false};
var enemy = null;
var gameloop;
var botCount = 1;

// can only move and attack once per turn
var tookAction = false;
var moved = false;
var attacked = false;

var otherwise = function(){};

for (var i = 0; i < 2; i++) {
  $('.actions').prepend(dropdowns.action);
}

var Guy = function (name) {
  if (name) {
    this.name = name;
  } else {
    this.name = 'Robo-' + ('0000' + botCount).slice(-4);
    botCount++;
  }

  this.level = 1;
  this.exp = 0;
  this.alive = true;

  this.brawn = 1;
  this.brains = 1;
  this.grit = 1;

  this.health = 20;
  this.mana = 10;

  this.maxHealth = 20;
  this.maxMana = 10;

  // [x, y, direction]
  // direction is for movement and hit testing [-up/+down, -left/+right]
  // north = [-1, 0], south = [1, 0], west = [0, -1], east = [0, 1]
  this.position = [0, 0, [-1, 0]];
  this.currentWorld = '';
  this.lastDamageSource = '';
  this.lastDamageAmmount = 0;

  this.ai = [];

  this.reporter = [];

  this.inventory = {
    healthPotions: 5,
    weapon: {name: 'Basic Sword', type: 'wep', dmg: 1}
  };

  this.spellbook = {
    fireball: {name: 'Fireball', dmg: 2, cost: 2}
  };
};

// World Data

var world = {
  babbyHills: {
    name: 'Babby Hills',
    level: 1,
    map:[
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,1,1,1,1,1,1,1,1]
    ]
  }
};

// Game Functions

$('.action-if').on('change', function () {
  var dropdown = dropdowns[$(this).val()];
  if (dropdown) {
    $(this).siblings('.specific').append(dropdown);
  } else {
    $(this).siblings('.specific').html('');
  }
});

$('.play').click(function (e) {
  if (guy.alive) return;

  guy = new Guy($('.bot-name').val());
  $('.bot-name').val('');

  startGame();
});

var startGame = function () {
  guy.currentWorld = 'babbyHills';
  var mid = Math.floor(world[guy.currentWorld].map.length/2);

  enemy = null;

  writeConsole('SYSTEM: ' + guy.name + ' enterned the world of Xanthor in The Babby Hills facing North.');
  guy.position[0] = mid;
  guy.position[1] = mid;

  // read dropdowns
  // actions

  var guyActions = $('.action');

  var actionsSoFar = [];

  for (var i = 0; i < guyActions.length; i++) {
    var trigger = $(guyActions[i]).children('.action-if').val();
    var arg = $(guyActions[i]).children('.specific').children('.action-arg').val();
    var response = $(guyActions[i]).children('.action-then').val();

    var actionHash = '' + trigger + arg + response;
    if (actionsSoFar.indexOf(actionHash) !== -1) break;
    actionsSoFar.push(actionHash);

    guy.ai.push(makeAction(trigger, arg, response));
  }

  otherwise = responses[$('.otherwise').val()];

  //reports

  var guyReports = $('.report');

  for (var j = 0; j < guyReports.length; j++) {
    var cause = $(guyReports[j]).children('.report-if').val();
    var report = $(guyReports[j]).children('.report-then').val();

    var reportHash = '' + cause + report;
    if (actionsSoFar.indexOf(reportHash) !== -1) break;
    actionsSoFar.push(reportHash);

    guy.reporter.push(makeReport(cause, report));
  }

  gameloop = setInterval(update, 1000);
};

var makeAction = function (trigger, arg, response) {
  return function () {
    if (tests[trigger](arg)) {
      responses[response]();
      tookAction = true;
    }
  };
};

var makeReport = function (cause, report) {
  return function () {
    if (tests[cause]()) {
      reports[report]();
    }
  };
};

var endGame = function () {
  writeConsole('SYSTEM: ' + guy.name + ' has died. Game Over');

  // clear enemies from the map
  var dirtyWorld = world[guy.currentWorld].map;

  for (var i = 0; i < dirtyWorld.length; i++) {
    for (var j = 0; j < dirtyWorld[i].length; j++) {
      if (dirtyWorld[i][j] === 3) {
        dirtyWorld[i][j] = 0;
      }
    }
  }

  clearInterval(gameloop);
};

// Update loop. Actions repeated every second by default.
var update = function () {
  tookAction = false;
  attacked = false;
  moved = false;

  for (var i = 0; i < guy.ai.length; i++) {
    guy.ai[i]();
  }

  if (!tookAction) {
    otherwise();
  }

  for (var effect in effects) {
    effects[effect]();
  }

  for (var j = 0; j < guy.reporter.length; j++) {
    guy.reporter[j]();
  }

  randomEncounter();
  if (enemy) {
    fight();
  }
};

// helper functions

var writeConsole = function (text) {
  $('.console').append('<br /><span>' + text + '</span>');
  $('.console').scrollTop($('.console')[0].scrollHeight);
};

var getTimestamp = function () {
  var date = new Date();
  return '[' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + ']';
};

var takeDamage = function (damage, source) {
  if (guy.health > 0) {
    guy.health -= damage;
    guy.lastDamageAmmount = damage;
    guy.lastDamageSource = source;
  }
};

var getFacingPosition = function () {
  var testWorld = world[guy.currentWorld].map;
  if (testWorld[guy.position[0]+guy.position[2][0]] === undefined) return null;
  return [guy.position[0]+guy.position[2][0], guy.position[1]+guy.position[2][1]];
};

var getFacingTile = function () {
  var position = getFacingPosition();
  return world[guy.currentWorld].map[position[0]][position[1]];
};

var setFacingTile = function (num) {
  var facingPosition = getFacingPosition();
  world[guy.currentWorld].map[facingPosition[0]][facingPosition[1]] = num;
};

// combat

var randomEncounter = function () {
  // Yes, this game uses random encounters
  // but how is the player going to tell the difference?

  if (Math.ceil(Math.random()*20) === 1 && tests.facing(0)) {
    var randomEnemies = getEnemies('level', world[guy.currentWorld].level);
    var randomEnemy = randomEnemies[Math.floor(Math.random(randomEnemies.length))];
    startEncounter(randomEnemy);

    // actually create the enemy in front of the player
    setFacingTile(3);
  }
};

var startEncounter = function (encounter) {
  enemy = Object.create(encounter);
  console.log('in combat with ' + enemy.name);
};

var getEnemies = function (key, value) {
  var results = [];

  for (var enemyName in encounters) {
    if (encounters[enemyName][key] === value) {
      results.push(encounters[enemyName]);
    }
  }

  return results;
};

var fight = function () {
  takeDamage(enemy.dmg, enemy.name);
};