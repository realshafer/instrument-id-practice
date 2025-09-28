let sounds = [];
let fileNames = [
  "flute.mp3",
  "alto sax.mp3",
  "bari sax.mp3",
  "bass clarinet.mp3",
  "bass drum.mp3",
  "bassoon.mp3",
  "celeste.mp3",
  "cello.mp3",
  "chimes.mp3",
  "clarinet.mp3",
  "claves.mp3",
  "contrabassoon.mp3",
  "double bass.mp3",
  "english horn.mp3",
  "euphonium.mp3",
  "glockenspiel.mp3",
  "harp.mp3",
  "harpsichord.mp3",
  "hi-hat.mp3",
  "horn.mp3",
  "marimba.mp3",
  "oboe.mp3",
  "piano.mp3",
  "piccolo.mp3",
  "snare (with snares).mp3",
  "snare (without snares).mp3",
  "soprano sax.mp3",
  "suspended cymbals.mp3",
  "tam-tam gongs.mp3",
  "temple blocks.mp3",
  "tenor sax.mp3",
  "timpani.mp3",
  "toms.mp3",
  "triangle.mp3",
  "trombone.mp3",
  "trumpet.mp3",
  "tuba.mp3",
  "vibraphone.mp3",
  "viola.mp3",
  "violin.mp3",
  "xylophone.mp3"
];

let questionButton, answerButton, nextButton;
let player, fileName;
let answerRevealed = false;

function preload() {
  for (let i = 0; i < fileNames.length; i++) {
    sounds[i] = loadSound("assets/" + fileNames[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);

  // Title
  textSize(36);
  text("Instrument ID Practice", width/2, height/9);

  // Subtitle
  textSize(20);
  text("See canvas for list of instruments", width/2, height/9 + 40);

  // --- Layout variables ---
  let rowH = 60;
  let col1X = width/4;
  let col2X = width/2;
  let startY = height/3;

  // QUESTION row
  createDiv("QUESTION")
    .position(col1X - 150, startY)
    .style("color","white").style("font-size","24px");
  questionButton = createButton("PLAY");
  styleButton(questionButton, col2X, startY, "#00E938");
  questionButton.mousePressed(toggleQuestion);

  // ANSWER row
  createDiv("ANSWER")
    .position(col1X - 150, startY + rowH)
    .style("color","white").style("font-size","24px");
  answerButton = createButton("REVEAL");
  styleButton(answerButton, col2X, startY + rowH, "#03A9F4");
  answerButton.mousePressed(showAnswer);

  // NEXT QUESTION button
  nextButton = createButton("NEXT QUESTION");
  nextButton.position(width/2 - 100, startY + rowH*2 + 20);
  nextButton.size(200, rowH);
  nextButton.style("font-size","20px");
  nextButton.style("background-color","#FFC107");
  nextButton.mousePressed(nextQuestion);

  // Pick first sound
  chooseSound();
}

// ---- Utility: style buttons consistently ----
function styleButton(btn, x, y, color) {
  btn.position(x, y);
  btn.size(120, 50);
  btn.style("font-size","20px");
  btn.style("background-color", color);
  btn.style("color","#000");
}

// ---- Toggle functions ----
function toggleQuestion() {
  if (player && player.isPlaying()) {
    player.stop();
    resetButton(questionButton, "PLAY", "#00E938");
  } else {
    stopAll();
    player.amp(0.8);
    player.loop();
    questionButton.html("STOP").style("background-color","#F80F05");
  }
}

function resetButton(btn, label, color) {
  btn.html(label);
  btn.style("background-color", color);
}

function stopAll() {
  if (player) player.stop();
  resetButton(questionButton, "PLAY", "#00E938");
}

function showAnswer() {
  answerButton.html(fileName);
  answerRevealed = true;
}

function nextQuestion() {
  stopAll();
  chooseSound();
  resetButton(answerButton, "REVEAL", "#03A9F4");
  answerRevealed = false;
}

// ---- Random sound selection (no 3+ repeats) ----
let lastChoice = -1;
let secondLastChoice = -1;

function chooseSound() {
  let choice;
  do {
    choice = int(random(fileNames.length));
  } while (choice === lastChoice && choice === secondLastChoice);

  secondLastChoice = lastChoice;
  lastChoice = choice;

  player = sounds[choice];
  fileName = fileNames[choice].replace(".mp3", ""); // display without extension
}
