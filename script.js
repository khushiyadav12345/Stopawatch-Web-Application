let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  display.textContent = formatTime(difference);
}

startBtn.onclick = () => {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateDisplay, 1000);
    running = true;
  }
};

pauseBtn.onclick = () => {
  if (running) {
    clearInterval(tInterval);
    running = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(tInterval);
  difference = 0;
  running = false;
  display.textContent = "00:00:00";
  laps = [];
  lapsList.innerHTML = "";
};

lapBtn.onclick = () => {
  if (running) {
    laps.push(formatTime(difference));
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${laps.length}: ${laps[laps.length - 1]}`;
    lapsList.appendChild(lapItem);
  }
};
