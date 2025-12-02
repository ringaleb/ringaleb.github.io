let timerInput = document.getElementById('timerInput');
let timerDisplay = document.getElementById('timerDisplay');
let startBtn = document.getElementById('startBtn');
let intervalId = null;

// for populating time selection dropdown menus
function populateTimeSelections(id, min, max) {
  const select = document.getElementById(id);
  for (let i = min; i <= max; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i.toString().padStart(2, '0'); // leading zero for single digits
      select.appendChild(option);
  }
}

populateTimeSelections('hours', 0, 99);
populateTimeSelections('minutes', 0, 59);
populateTimeSelections('seconds', 0, 59);

let timeLeft = parseInt(hours.value, 10) * 3600 + parseInt(minutes.value, 10) * 60 + parseInt(seconds.value, 10); // total time in seconds

timerDisplay.textContent = formatTime(timeLeft); // initialize timer display

const alarmSound = new Audio('alarm.mp3');
alarmSound.loop = true; // loop alarm sound until stopped

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
      timerDisplay.textContent = formatTime(timeLeft);
      document.title = `${formatTime(timeLeft)}`; // update tab title
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
  timeLeft = parseInt(hours.value, 10) * 3600 + parseInt(minutes.value, 10) * 60 + parseInt(seconds.value, 10);
  timerDisplay.textContent = formatTime(timeLeft);

  alarmSound.pause(); // stop alarm sound if playing
  alarmSound.currentTime = 0; // reset alarm sound to start
});

// for populating time selection dropdown menus
function populateTimeSelections(id, min, max) {
  const select = document.getElementById(id);
  for (let i = min; i <= max; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i.toString().padStart(2, '0'); // leading zero for single digits
      select.appendChild(option);
  }
}

// format time as HH:MM:SS
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}