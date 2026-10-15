// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'shinobi-quiz-battle',            // your group's game, lower case with hyphens, for example shelf-climb
  name: 'Shinobi Quiz Battle',            // the name players will see
  team: 'TEAM 2 BSCS 3-1',            // your group's name and section, for example Bookworms (3-1)
  developer: 'Jerick-md',       // YOUR GitHub username: this build is yours
  description: 'Answer questions, collect Chakra, and compete for the highest Ninja Rank.',     // one sentence about how the game is played
  min_players: 2,               // change to the limits your game is designed for
  max_players: 50,
  version: pkg.version,         // read from package.json, do not edit here
};
