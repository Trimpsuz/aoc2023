const fs = require('fs');

let sum = 0;

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n');

lines.forEach((line) => {
  line = line
    .replaceAll('one', 'one1one')
    .replaceAll('two', 'two2two')
    .replaceAll('three', 'three3three')
    .replaceAll('four', 'four4four')
    .replaceAll('five', 'five5five')
    .replaceAll('six', 'six6six')
    .replaceAll('seven', 'seven7seven')
    .replaceAll('eight', 'eight8eight')
    .replaceAll('nine', 'nine9nine');

  const numbers = line.match(/\d/g);
  let digit = numbers[0] + numbers[numbers.length - 1];
  sum += parseInt(digit);
});

console.log(sum);
