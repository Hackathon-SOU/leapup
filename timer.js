// SETUP SOME SHORT CUTS
// TIMER INPUT ELEMEMTS
const startBtn       = document.getElementById('start');
const stopBtn        = document.getElementById('stop');
const minValue     = document.getElementById('minValue');
console.log(minValue);
const timerValue = minValue.value*60;
const thresholdValue = document.getElementById('thresholdValue');
 
// OUR TIMER UI DISPLAY ELEMENTS
const countdownContainer = document.getElementById('countdown');
const hours = document.getElementById('hours');
const mins  = document.getElementById('mins');
const secs  = document.getElementById('secs');
 
// SET THE TIME VALUE TO ADD THE THRESHOLD CLASS TO THE CONTAINER
// IN THIS WAY WE CAN CHANGE THE TIMER DISPLAY WHEN THE COUNTDOWN
// IS NEARING COMPLETION
let THRESHOLD = 0;
 
// SET UP THE DEFAULT CONTROL PARAMETERS
let COUNTDOWN = 0;
let startTime = 0;
let timerFn = null;
 
// ABORT TIMER
stopBtn.onclick = function(e) {
    e.preventDefault();
    stopTimer();
}


// START TIMER
startBtn.onclick = function(e) {
    e.preventDefault();
    showTimer();
    // GET THE UI TIMER VALUE AND IF VALID
    // SET THE REFERENCE TIME AND START THE INTERVAL TIMER
    COUNTDOWN = parseInt(minValue.value)*60;
    THRESHOLD = parseInt(thresholdValue.value);
    if (COUNTDOWN > 0) {
        startTime = Math.ceil(Date.now() / 1000);
        timerFn   = setInterval(updateTimer, 1000);
        playAudio();
    }
}

function pauseAudio(){
    var audio = document.getElementById("bineuralBeat");
    audio.pause();
};

document.querySelector("#volume").addEventListener("input", () => {
    var audio = document.getElementById("bineuralBeat");
    // Get volume Value from the input
    const volume = document.querySelector("#volume").value;
  
    // Set volume property of the SpeechSynthesisUtterance instance
    audio.volume = volume;
  
    // Update the volume label
    document.querySelector("#volume-label").innerHTML = volume;
  });

function playAudio(){
     var audio = document.getElementById("bineuralBeat");
    if (confirm("Please make sure you've pluged in your Headset!") == true) {
        // playing audio
        audio.play();
        document.getElementById("sound").style.display = "block";
    } else {
        if (confirm("Continue without headset?") == true) {
            // playing audio
            var audio = new Audio("bineuralBeat/simply-meditation-series-11hz-alpha-binaural-waves-for-relaxed-focus-8028.mp3");
            audio.play();
          } else {
          }
      }
 };

function stopTimer() {
    clearInterval(timerFn);
    setThreshold();
    timerFn = null;
    pauseAudio();
    showButton();
    document.getElementById("timerSwitch").style.display = "none";
    return 0;
}

function resetTimer() {
    hours.innerHTML = ('00');
    mins.innerHTML = ('00');
    secs.innerHTML = ('00');
    stopTimer();
}
 
function setThreshold(status) {
    if (status) {
        countdownContainer.classList.add("threshold");
    } else {
        countdownContainer.classList.remove("threshold");
    }
}
// UPDATE THE TIMER
// GET CURRENT TIME IN SECONDS, CONVERT TO H:M:S VALUES
// AND UPDATE THE UI.
function updateTimer() {
  const current = Math.ceil(Date.now() / 1000);
 
  const remaining = COUNTDOWN - current + startTime;
  const timerValues = getTimeValues(remaining);
 
  // ... WITH LEADING 0's
  hours.innerHTML = ('00' + timerValues.hours).substr(-2);
  mins.innerHTML = ('00' + timerValues.mins).substr(-2);
  secs.innerHTML = ('00' + timerValues.secs).substr(-2);
 
  if (remaining <= THRESHOLD) {
      setThreshold(true);
  }
  // CHECK FOR TIMEOUT
  if (remaining <= 0) {
    alert('TIMES UP');
    stopTimer();
  }
}
 
// SECONDS TO TIME VALUES H:M:S
function getTimeValues(referenceTime) {
  const hours = parseInt(referenceTime / 3600);
  const mins = parseInt((referenceTime - hours * 3600) / 60);
  const secs = referenceTime - hours * 3600 - mins * 60;
 
  return {hours, mins, secs};
}

var timerDisplay = document.getElementById("temp-1")
var buttonDisplay = document.getElementById("temp-2")

function showButton(){
    timerDisplay.style.display = 'none';
    buttonDisplay.style.display = 'block';
}

function showTimer(){
    timerDisplay.style.display = 'block';
    buttonDisplay.style.display = 'none';

}