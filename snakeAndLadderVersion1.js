function snakeHead(position) {
  switch (position) {
    case 28:
    case 37:
    case 48:
    case 75:
    case 94:
    case 96: return true;
    default: return false;
  }
}

function ladderHead(position) {
  switch (position) {
    case 4:
    case 12:
    case 14:
    case 22:
    case 41:
    case 54: return true;
    default: return false;
  }
}

function movedPosition(position) {
  switch (position) {
    case 28: return 10;
    case 37: return 3;
    case 48: return 16;
    case 75: return 32;
    case 94: return 71;
    case 96: return 42;
    case 4: return 56;
    case 12: return 50;
    case 14: return 55;
    case 22: return 58;
    case 41: return 79;
    case 54: return 88;
  }
}
function snakeTail(position) {
  switch (position) {
    case 10:
    case 3:
    case 16:
    case 32:
    case 71:
    case 42: return true;
    default: return false;
  }
}

function ladderEnd(position) {
  switch (position) {
    case 56:
    case 50:
    case 55:
    case 58:
    case 79:
    case 88: return true;
    default: return false;
  }
}

function danger(position) {
  switch (position) {
    case 28:
    case 10: return '🐭';
    case 37:
    case 3: return '🐷';
    case 48:
    case 16: return '🐼';
    case 75:
    case 32: return '🐍';
    case 94:
    case 71: return '🦊';
    case 96:
    case 42: return '🐯';
  }
}

function safe(position) {
  switch (position) {
    case 4:
    case 56: return '🎢';
    case 12:
    case 50: return '🚀';
    case 14:
    case 55: return '🚁';
    case 22:
    case 58: return '✈️ ';
    case 41:
    case 79: return '𓊍 ';
    case 54:
    case 88: return '🧗';
  }
}

function row(length) {
  if (length === 0) {
    return '';
  }

  return "-" + row(length - 1);
}

function boxValue(number, rowcount) {
  return rowcount % 2 === 0 ? rowcount - number : rowcount + number;
}

function indeces(length, number, rowcount, pos, idol, pos2, idol2, i3) {
  let char = '';

  for (let index = 0; index < length; index++) {
    if (index % 3 === 0) {
      char += '|';
      const boxNumber = boxValue(number, rowcount);
      number += 1;

      if (boxNumber === pos && boxNumber === pos2) {
        char += i3;
        continue;
      }

      if (boxNumber === pos || boxNumber === pos2) {
        char += boxNumber === pos ? idol : idol2;
        continue;
      }

      if (boxNumber === 1 || boxNumber === 100) {
        char += boxNumber === 1 ? '👍' : '🥳';
        continue;
      }

      char += boxNumber < 10 ? ' ' + boxNumber : boxNumber;
      continue;
    }
    char += ' ';
  }
  return char + '|';
}

function hit(boxNum) {
  if (snakeHead(boxNum)) {
    return '|⏬' + danger(boxNum);
  }

  if (snakeTail(boxNum)) {
    return '|' + danger(boxNum) + '  ';
  }

  if (ladderHead(boxNum)) {
    return '|⏫' + safe(boxNum);
  }

  if (ladderEnd(boxNum)) {
    return '|' + safe(boxNum) + '  ';
  }
  return '';
}

function snakesAndLadders(length, number, rowcount) {
  let char = '';

  for (let index = 0; index < length; index++) {
    const boxNum = boxValue(number, rowcount);

    if (index % 5 === 0) {
      number += 1;

      const isHit = hit(boxNum);
      if (isHit) {
        char += isHit;
        continue;
      }
      char += '|    ';
    }
  }
  return char + '|';
}

function borders(pos1, idol, pos2, idol2, i3) {
  let rowcount = 100;
  const end = indeces(30, 0, 100);
  const rowborder = row(end.length);

  for (let length = 0; length < 10; length++) {
    console.log(rowborder);
    const columnContent = indeces(30, 0, rowcount, pos1, idol, pos2, idol2, i3);

    console.log(columnContent);
    console.log(snakesAndLadders(50, 0, rowcount));
    rowcount -= rowcount % 2 === 0 ? 19 : 1;
  }
  console.log(rowborder);
}

function winningStatement(player) {
  console.log();
  console.log("*********************************")
  console.log("🏆🏆🏆!!!CONGRATULATIONS🥳!!!🏆🏆🏆");
  console.log(player, "YOU WON");
  console.log("*********************************")
  console.log();
}

function dice(value) {
  switch (value) {
    case 1: return '1️⃣';
    case 2: return '2️⃣';
    case 3: return '3️⃣';
    case 4: return '4️⃣';
    case 5: return '5️⃣';
    case 6: return '6️⃣';
  }
  return 'roll again';
}

function play(player, playerPosition, i1, other, pos, i2) {
  let diceValue = Math.round(Math.random() * 6);

  while (diceValue === 0 || diceValue > 6) {
    diceValue = Math.round(Math.random() * 6);
  }

  console.log(dice(diceValue));
  playerPosition += diceValue;

  if (ladderHead(playerPosition) || snakeHead(playerPosition)) {
    const newPosition = movedPosition(playerPosition);
    if (newPosition > playerPosition) {
      console.log("🎉🎉CONGRATULATIONS!!! YOU GOT TELEPORTED UP..🛸");
    } else {
      console.log("OOPS!! 💣💣 NEVER GIVE UP!");
    }
    playerPosition = newPosition;
  }

  if (playerPosition > 100) {
    playerPosition -= diceValue;
    console.log("Try again...");
  }

  console.log("Current Position of", player, i1, playerPosition, ' |', other, pos, i2);
  console.log();
  return playerPosition;
}

function start(player1Name, player2Name, p1Position, p2Position, p1, p2, C) {
  console.log();
  prompt(player1Name, "Click enter to roll dice");
  p1Position = play(player1Name, p1Position, p1, player2Name, p2Position, p2);
  borders(p1Position, p1, p2Position, p2, C);

  if (p1Position === 100) {
    return winningStatement(player1Name);
  }

  console.log();
  prompt(player2Name, "Click enter to roll dice");
  p2Position = play(player2Name, p2Position, p2, player1Name, p1Position, p1);
  borders(p1Position, p1, p2Position, p2, C);

  if (p2Position === 100) {
    return winningStatement(player2Name);
  }

  return start(player1Name, player2Name, p1Position, p2Position, p1, p2, C);
}

function gameStart() {
  console.log();
  console.log("---**** Welcome to NAGU ****---");
  console.log();
  console.log("🎖️ First one to reach the end wins the game...🎖️");

  const resume = confirm("PLAY:");
  if (resume) {
    console.log("Let's start!😃");
    const player1Name = prompt("Enter player1 name :", "Doreamon");
    const player2Name = prompt("Enter player2 name :", "Nobita");
    console.log(player1Name);
    const player1Icon = prompt("Click enter to confirm your symbol:", "🔵");
    console.log(player2Name);
    const player2Icon = prompt("Click enter to confirm your symbol:", "⚫");
    const common = '🤝';

    start(player1Name, player2Name, 0, 0, player1Icon, player2Icon, common);
  }
  console.log("It was nice playing with you, See you again");
  console.log();
  const restart = confirm("Do you want to play again ?");
  if (restart) {
    gameStart();
  }
}

gameStart();
