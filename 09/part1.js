const fs = require('fs');

let sum = 0;

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n');

lines.forEach((line) => {
  let nums = line.split(' ').map((num) => +num.trim());

  let lastNums = [];
  lastNums.push(nums[nums.length - 1]);
  let increaseArray = [];

  for (let i = 1; i < nums.length; i++) {
    const increaseAmount = nums[i] - nums[i - 1];
    increaseArray.push(increaseAmount);
  }
  lastNums.push(increaseArray[increaseArray.length - 1]);

  while (!increaseArray.every((element) => element === 0)) {
    const tempArray = increaseArray;
    increaseArray = [];
    for (let i = 1; i < tempArray.length; i++) {
      const increaseAmount = tempArray[i] - tempArray[i - 1];
      increaseArray.push(increaseAmount);
    }
    lastNums.push(increaseArray[increaseArray.length - 1]);
  }

  for (let i = lastNums.length - 2; i >= 0; i--) {
    lastNums[i] += lastNums[i + 1];
  }

  sum += lastNums[0];
});

console.log(sum);
