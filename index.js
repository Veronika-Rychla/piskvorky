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
  console.log('funguju');
};

for (let i = 0; i < board.length; i++) {
  board[i].addEventListener('click', handleClick);
}
