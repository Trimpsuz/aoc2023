const fs = require('fs');

let sum = 0;

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n');

lines.forEach((line) => {
  line = line.slice(10).replace('\r', '');

  const winningNums = line
    .split(' | ')[0]
    .split(' ')
    .filter((str) => str !== '');
  const myNums = line
    .split(' | ')[1]
    .split(' ')
    .filter((str) => str !== '');

  const myWins = [];

  myNums.forEach((number) => {
    if (winningNums.includes(number)) {
      myWins.push(number);
    }
  });

  const score = 2 ** (myWins.length - 1) >= 1 ? 2 ** (myWins.length - 1) : 0;
  sum += score;
});

console.log(sum);
