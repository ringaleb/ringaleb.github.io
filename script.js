let timerInput = document.getElementById('timerInput');
let timerDisplay = document.getElementById('timerDisplay');
let startBtn = document.getElementById('startBtn');
let intervalId = null;

let timeLeft = parseInt(timerInput.value, 10);

const alarmSound = new Audio('alarm.mp3');
alarmSound.loop = true; // loop alarm sound until stopped

// update display when input changes
timerInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {   
        const newInput = parseInt(timerInput.value, 10);
        if (!isNaN(newInput)) {   
            timerDisplay.textContent = newValue; 
            timeLeft = newInput;
        }
    }
});

// start button
startBtn.addEventListener('click', () => {
  if (intervalId) return;

  intervalId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      alarmSound.play(); // play alarm sound
    } else {
      timeLeft-= 1;
      timerDisplay.textContent = timeLeft.toFixed(0);
      document.title = `${timeLeft.toFixed(0)}`; // update tab title
    }
  }, 1000);
});

// stop button
stopBtn.addEventListener('click', () => {
  clearInterval(intervalId); // stop countdown
  intervalId = null;

  alarmSound.pause(); // stop alarm sound if playing
  alarmSound.currentTime = 0; // reset alarm sound to start
});

// reset button
resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  timeLeft = Number(timerInput.value);
  timerDisplay.textContent = timeLeft.toFixed(0);
});