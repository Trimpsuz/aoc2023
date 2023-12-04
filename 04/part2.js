const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n');

const cards = [];

for (let i = 0; i < lines.length; i++) {
  line = lines[i].slice(10).replace('\r', '');

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

  cards.push({ num: i, duplicates: myWins.length, checked: false });
}

let card = 0;
while (card < cards.length) {
  let num = cards[card].num;
  for (let i = 0; i < cards[card].duplicates; i++) {
    cards.push({ num: cards[num + i + 1].num, duplicates: cards[num + i + 1].duplicates, checked: false });
  }
  cards[card].checked = true;
  card++;
}

console.log(cards.length);
