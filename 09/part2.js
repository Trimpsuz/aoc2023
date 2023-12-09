const fs = require('fs');

let sum = 0;

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n');

lines.forEach((line) => {
  let nums = line.split(' ').map((num) => +num.trim());

  let firstNums = [];
  firstNums.push(nums[0]);
  let increaseArray = [];

  for (let i = 1; i < nums.length; i++) {
    const increaseAmount = nums[i] - nums[i - 1];
    increaseArray.push(increaseAmount);
  }
  firstNums.push(increaseArray[0]);

  while (!increaseArray.every((element) => element === 0)) {
    const tempArray = increaseArray;
    increaseArray = [];
    for (let i = 1; i < tempArray.length; i++) {
      const increaseAmount = tempArray[i] - tempArray[i - 1];
      increaseArray.push(increaseAmount);
    }
    firstNums.push(increaseArray[0]);
  }

  for (let i = firstNums.length - 2; i >= 0; i--) {
    firstNums[i] -= firstNums[i + 1];
  }

  sum += firstNums[0];
});

console.log(sum);
