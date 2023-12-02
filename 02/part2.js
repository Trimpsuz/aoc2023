const fs = require('fs');

let sum = 0;

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n');

lines.forEach((line) => {
  const gameId = line.split(': ')[0].replace(/\D/g, '');
  line = line.split(': ')[1].split('; ');
  let redNeeded = 0;
  let greenNeeded = 0;
  let blueNeeded = 0;
  let power = 0;
  line.forEach((set) => {
    set = set.replace('\r', '');
    let colors = set.split(', ');
    let redAmt = 0;
    let greenAmt = 0;
    let blueAmt = 0;

    colors.forEach((clr) => {
      const amt = clr.match(/(\d+)\s*(red|green|blue)/)[1];
      const color = clr.match(/(\d+)\s*(red|green|blue)/)[2];

      switch (color) {
        case 'red':
          redAmt = parseInt(amt);
          break;
        case 'green':
          greenAmt = parseInt(amt);
          break;
        case 'blue':
          blueAmt = parseInt(amt);
          break;
      }
    });
    if (redAmt > redNeeded) {
      redNeeded = redAmt;
    }
    if (greenAmt > greenNeeded) {
      greenNeeded = greenAmt;
    }
    if (blueAmt > blueNeeded) {
      blueNeeded = blueAmt;
    }
  });

  power = redNeeded * greenNeeded * blueNeeded;

  sum += power;
});

console.log(sum);
