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

function play(player, playerPosition) {
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

  console.log("Current Position of", player, playerPosition);
  console.log();
  return playerPosition;
}

function chances(player1Name, player2Name, player1Score, player2Score, p1, p2) {
  prompt("Click enter to roll dice");
  player1Score = play(player1Name, player1Score);

  if (player1Score === 100) {
    return winningStatement(player1Name);
  }

  prompt("Click enter to roll dice");
  player2Score = play(player2Name, player2Score);

  if (player2Score === 100) {
    return winningStatement(player2Name);
  }

  return chances(player1Name, player2Name, player1Score, player2Score, p1, p2);
}

function gameStart() {
  console.log("Welcome!!");
  console.log("First to reach the end wins the game...");

  const resume = confirm("PLAY:");
  if (resume) {
    console.log("Let's start!");
    const player1Name = prompt("Enter player1 name :", "Rohini");
    const player2Name = prompt("Enter player2 name :", "Chinna");
    const player1Icon = prompt("Click enter to confirm your symbol:", "⚪");
    const player2Icon = prompt("Click enter to confirm your symbol:", "🟢");

    chances(player1Name, player2Name, 0, 0, player1Icon, player2Icon);
  }
  console.log("It was nice playing with you, See you again");
}

gameStart();
