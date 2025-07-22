let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const timerDisplay = document.getElementById('timer');
const holes = document.querySelectorAll('.hole');
const gameArea = document.getElementById('whack-a-mole');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

let secondsRemaining = 20;
let timerIntervalId;
let randomMoleIntervalId;

highScoreDisplay.innerText = 'High Score: ' + highScore;

function startGame() {
  score = 0;
  secondsRemaining = 20;
  scoreDisplay.innerText = 'Score: 0';
  timerDisplay.innerText = 'Time: ' + secondsRemaining;

  holes.forEach(hole => hole.classList.remove('mole'));
  gameArea.addEventListener('click', handleClick);

  randomMoleIntervalId = setInterval(() => {
    const randomHoleIndex = Math.floor(Math.random() * holes.length);
    holes[randomHoleIndex].classList.toggle('mole');
  }, 500);

  timerIntervalId = setInterval(() => {
    secondsRemaining--;
    timerDisplay.innerText = 'Time: ' + secondsRemaining;
    if (secondsRemaining <= 0) {
      endGame();
    }
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopGameManually() {
  endGame();
}

function endGame() {
  clearInterval(timerIntervalId);
  clearInterval(randomMoleIntervalId);
  gameArea.removeEventListener('click', handleClick);
  holes.forEach(hole => hole.classList.remove('mole'));

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    highScoreDisplay.innerText = 'High Score: ' + highScore;
  }

  timerDisplay.innerText = 'Time: 0';
  startBtn.textContent = 'Play Again';
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function handleClick(event) {
  if (event.target.classList.contains('mole')) {
    event.target.classList.remove('mole');
      score++;
      scoreDisplay.innerText = 'Score: ' + score;
  }
}

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGameManually);