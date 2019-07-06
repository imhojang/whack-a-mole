// Load application styles
import 'styles/index.css';

const startbtn = document.getElementById('startbtn');
const score = document.getElementById('score');
let holeToMole;
let molesCaught = 0;
let moleVanish;
let randomHoleNum;
let prevHoleNum;
let chances = 0;
let blink = false;

setInterval(blinkHeader, 600);
startbtn.addEventListener('click', startGame);


function startGame() {
  chances = 0;
  molesCaught = 0;

  startbtn.removeEventListener('click', startGame);
  startbtn.style.color = 'gray';
  score.textContent = '';
  setTimeout(activateMole, 1000);
}

function activateMole() {
  if (chances < 10) {
    chances++;
    holeToMole = document.getElementById(`${randomHole()}`);
    holeToMole.src = '../assets/images/mole.jpg';
    holeToMole.addEventListener('click', catchMole);

    moleVanish = setTimeout(deactivateMole, 3000);
  } else {
    document.getElementById('score').textContent = `GREAT ROUND ! YOUR SCORE IS ${molesCaught / 10 * 100}`;
    startbtn.textContent = 'RESTART !';
    startbtn.style.color = 'gold';
    startbtn.addEventListener('click', startGame);
  }
}

function deactivateMole() {
  holeToMole.removeEventListener('click', catchMole);
  holeToMole.src = '../assets/images/hole.jpg';
  clearTimeout(moleVanish);
  setTimeout(activateMole, 1000);
}

function catchMole() {
  molesCaught++;
  deactivateMole();
  clearTimeout(moleVanish);
}

function randomHole() {
  randomHoleNum = Math.floor(Math.random() * 10);
  if (randomHoleNum > 0 && prevHoleNum !== randomHoleNum) {
    prevHoleNum = randomHoleNum; return randomHoleNum;
  }
  return randomHole();
}

function blinkHeader() {
  if (blink === true) {
    document.querySelector('h1').style.color = 'white';
    blink = false;
  } else {
    document.querySelector('h1').style.color = 'gold';
    blink = true;
  }
}
