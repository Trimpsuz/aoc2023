const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n').map((line) => line.trim());

function handType(hand) {
  const labelCounts = {};

  for (const label of hand) {
    labelCounts[label] = (labelCounts[label] || 0) + 1;
  }
  const counts = Object.values(labelCounts).sort((a, b) => b - a);

  if (counts[0] === 5) {
    return 'Five of a kind';
  }

  if (counts[0] === 4) {
    return 'Four of a kind';
  }

  if (counts[0] === 3 && counts[1] === 2) {
    return 'Full house';
  }

  if (counts[0] === 3) {
    return 'Three of a kind';
  }

  if (counts[0] === 2 && counts[1] === 2) {
    return 'Two pair';
  }

  if (counts[0] === 2) {
    return 'One pair';
  }

  return 'High card';
}

function compareHands(hand1, hand2) {
  const card1 = hand1.hand[0];
  const card2 = hand2.hand[0];

  const index1 = cardsOrder.indexOf(card1);
  const index2 = cardsOrder.indexOf(card2);

  if (index1 < index2) {
    return 1;
  } else if (index1 > index2) {
    return -1;
  } else {
    for (let i = 1; i < hand1.hand.length; i++) {
      const subIndex1 = cardsOrder.indexOf(hand1.hand[i]);
      const subIndex2 = cardsOrder.indexOf(hand2.hand[i]);

      if (subIndex1 < subIndex2) {
        return 1;
      } else if (subIndex1 > subIndex2) {
        return -1;
      }
    }

    return 0;
  }
}

const cardsOrder = 'AKQJT98765432';

const hands = [];
let fiveOfaKind = [];
let fourOfaKind = [];
let fullHouse = [];
let threeOfaKind = [];
let twoPair = [];
let onePair = [];
let highCard = [];

lines.forEach((line) => {
  hands.push({ hand: line.split(' ')[0], bid: +line.split(' ')[1] });
});

hands.forEach((hand) => {
  if (handType(hand.hand) === 'Five of a kind') {
    fiveOfaKind.push({ hand: hand.hand, bid: hand.bid, type: handType(hand.hand) });
  }
  if (handType(hand.hand) === 'Four of a kind') {
    fourOfaKind.push({ hand: hand.hand, bid: hand.bid, type: handType(hand.hand) });
  }
  if (handType(hand.hand) === 'Full house') {
    fullHouse.push({ hand: hand.hand, bid: hand.bid, type: handType(hand.hand) });
  }
  if (handType(hand.hand) === 'Three of a kind') {
    threeOfaKind.push({ hand: hand.hand, bid: hand.bid, type: handType(hand.hand) });
  }
  if (handType(hand.hand) === 'Two pair') {
    twoPair.push({ hand: hand.hand, bid: hand.bid, type: handType(hand.hand) });
  }
  if (handType(hand.hand) === 'One pair') {
    onePair.push({ hand: hand.hand, bid: hand.bid, type: handType(hand.hand) });
  }
  if (handType(hand.hand) === 'High card') {
    highCard.push({ hand: hand.hand, bid: hand.bid, type: handType(hand.hand) });
  }
});

fiveOfaKind = fiveOfaKind.sort(compareHands);
fourOfaKind = fourOfaKind.sort(compareHands);
fullHouse = fullHouse.sort(compareHands);
threeOfaKind = threeOfaKind.sort(compareHands);
twoPair = twoPair.sort(compareHands);
onePair = onePair.sort(compareHands);
highCard = highCard.sort(compareHands);

const hands2 = [];

highCard.forEach((hand) => {
  hands2.push(hand);
});
onePair.forEach((hand) => {
  hands2.push(hand);
});
twoPair.forEach((hand) => {
  hands2.push(hand);
});
threeOfaKind.forEach((hand) => {
  hands2.push(hand);
});
fullHouse.forEach((hand) => {
  hands2.push(hand);
});
fourOfaKind.forEach((hand) => {
  hands2.push(hand);
});
fiveOfaKind.forEach((hand) => {
  hands2.push(hand);
});

let winnings = 0;

for (i = 0; i < hands2.length; i++) {
  winnings += hands2[i].bid * (i + 1);
}

console.log(winnings);
