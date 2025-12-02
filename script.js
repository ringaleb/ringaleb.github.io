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

// set default timer to 00:01:00
document.getElementById('minutes').value = 1; 

const timerInput = document.getElementById('timerInput');
const timerDisplay = document.getElementById('timerDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

let intervalId = null; 
let alarmState = false;

let timeLeft = parseInt(hours.value, 10) * 3600 + parseInt(minutes.value, 10) * 60 + parseInt(seconds.value, 10); // total time in seconds

timerDisplay.textContent = formatTime(timeLeft); // initialize timer display

const alarmSound = new Audio('alarm.mp3');
alarmSound.loop = true; // loop alarm sound until stopped

// start/stop button
startStopBtn.addEventListener('click', () => {
  document.title = `${formatTime(timeLeft)}`; // update tab title
  if (!intervalId) { // if countdown is not running (button currently says Start)
    intervalId = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        alarmSound.play(); // play alarm sound
        alarmState = true;

        startStopBtn.style.display = 'none'; // hide start/stop button
      } else {
        timeLeft-= 1;
        timerDisplay.textContent = formatTime(timeLeft);
        document.title = `${formatTime(timeLeft)}`; // update tab title
      }
    }, 1000);

    startStopBtn.textContent = 'Stop'; // change button text to Stop
    startStopBtn.style.backgroundColor = '#FF7074'; // change button color to light red

  } else { // if countdown is running (button currently says Stop)
    clearInterval(intervalId); // stop countdown
    intervalId = null;

    startStopBtn.textContent = 'Start'; // change button text back to Start
    startStopBtn.style.backgroundColor = 'lightgreen'; // change button color to light green
  }
});

// reset button
resetBtn.addEventListener('click', () => {
  timeLeft = parseInt(hours.value, 10) * 3600 + parseInt(minutes.value, 10) * 60 + parseInt(seconds.value, 10);
  timerDisplay.textContent = formatTime(timeLeft);
  document.title = `${formatTime(timeLeft)}`; // update tab title

  if (alarmState) { // if alarm is playing, reset button stops alarm and shows start button
    clearInterval(intervalId);
    intervalId = null;

    alarmSound.pause(); // stop alarm sound
    alarmSound.currentTime = 0; // reset alarm sound to start

    // show start button again
    startStopBtn.style.display = 'inline-block';
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = 'lightgreen';
  }

});

// set timer button
setTimerBtn.addEventListener('click', () => {
  timeLeft = parseInt(hours.value, 10) * 3600 + parseInt(minutes.value, 10) * 60 + parseInt(seconds.value, 10);
  timerDisplay.textContent = formatTime(timeLeft);
});

// format time as HH:MM:SS
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}