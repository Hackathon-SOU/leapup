// SETUP SOME SHORT CUTS
// breaktime INPUT ELEMEMTS
const startBtn       = document.getElementById('start');
const stopBtn        = document.getElementById('stop');
const minValue     = document.getElementById('minValue');
console.log(minValue);
const breaktimeValue = minValue.value*60;
const thresholdValue = document.getElementById('thresholdValue');
 
// OUR breaktime UI DISPLAY ELEMENTS
const countdownContainer = document.getElementById('countdown');
const hours = document.getElementById('hours');
const mins  = document.getElementById('mins');
const secs  = document.getElementById('secs');
 
// SET THE TIME VALUE TO ADD THE THRESHOLD CLASS TO THE CONTAINER
// IN THIS WAY WE CAN CHANGE THE breaktime DISPLAY WHEN THE COUNTDOWN
// IS NEARING COMPLETION
let THRESHOLD = 0;
 
// SET UP THE DEFAULT CONTROL PARAMETERS
let COUNTDOWN = 0;
let startTime = 0;
let breaktimeFn = null;
 
// ABORT breaktime
stopBtn.onclick = function(e) {
    e.preventDefault();
    stopbreaktime();
}
 
// START breaktime
startBtn.onclick = function(e) {
    e.preventDefault();
 
    // GET THE UI breaktime VALUE AND IF VALID
    // SET THE REFERENCE TIME AND START THE INTERVAL breaktime
    COUNTDOWN = parseInt(minValue.value)*60;
    THRESHOLD = parseInt(thresholdValue.value);
    if (COUNTDOWN > 0) {
        startTime = Math.ceil(Date.now() / 1000);
        breaktimeFn   = setInterval(updatebreaktime, 1000);
    }
}
 
var x;

function stopbreaktime() {
    clearInterval(breaktimeFn);
    setThreshold();
    breaktimeFn = null;
}

function resetbreaktime() {
    hours.innerHTML = ('00');
  mins.innerHTML = ('00');
  secs.innerHTML = ('00');
  stopbreaktime();
}
 
function setThreshold(status) {
    if (status) {
        countdownContainer.classList.add("threshold");
    } else {
        countdownContainer.classList.remove("threshold");
    }
}
// UPDATE THE breaktime
// GET CURRENT TIME IN SECONDS, CONVERT TO H:M:S VALUES
// AND UPDATE THE UI.
function updatebreaktime() {
  const current = Math.ceil(Date.now() / 1000);
 
  const remaining = COUNTDOWN - current + startTime;
  const breaktimeValues = getTimeValues(remaining);
 
  // ... WITH LEADING 0's
  hours.innerHTML = ('00' + breaktimeValues.hours).substr(-2);
  mins.innerHTML = ('00' + breaktimeValues.mins).substr(-2);
  secs.innerHTML = ('00' + breaktimeValues.secs).substr(-2);
 
  if (remaining <= THRESHOLD) {
      setThreshold(true);
  }
  // CHECK FOR TIMEOUT
  if (remaining <= 0) {
    alert('TIMES UP');
    stopbreaktime();
  }
}
 
// SECONDS TO TIME VALUES H:M:S
function getTimeValues(referenceTime) {
  const hours = parseInt(referenceTime / 3600);
  const mins = parseInt((referenceTime - hours * 3600) / 60);
  const secs = referenceTime - hours * 3600 - mins * 60;
 
  return {hours, mins, secs};
}
