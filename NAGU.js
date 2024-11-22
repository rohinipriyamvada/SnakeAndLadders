const LENGTH = 8;

const EMPTY =      '┃        ┃';
const MIDDLE_DOT = '┃   🔴   ┃';
const LEFT_DOT =   '┃🔴      ┃';
const RIGHT_DOT =  '┃      🔴┃';
const TWO_DOTS =   '┃🔴    🔴┃';

function repeat(string, times) {
  if (times === 1) {
    return string;
  }

  return string + repeat(string, times - 1);
}

function createTop(length) {
  return '┏' + repeat('━', length) + '┓';
}

function createBottom(length) {
  return '┗' + repeat('━', length) + '┛';
}

function createMiddle(diceValue) {
  switch (diceValue) {
    case 1: return joinLines(EMPTY, MIDDLE_DOT, EMPTY);
    case 2: return joinLines(LEFT_DOT, EMPTY, RIGHT_DOT);
    case 3: return joinLines(RIGHT_DOT, MIDDLE_DOT, LEFT_DOT);
    case 4: return joinLines(TWO_DOTS, EMPTY, TWO_DOTS);
    case 5: return joinLines(TWO_DOTS, MIDDLE_DOT, TWO_DOTS);
    case 6: return joinLines(TWO_DOTS, TWO_DOTS, TWO_DOTS);
  }
}

function joinLines(firstPart, middlePart, lastPart) {
  return firstPart + '\n' + middlePart + '\n' + lastPart;
}

function createDiceFace(diceValue) {
  return joinLines(
    createTop(LENGTH), 
    createMiddle(diceValue), 
    createBottom(LENGTH));
}

function displayDice(diceValue) {
  console.log();
  console.log(createDiceFace(diceValue));
  console.log();
}

function isSnakeHead(position) {
  switch (position) {
    case 28: return 10;
    case 37: return 3;
    case 48: return 16;
    case 75: return 32;
    case 94: return 71;
    case 96: return 42;
  }
}

function isSnakeTail(position) {
  switch (position) {
    case 10:
    case 3:
    case 16:
    case 32:
    case 71:
    case 42: return true;
  }
}

function isLadderHead(position) {
  switch (position) {
    case 4: return 56;
    case 12: return 50;
    case 14: return 55;
    case 22: return 58;
    case 41: return 79;
    case 54: return 88;
  }
}

function isLadderEnd(position) {
  switch (position) {
    case 56:
    case 50:
    case 55:
    case 58:
    case 79:
    case 88: return true;
  }
}

function isSnake(position) {
  return isSnakeHead(position) !== undefined;
}

function moveTo(currentPosition) {
  if (isSnake(currentPosition)) {
    return isSnakeHead(currentPosition);
  }

  return isLadderHead(currentPosition);
}

function danger(position) {
  switch (position) {
    case 28: return '┃ ⬇ 🐭 ';
    case 10: return '┃  🐭  ';
    case 37: return '┃ ⬇ 🐷 ';
    case 3: return '┃  🐷  ';
    case 48: return '┃ ⬇ 🐼 ';
    case 16: return '┃  🐼  ';
    case 75: return '┃ ⬇ 🐍 ';
    case 32: return '┃  🐍  ';
    case 94: return '┃ ⬇ 🦊 ';
    case 71: return '┃  🦊  ';
    case 96: return '┃ ⬇ 🐯 ';
    case 42: return '┃  🐯  ';
  }
}

function safe(position) {
  switch (position) {
    case 4: return '┃ ⬆ 🎢 ';
    case 56: return '┃  🎢  ';
    case 12: return '┃ ⬆ 🚀 ';
    case 50: return '┃  🚀  ';
    case 14: return '┃ ⬆ 🚁 ';
    case 55: return '┃  🚁  ';
    case 22: return '┃ ⬆ ✈️  ';
    case 58: return '┃  ✈️   ';
    case 41: return '┃ ⬆ 𓊍  ';
    case 79: return '┃  𓊍   ';
    case 54: return '┃ ⬆ 🪜 ';
    case 88: return '┃  🪜  ';
  }
}

function createBorder(length, index) {
  const boardTop = '┏━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┓';
  const divider = '┣━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━┫';
  const boardBottom = '┗━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┛';

  if (index === 0) {
    return boardTop;
  }

  if (index === length) {
    return boardBottom;
  }

  return divider;
}

function boxValue(number, rowcount) {
  return rowcount % 2 === 0 ? rowcount - number : rowcount + number;
}

function addIcons(boxNumber, pos, pos2, idol, idol2) {
  if (boxNumber === 1) {
    if (boxNumber === pos || boxNumber === pos2) {
      return boxNumber === pos ? ' 👍' + idol + ' ' : ' 👍' + idol2 + ' ';
    }

    return ' 👍   ';
  }
  
  if (boxNumber === 100) {
    if (boxNumber === pos || boxNumber === pos2) {
      return boxNumber === pos ? ' 🥳' + idol + ' ' : ' 🥳' + idol2 + ' ';
    }

    return ' 🥳   ';
  }

  const cellNumber = boxNumber < 10 ? '0' + boxNumber : boxNumber;
  if (boxNumber === pos && boxNumber === pos2) {
    return '🤜' + cellNumber + '🤛';
  }

  if (boxNumber === pos || boxNumber === pos2) {
    const icon = boxNumber === pos ? idol : idol2;
    return icon + cellNumber + '  ';
  }

  return '  ' + cellNumber + '  ';
}

function firstRow(length) {
  let char = '';

  for (let index = 0; index < length; index++) {
    if (index % 7 === 0) {
      char += '┃      ';
    }
  }

  return char + '┃';
}

function createIndeces(length, number, rowcount, pos, idol, pos2, idol2) {
  let char = '';

  for (let index = 0; index < length; index++) {
    if (index % 4 === 0) {
      char += '┃';
      const boxNumber = boxValue(number, rowcount);
      number += 1;

      char += addIcons(boxNumber, pos, pos2, idol, idol2);
    }
  }

  return char + '┃';
}

function hit(boxNum) {
  if (isSnakeHead(boxNum) || isSnakeTail(boxNum)) {
    return danger(boxNum);
  }

  if (isLadderHead(boxNum) || isLadderEnd(boxNum)) {
    return safe(boxNum);
  }

  return '';
}

function snakesAndLadders(length, number, rowcount) {
  let char = '';

  for (let index = 0; index < length; index++) {
    const boxNum = boxValue(number, rowcount);

    if (index % 7 === 0) {
      number += 1;

      const isHit = hit(boxNum);
      char += isHit ? isHit : '┃      ';
    }
  }
  return char + '┃';
}

function createBox(pos1, idol, pos2, idol2) {
  let rowCount = 100;

  for (let length = 0; length < 10; length++) {
    console.log(createBorder(10, length));
    console.log(firstRow(70));
    console.log(createIndeces(40, 0, rowCount, pos1, idol, pos2, idol2));
    console.log(snakesAndLadders(70, 0, rowCount));

    rowCount -= rowCount % 2 === 0 ? 19 : 1;
  }

  console.log(createBorder(10, 10));
}

function winningStatement(winner) {
  console.log();
  console.log("***********************************")
  console.log("🏆🏆🏆!!!CONGRATULATIONS🥳!!!🏆🏆🏆");
  console.log(winner, "YOU WON");
  console.log("***********************************")
  console.log();
}

function changePosition(playerPosition, diceValue) {
  playerPosition += diceValue;
  if (isLadderHead(playerPosition) || isSnakeHead(playerPosition)) {
    const newPosition = moveTo(playerPosition);

    newPosition > playerPosition
      ? console.log("🎉🎉CONGRATULATIONS!!! YOU GOT TELEPORTED...🛸")
      : console.log("OOPS!! 💣💣 !**NEVER GIVE UP**!");

    return newPosition;
  }

  return playerPosition;
}

function displayScores(player, icon, position, other, pos2, icon2) {
  console.log("Current Position of", player, icon, position, ' |',
    other, pos2, icon2);

  console.log();
}

function play(player, playerPosition, p1Icon, other, pos, p2Icon) {
  let diceValue = Math.ceil(Math.random() * 6);

  displayDice(diceValue);

  playerPosition = changePosition(playerPosition, diceValue);

  if (playerPosition > 100) {
    playerPosition -= diceValue;
    console.log("Try again...");
  }

  displayScores(player, p1Icon, playerPosition, other, pos, p2Icon);

  return playerPosition;
}

function startDisplay(playerName, position, p1, other, p2Position, p2) {
  console.log();
  prompt(playerName, "- Click enter to roll dice");
  const playerPosition = play(playerName, position, p1, other, p2Position, p2);
  createBox(playerPosition, p1, p2Position, p2);

  return playerPosition;
}

function start(player1Name, player2Name, p1Pos, p2Pos, p1Icon, p2Icon) {
  p1Pos = startDisplay(player1Name, p1Pos, p1Icon, player2Name, p2Pos, p2Icon);

  if (p1Pos === 100) {
    return winningStatement(player1Name);
  }

  p2Pos = startDisplay(player2Name, p2Pos, p2Icon, player1Name, p1Pos, p1Icon);

  if (p2Pos === 100) {
    return winningStatement(player2Name);
  }

  return start(player1Name, player2Name, p1Pos, p2Pos, p1Icon, p2Icon);
}

function instructions() {
  const isInterested = confirm("Do you want to read instructions ?");
  if (isInterested) {
    console.log("It is a two player game");
    console.log();
    console.log("The grid contains 1 to 100 numbers");
    console.log();
    console.log("You will click enter to roll the DICE🎲");
    console.log();
    console.log("Your score will start at ZERO and your dice value will be keep adding to your score until it becomes a '100'");
    console.log();
    console.log("The other person also rolls the dice and keep moving... So you gotta test your luck 🫠");
    console.log();
    console.log("Wherever your position is, your selected icon will be represented in that position");
    console.log();
    console.log("At some positions, there are HELPING TOOLS represented with objects which are used to move up preceded by UParrow(⬆ ) indicating the start of climbing up 🤓");
    console.log();
    console.log("At some postions, there are DANGERS represented with animals preceded by DOWNarrow (⬇ ) indicating the start of danger 😰");
    console.log();
    console.log("If you were in TOOL position, you will move up to the respective position which is indicated by same symbol as in tool without precedence");
    console.log();
    console.log("If you were in DANGER position, you will move back to the respective position which is indicated by same symbol as in danger without precedence");
    console.log();
    console.log("Whoever reaches the end first is the WINNER🥳🎉🥇");
    console.log();
    console.log(" 🎮 HAPPY GAMING 🎮  ");
    console.log();
  }
  console.log("🤝🤝🤝BEST OF LUCK🤝🤝🤝")
}

function playersData() {
  const player1Name = prompt("Enter player1 name :", "Doreamon");
  const player2Name = prompt("Enter player2 name :", "Nobita");

  console.log(player1Name);
  const player1Icon = prompt("Click enter to confirm your symbol:", "🔵");

  console.log(player2Name);
  const player2Icon = prompt("Click enter to confirm your symbol:", "⚫");

  instructions();
  start(player1Name, player2Name, 0, 0, player1Icon, player2Icon);
}

function introdution() {
  console.log();
  console.log("---**** Welcome to NAGU ****---");
  console.log();
  console.log("🎖️ First one to reach the end wins the game...🎖️");
}

function gameStart() {
  introdution();

  const resume = confirm("PLAY:");
  if (resume) {
    console.log("Let's start!😃");
    playersData();
  }

  console.log("It was nice playing with you, See you again");
  console.log();

  const restart = confirm("Do you want to play again ?");

  if (restart) {
    gameStart();
  }
  console.log("THANK YOU");
}

gameStart();
