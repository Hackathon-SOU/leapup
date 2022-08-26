var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.getElementById("stop").onclick = function(){
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
      playAudio();
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
      pauseAudio();
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
      pauseAudio();
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
      pauseAudio();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }
};

function showPomodoro()
{
  var pomodoroDisplay = document.getElementById("pomodoro-tech");
  pomodoroDisplay.style.display = 'block'; 
  
  var customTimer = document.getElementById("temp-1");
  customTimer.style.display = 'none'; 

  var timerSwitch = document.getElementById("timerSwitch");
  timerSwitch.innerHTML=("Use Custom Timer");
  timerSwitch.setAttribute('onclick','hidePomodoro()');

  var Pbuttons = document.getElementById("buttons-pomodoro");
  Pbuttons.style.display='block';

  var Cbuttons = document.getElementById("buttons-custom");
  Cbuttons.style.display='none';
};

function hidePomodoro(){
  var customTimer = document.getElementById("pomodoro-tech");
  customTimer.style.display = 'none'; 
  
  var pomodoroDisplay = document.getElementById("temp-1");
  pomodoroDisplay.style.display = 'block'; 
  
  var timerSwitch = document.getElementById("timerSwitch");
  timerSwitch.innerHTML=("Use Custom Timer");
  timerSwitch.setAttribute('onclick','showPomodoro()');
  
  var Cbuttons = document.getElementById("buttons-custom");
  Cbuttons.style.display='block';

  var Pbuttons = document.getElementById("buttons-pomodoro");
  Pbuttons.style.display='none';
}

window.onload = function(){
  pomodoro.init();
};

