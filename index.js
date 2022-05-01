let player = 'circle';

const board = document.querySelectorAll('.herniplocha button');
const hraje = document.querySelector('.hraje img');

const handleClick = (event) => {
  if (player === 'circle') {
    hraje.src = 'images/cross.svg';
    player = 'cross';
    event.target.classList.add('board__field--circle');
  } else {
    player = 'circle';
    hraje.src = 'images/circle.svg';
    event.target.classList.add('board__field--cross');
  }
  event.target.disabled = true;

  const isWinning = isWinningMove(event.target);

  if (isWinning) {
    const symbol = getSymbol(event.target);
    if (confirm(`Vyhrál ${symbol}. Spustit novou hru?`) === true) {
      location.reload();
    }
  }
  console.log(isWinningMove(event.target));
};

for (let i = 0; i < board.length; i++) {
  board[i].addEventListener('click', handleClick);
}

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'křížek';
  } else if (field.classList.contains('board__field--circle')) {
    return 'kolečko';
  }
  return undefined;
};

const boardSize = 10;
const fields = document.querySelectorAll('.herniplocha button');

const getField = (row, column) => {
  return fields[row * boardSize + column];
};

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;

  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
