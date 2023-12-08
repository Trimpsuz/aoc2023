const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

const instructions = file
  .split('\n')
  .map((line) => line.trim())[0]
  .split('');

const nodes = [];

file
  .split('\n')
  .map((line) => line.trim())
  .splice(2)
  .forEach((line) => {
    nodes.push({
      node: line.split(' = ')[0],
      left: line.split(' = ')[1].replace('(', '').replace(')', '').split(', ')[0],
      right: line.split(' = ')[1].replace('(', '').replace(')', '').split(', ')[1],
    });
  });

let steps = 0;
let findNext = 'AAA';
let i = 0;

while (true) {
  let node = nodes.find((obj) => obj['node'] === findNext);

  if (node.node == 'ZZZ') {
    break;
  }

  if (i > instructions.length - 1) {
    i = 0;
  }
  const direction = instructions[i];

  if (direction == 'L') {
    findNext = node.left;
  } else {
    findNext = node.right;
  }
  i++;
  steps++;
}

console.log(steps);
