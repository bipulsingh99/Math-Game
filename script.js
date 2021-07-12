var playing = false;
var score;
var timeremaining = 0;
var action;
var correctanswer;
document.getElementById("startreset").onclick = function () {
  if (playing == true) {
    location.reload();
  } else {
    playing = true;
    score = 0;
    document.getElementById("scorevalue").innerHTML = `${score}`;
    document.getElementById("timeremaining").style.display = "block";
    document.getElementById("startreset").innerHTML = "Reset Game";
    timeremaining = 10;
    document.getElementById("gameover").style.display = "none";
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    startCountdown();
    generateQA();
  }
};
function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      clearInterval(action);
      document.getElementById("yourscore").innerHTML = score;
      document.getElementById("gameover").style.display = "block";
      document.getElementById("timeremaining").style.display = "none";
      document.getElementById("correct").style.display = "none";
      document.getElementById("wrong").style.display = "none";
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}
function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctanswer = x * y;
  document.getElementById("question").innerHTML = `${x} x ${y}`;
  var correctposition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctposition).innerHTML = correctanswer;
  var answers = [correctanswer];
  for (i = 1; i < 5; i++) {
    if (i != correctposition) {
      var x = 1 + Math.round(9 * Math.random());
      var y = 1 + Math.round(9 * Math.random());
      var wronganswer;
      do {
        x = 1 + Math.round(9 * Math.random());
        y = 1 + Math.round(9 * Math.random());
        wronganswer = x * y;
      } while (answers.indexOf(wronganswer) > -1);
      answers.push(wronganswer);
      document.getElementById("box" + i).innerHTML = wronganswer;
    }
  }
}
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    if (playing == true) {
      if (this.innerHTML == correctanswer) {
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("wrong").style.display = "none";
        document.getElementById("correct").style.display = "block";
        setTimeout(function () {
          document.getElementById("correct").style.display = "none";
        }, 500);
        setTimeout(function () {
          generateQA();
        }, 500);
        timeremaining = 10;
      } else {
        document.getElementById("wrong").style.display = "block";
        document.getElementById("correct").style.display = "none";
        setTimeout(function () {
          document.getElementById("wrong").style.display = "none";
        }, 1000);
      }
    }
  };
}
