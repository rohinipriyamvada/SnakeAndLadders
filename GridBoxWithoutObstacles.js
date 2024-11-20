function row(length) {
  if (length === 0) {
    return '';
  }

  return "-" + row(length - 1);
}

function indeces(length, number, rowcount, pos, idol, pos2, idol2, idol3) {
  let char = '';

  for (let index = 0; index < length; index++) {
    if (index % 3 === 0) {
      char += '|';
      
      const boxValue = rowcount % 2 === 0 ? rowcount - number : rowcount + number;
      number += 1;
      
      if (boxValue === pos && boxValue === pos2) {
        char += idol3;
        continue;
      }

      if (boxValue === pos || boxValue === pos2) {
        char += boxValue === pos ? idol : idol2;
        continue;
      }
      
      if (boxValue === 1) {
        char += '👍';
        continue;
      }
      
      if (boxValue === 100) {
        char += '🥳';
        continue;
      }
      
      char += boxValue < 10 ? ' ' + boxValue : boxValue;
      continue;
    }
    char += ' ';
  }

  return char + '|';
}

function columnBorder(length) {
  let char = '';

  for (let index = 0; index < length; index++) {
    if (index % 5 === 0) {
      char += '|';
      continue;
    }
    char += ' ';
  }
  return char;
}

function borders(pos1, idol, pos2, idol2, i3) {
  let rowcount = 100;
  const end = indeces(30, 0, 100);
  const rowborder = row(end.length);

  for (let length = 0; length < 10; length++) {
    console.log(rowborder);

    const columnContent = indeces(30, 0, rowcount, pos1, idol, pos2, idol2, i3);

    console.log(columnContent);
    console.log(columnBorder(end.length));
    rowcount -= rowcount % 2 === 0 ? 19 : 1;
  }

  console.log(rowborder);
}

function winningStatement(player) {
  console.log();
  console.log("******************************")
  console.log("!!!CONGRATULATIONS🥳!!!");
  console.log(player, "YOU WON");
  console.log("******************************")
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

function play(player, playerPosition, other, pos) {
  let diceValue = Math.round(Math.random() * 6);

  while (diceValue === 0 || diceValue > 6) {
    diceValue = Math.round(Math.random() * 6);
  }

  console.log(dice(diceValue));
  playerPosition += diceValue;

  if (playerPosition > 100) {
    playerPosition -= diceValue;
    console.log("Oops! Try again...");
  }

  console.log("Current Position of", player, playerPosition, ' |', other, pos);
  console.log();
  return playerPosition;
}

function start(player1Name, player2Name, p1Position, p2Position, p1, p2, C) {
  prompt(player1Name, "Click enter to roll dice");
  p1Position = play(player1Name, p1Position, player2Name, p2Position);
  borders(p1Position, p1, p2Position, p2, C);

  if (p1Position === 100) {
    return winningStatement(player1Name);
  }

  console.log();
  prompt(player2Name, "Click enter to roll dice");
  p2Position = play(player2Name, p2Position, player1Name, p1Position);
  borders(p1Position, p1, p2Position, p2, C);

  if (p2Position === 100) {
    return winningStatement(player2Name);
  }

  return start(player1Name, player2Name, p1Position, p2Position, p1, p2, C);
}

function gameStart() {
  console.log("Welcome!!");
  console.log("First to reach the end wins the game...");

  const resume = confirm("PLAY:");
  if (resume) {
    console.log("Let's start!");
    const player1Name = prompt("Enter player1 name :", "Doreamon");
    const player2Name = prompt("Enter player2 name :", "Nobita");
    const player1Icon = prompt("Click enter to confirm your symbol:", "⚪");
    const player2Icon = prompt("Click enter to confirm your symbol:", "🟡");
    const common = '🟠';

    start(player1Name, player2Name, 0, 0, player1Icon, player2Icon, common);
  }
  console.log("It was nice playing with you, See you again");
}

gameStart();
