function row(length) {
  if (length === 0) {
    return '';
  }

  return "-" + row(length - 1);
}

function boxValue(number, rowcount) {
  return rowcount % 2 === 0 ? rowcount - number : rowcount + number;
}

function indeces(length, number, rowcount) {
  let char = '';

  for (let index = 0; index < length; index++) {
    if (index % 3 === 0) {
      char += '|';

      const boxNumber = boxValue(number, rowcount);
      number += 1;

      if (boxNumber === 1) {
        char += '👍';
        continue;
      }

      if (boxNumber === 100) {
        char += '🥳';
        continue;
      }

      char += boxNumber < 10 ? ' ' + boxNumber : boxNumber;
      continue;
    }

    char += ' ';
  }

  return char + '|';
}

function snakesAndLadders(length) {
  let char = '';

  for (let index = 0; index < length; index++) {
    if (index % 5 === 0) {
      char += '|    ';
    }
  }

  return char + '|';
}

function borders() {
  let rowcount = 100;
  const limit = indeces(30, 0, 100);
  const rowborder = row(limit.length);

  for (let length = 0; length < 10; length++) {
    console.log(rowborder);

    const columnContent = indeces(30, 0, rowcount);
    console.log(columnContent);

    console.log(snakesAndLadders(50));
    rowcount -= rowcount % 2 === 0 ? 19 : 1;
  }

  console.log(rowborder);
}

borders();
