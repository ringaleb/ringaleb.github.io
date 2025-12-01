let timerInput = document.getElementById('timerInput');
let timerDisplay = document.getElementById('timerDisplay');
let startBtn = document.getElementById('startBtn');
let intervalId = null;

let timeLeft = parseInt(timerInput.value, 10);

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
      alert("Time's up!");
    } else {
      timeLeft-= 1;
      timerDisplay.textContent = timeLeft.toFixed(0);
    }
  }, 1000);
});

// stop button
stopBtn.addEventListener('click', () => {
  clearInterval(intervalId); // stop countdown
  intervalId = null;
});

// reset button
resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  timeLeft = Number(timerInput.value);
  timerDisplay.value = timeLeft;
});