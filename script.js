var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = true;
var level = 0;

//починає гру натисканням на клавішу
$(document).keydown(function () {
  if (started){
    $("#title").text("Level " + level); //зазначає поточний рівень
    nextSequence();
    started = false;
  }
});

//рандомно обирає колір, на який має натискати користувач
function nextSequence(){
  //ініціалізує цей масив для нової гри
  userClickedPattern = [];
  level++;
  $("#title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //обирає рандомно колір
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//для програвання звуку
function playSound(name){
  var audio = new Audio(name + ".mp3");
  audio.play();
}

//визначає натискання кнопки
$(".btn").on("click",  function (event) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//анімація при натисканні на кнопку
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");},
    100);
}

//перевіряє, чи відповідає шаблон користувача системному шаблону
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence()}, 1000);
    }
  } else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over")},
      200);
      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
    }
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    started = true;
  }
