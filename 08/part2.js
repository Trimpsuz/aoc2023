const fs = require('fs');
const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

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

const startNodes = nodes.filter((obj) => obj['node'].endsWith('A'));

const totalSteps = [];

startNodes.forEach((node) => {
  let i = 0;
  let steps = 0;
  let findNext = '';
  while (true) {
    if (i > instructions.length - 1) {
      i = 0;
    }
    const direction = instructions[i];
    if (direction == 'L') {
      findNext = node.left;
    } else {
      findNext = node.right;
    }
    node = nodes.find((obj) => obj['node'] === findNext);
    i++;
    steps++;
    if (node.node.endsWith('Z')) {
      totalSteps.push(steps);
      break;
    }
  }
});

console.log(lcmAll(totalSteps));
