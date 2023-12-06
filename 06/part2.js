const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

let ways = 0;

const game = {
  time: +file
    .trim()
    .split('\n')[0]
    .split('     ')
    .map((str) => str.trim())
    .slice(1)
    .reduce((acc, val) => acc + val, 0),
  distance: +file
    .trim()
    .split('\n')[1]
    .split('   ')
    .map((str) => str.trim())
    .slice(1)
    .reduce((acc, val) => acc + val, 0),
};

for (i = 0; i <= game.time; i++) {
  let speed = i;
  let remainingTime = game.time - i;

  let distance = speed * remainingTime;
  if (distance > game.distance) ways++;
}

console.log(ways);
