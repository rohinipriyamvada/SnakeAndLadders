function displayDice(diceValue) {
  switch(diceValue) {
    case 1 :return '┏━━━━━━━━┓\n┃⚪ ⚪ ⚪┃\n┃⚪ 🔴 ⚪┃\n┃⚪ ⚪ ⚪┃\n┗━━━━━━━━┛';
    case 2 :return '┏━━━━━━━━┓\n┃🔴 ⚪ ⚪┃\n┃⚪ ⚪ ⚪┃\n┃⚪ ⚪ 🔴┃\n┗━━━━━━━━┛';
    case 3 :return '┏━━━━━━━━┓\n┃⚪ ⚪ 🔴┃\n┃⚪ 🔴 ⚪┃\n┃🔴 ⚪ ⚪┃\n┗━━━━━━━━┛';
    case 4 :return '┏━━━━━━━━┓\n┃🔴 ⚪ 🔴┃\n┃⚪ ⚪ ⚪┃\n┃🔴 ⚪ 🔴┃\n┗━━━━━━━━┛';
    case 5 :return '┏━━━━━━━━┓\n┃🔴 ⚪ 🔴┃\n┃⚪ 🔴 ⚪┃\n┃🔴 ⚪ 🔴┃\n┗━━━━━━━━┛';
    case 6 :return '┏━━━━━━━━┓\n┃🔴 ⚪ 🔴┃\n┃🔴 ⚪ 🔴┃\n┃🔴 ⚪ 🔴┃\n┗━━━━━━━━┛';
  }
}

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
    case 88: return '🪜';
  }
}

function createBorder(length, index) {
  const boardTop = '┏━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┓';
  const divider = '┣━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━┫';
  const boardBottom = '┗━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┛';

  if(index === 0) {
    return boardTop;
  }

  if(index === length) {
    return boardBottom;
  }

  return divider;
}

function boxValue(number, rowcount) {
  return rowcount % 2 === 0 ? rowcount - number : rowcount + number;
}

function addIcons(boxNumber, pos, pos2, idol, idol2) {
  if (boxNumber === 1 || boxNumber === 100) {
    if (boxNumber === pos || boxNumber === pos2) {
      return boxNumber === pos ? ' 👍' + idol + ' ' : ' 🥳' + idol2 + ' ';
    }

    return boxNumber === 1 ? ' 👍   ' : ' 🥳   ';
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
  if (snakeHead(boxNum)) {
    return '┃ ⬇ ' + danger(boxNum) + ' ';
  }

  if (snakeTail(boxNum)) {
    return '┃  ' + danger(boxNum) + '  ';
  }

  if (ladderHead(boxNum)) {
    return '┃ ⬆ ' + safe(boxNum) + ' ';
  }

  if (ladderEnd(boxNum)) {
    return '┃  ' + safe(boxNum) + '  ';
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

function play(player, playerPosition, p1Icon, other, pos, p2Icon) {
  let diceValue = Math.round(Math.random() * 6);

  while (diceValue === 0 || diceValue > 6) {
    diceValue = Math.round(Math.random() * 6);
  }
  console.log();
  console.log(displayDice(diceValue));
  console.log();
  playerPosition += diceValue;

  if (ladderHead(playerPosition) || snakeHead(playerPosition)) {
    const newPosition = movedPosition(playerPosition);

    newPosition > playerPosition   
    ? console.log("🎉🎉CONGRATULATIONS!!! YOU GOT TELEPORTED...🛸")
    :  console.log("OOPS!! 💣💣 !**NEVER GIVE UP**!");

    playerPosition = newPosition;
  }

  if (playerPosition > 100) {
    playerPosition -= diceValue;
    console.log("Try again...");
  }

  console.log("Current Position of", player, p1Icon, playerPosition,
     ' |', other, pos, p2Icon);

  console.log();

  return playerPosition;
}

function start(player1Name, player2Name, p1Position, p2Position, p1, p2) {
  console.log();
  prompt(player1Name, "- Click enter to roll dice");
  p1Position = play(player1Name, p1Position, p1, player2Name, p2Position, p2);
  createBox(p1Position, p1, p2Position, p2);

  if (p1Position === 100) {
    return winningStatement(player1Name);
  }

  console.log();
  prompt(player2Name, "- Click enter to roll dice");
  p2Position = play(player2Name, p2Position, p2, player1Name, p1Position, p1);
  createBox(p1Position, p1, p2Position, p2);

  if (p2Position === 100) {
    return winningStatement(player2Name);
  }

  return start(player1Name, player2Name, p1Position, p2Position, p1, p2);
}

function instructions(){
  const interested = confirm("Do you want to read instructions ?");
  if (interested) {
    console.log("It is a two player game && I hope you have made atleast one friend to play with you 🥷🏻");
    console.log();
    console.log("The grid contains 1 to 100 numbers");
    console.log();
    console.log("You will click enter to roll the DICE🎲");
    console.log();
    console.log("Your score will start at ZERO and your dice value will be keep adding to your score until it becomes a '100'");
    console.log();
    console.log("The other person also rolls the dice and keep moving... So you gotta test your luck 🫠");
    console.log();
    console.log("Wherever your position is, your selected icon will be represented in that position (as you keep forgetting to track it) 😁");
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

function userData() {
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
    userData();
  }

  console.log("It was nice playing with you, See you again");
  console.log();

  const restart = confirm("Do you want to play again ?");

  if (restart) {
    gameStart();
  }
}

gameStart();
