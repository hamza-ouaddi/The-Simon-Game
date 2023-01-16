var buttonColors = ["red", "blue", "green", "yellow"];
//Random colors pattern
var gamePattern = [];
//What the user clicked pattern
var userClickedPattern = [];
//Game level
var level = 0;
var started = false;
//to detect which button is clicked
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animateClick(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//to change the level title
$(document).keypress(function () {
  if (!started) {
    $("#title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

//Function to play sounds
function playSound(name) {
  var audio = new Audio("/The-Simon-Game/sounds/" + name + ".mp3");
  audio.play();
}

//Click animation
function animateClick(activeColor) {
  $("#" + activeColor).addClass("clicked");
  setTimeout(function () {
    $("#" + activeColor).removeClass("clicked");
  }, 100);
}

//game pattern
function checkAnswer(activeColor) {
  if (gamePattern[activeColor] === userClickedPattern[activeColor]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var gameOverAudio = new Audio("/The-Simon-Game/sounds/wrong.mp3");
    gameOverAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#title").text("Game Over...Press enter to restart.");
    restartGame();
  }
}

//function to restart
function restartGame() {
  gamePattern = [];
  level = 0;
  started = false;
}
