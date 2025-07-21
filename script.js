let score = 0;
const scoreDisplay = document.getElementById('score');

const holes = document.querySelectorAll('.hole');

const randomMoleIntervalId = setInterval(function() {
  const randomHoleIndex = Math.floor(Math.random() * holes.length);
  holes[randomHoleIndex].classList.toggle('mole');
}, 500);

function handleClick(event) {
  if (event.target.className === 'hole mole') {
    event.target.classList.remove('mole');
    score++;
    scoreDisplay.innerText = 'Score: ' + score;
  }
}

const gameArea = document.getElementById('whack-a-mole');
gameArea.addEventListener('click', handleClick);

// CODE BELOW ADDS TIMER FUNCTIONALITY
const timerDisplay = document.getElementById('timer');
let secondsRemaining = 20;
timerDisplay.innerText = 'Time remaining: ' + secondsRemaining;
const timerIntervalId = setInterval(function() {
  secondsRemaining -= 1;
  timerDisplay.innerText = 'Time remaining: ' + secondsRemaining;
  if (secondsRemaining <= 0) {
    clearInterval(timerIntervalId);
    clearInterval(randomMoleIntervalId);
    gameArea.removeEventListener('click', handleClick);
    holes.forEach(hole => {
      hole.classList.remove('mole');
    });
  }
}, 1000);

