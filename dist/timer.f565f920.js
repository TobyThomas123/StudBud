//Pomodoro timer
var pomodoro = {
    started: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,
    init: function() {
        var self = this;
        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.fillerDom = document.querySelector('#filler');
        this.interval = setInterval(function() {
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector('#work').onclick = function() {
            self.startWork.apply(self);
        };
        document.querySelector('#shortBreak').onclick = function() {
            self.startShortBreak.apply(self);
        };
        document.querySelector('#longBreak').onclick = function() {
            self.startLongBreak.apply(self);
        };
        document.querySelector('#stop').onclick = function() {
            self.stopTimer.apply(self);
        };
    },
    resetVariables: function(mins, secs, started) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
        this.fillerIncrement = 200 / (this.minutes * 60);
        this.fillerHeight = 0;
    },
    startWork: function() {
        this.resetVariables(25, 0, true);
    },
    startShortBreak: function() {
        this.resetVariables(5, 0, true);
    },
    startLongBreak: function() {
        this.resetVariables(15, 0, true);
    },
    stopTimer: function() {
        this.resetVariables(25, 0, false);
        this.updateDom();
    },
    toDoubleDigit: function(num) {
        if (num < 10) return "0" + parseInt(num, 10);
        return num;
    },
    updateDom: function() {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
        this.fillerHeight = this.fillerHeight + this.fillerIncrement;
        this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback: function() {
        if (!this.started) return false;
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else this.seconds--;
        this.updateDom();
    },
    timerComplete: function() {
        this.started = false;
        this.fillerHeight = 0;
    }
};
window.onload = function() {
    pomodoro.init();
};
//stopwatch
window.onload = function() {
    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens");
    var appendSeconds = document.getElementById("seconds");
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval;
    buttonStart.onclick = function() {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    };
    buttonStop.onclick = function() {
        clearInterval(Interval);
    };
    buttonReset.onclick = function() {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    };
    function startTimer() {
        tens++;
        if (tens <= 9) appendTens.innerHTML = "0" + tens;
        if (tens > 9) appendTens.innerHTML = tens;
        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "00";
        }
        if (seconds > 9) appendSeconds.innerHTML = seconds;
    }
};

//# sourceMappingURL=timer.f565f920.js.map
