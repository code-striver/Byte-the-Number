'use strict';
const name = prompt('What is your name?', 'Anonymous');
let highestScore = 0;
let level = 'easy';
(() => {
  if (!localStorage.getItem('highscore')) {
    localStorage.setItem('highscore', '0');
  }
})();
let chances = 20;
let theNumber = Math.floor(Math.random() * 20);
// Elements
const checkButton = document.querySelector('.check');
const input = document.querySelector('.guess');
const message = document.querySelector('.message');
const scoreCard = document.querySelector('.score');
const highestScoreCard = document.querySelector('.highscore');
const again = document.querySelector('.again');
const levelButtonEasy = document.getElementById('easy');
const levelButtonHard = document.getElementById('hard');

function handleEasy() {
  level = 'easy';
  return;
}
function handleHard() {
  level = 'hard';
  return;
}
// function eventListerWhenBasedOnChances
function eventListerWhenBasedOnChances() {
  if (chances === 0) {
    chances = 20;
    scoreCard.textContent = chances;
    document.querySelector('body').style.backgroundColor = '#222';
    document.getElementById('inputnum').disabled = false;
    theNumber = Math.floor(Math.random() * 20);
    message.innerHTML = 'Start guessing...';
  } else if (again.innerHTML === 'Celebrate 🎉') {
    makeItRain(50, 2, 1);
  } else {
    message.innerHTML =
      'Finish what you started first! No rage-quitting allowed. 😏';
  }
  return;
}
levelButtonEasy.addEventListener('change', handleEasy);
levelButtonHard.addEventListener('change', handleHard);
again.addEventListener('click', eventListerWhenBasedOnChances);
// FUNCTIONS
highestScoreCard.textContent = `${localStorage.getItem('highscore')} ${
  localStorage.getItem('name') ? 'by ' + localStorage.getItem('name') : ''
}`;

function setHighestScore(val) {
  // let num = String(val);
  if (val > localStorage.getItem('highscore')) {
    makeItRain(50, 4, 1);
    localStorage.setItem('highscore', val);
    localStorage.setItem('name', name);
    message.innerHTML = 'You won 🎉';
    highestScoreCard.textContent = `${localStorage.getItem(
      'highscore'
    )} by ${localStorage.getItem('name')}`;
  }
  return;
}
function handleCheck() {
  if (!input.value) {
    message.innerHTML = 'enter some value first 🥴';
    return;
  }
  if (input.value == theNumber) {
    message.innerHTML = 'That is correct 🎉';
    document.getElementById('secret').innerHTML = theNumber;
    makeItRain(50, 2, 2);
    setHighestScore(chances);
    document.getElementById('inputnum').disabled = true;
    document.querySelector('body').style.backgroundColor = 'green';
    // document.getElementById('againButton').disabled = true;
    again.innerHTML = 'Celebrate 🎉';
    return;
  }
  if (chances <= 1) {
    chances = 0;
    scoreCard.textContent = chances;
    message.innerHTML = 'You lost 😢💀🧟🧟‍♂️☠️';
    document.querySelector('body').style.backgroundColor = 'red';
    return;
  }
  if (input.value > theNumber) {
    chances--;
    scoreCard.textContent = chances;
    if (input.value - theNumber > 5) {
      message.innerHTML =
        level == 'easy'
          ? `${input.value} is too high 📈`
          : 'Hints are on vacation🌴. Try thinking instead!🧠';
      return;
    } else {
      message.innerHTML =
        level == 'easy'
          ? 'this is a bit high'
          : 'You chose hard mode. Now, embrace the struggle! 😈🔥';
      return;
    }
  } else {
    chances--;
    scoreCard.innerHTML = chances;
    if (theNumber - input.value > 5) {
      message.innerHTML =
        level == 'easy'
          ? `${input.value} is too low 📉`
          : 'The only hint I can give: Get better! 😜🎮';
      return;
    } else {
      message.innerHTML =
        level == 'easy'
          ? 'this is a bit low'
          : 'In easy mode, I’d help. In hard mode, I just judge.😜🎮';
      return;
    }
  }
}

checkButton.addEventListener('click', handleCheck);

// Confetti function
function makeItRain(particles, time, frame) {
  var end = Date.now() + time * 1000; // 2 seconds of confetti
  var colors = [
    '#33fff6',
    '#7900BD ',
    '#ff33f6',
    '#7aff33',
    '#fa6530',
    '#ffff33',
    '#fff',
  ]; // Confetti colors

  function frame1() {
    confetti({
      particleCount: particles,
      angle: 270,
      spread: 55,
      origin: { y: 0 },
      colors: colors,
    });
    confetti({
      particleCount: particles,
      angle: 90,
      spread: 55,
      origin: { y: 1 },
      colors: colors,
    });
    confetti({
      particleCount: particles,
      angle: 180,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
    confetti({
      particleCount: particles,
      angle: 0,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame1);
    }
  }
  function frame2() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame2);
    }
  }
  if (frame === 1) {
    frame1();
  } else {
    frame2();
  }
}
