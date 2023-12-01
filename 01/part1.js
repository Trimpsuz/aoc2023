const fs = require('fs');

let sum = 0;

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n');

lines.forEach((line) => {
  const numbers = line.match(/\d/g);
  let digit = numbers[0] + numbers[numbers.length - 1];
  sum += parseInt(digit);
});

console.log(sum);
