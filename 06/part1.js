const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

const ways = [];

const games = file
  .trim()
  .split('\n')[1]
  .split('   ')
  .map((str) => str.trim())
  .slice(1)
  .map((distance, index) => ({
    time: +file
      .trim()
      .split('\n')[0]
      .split('     ')
      .map((str) => str.trim())
      .slice(1)[index],
    distance: +distance,
  }));

games.forEach((game) => {
  let _ways = 0;

  for (i = 0; i <= game.time; i++) {
    let speed = i;
    let remainingTime = game.time - i;

    let distance = speed * remainingTime;
    if (distance > game.distance) _ways++;
  }
  ways.push(_ways);
});

console.log(ways.reduce((acc, val) => acc * val, 1));
