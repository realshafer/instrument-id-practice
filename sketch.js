let sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8;
let original1, original2;
let questionButton, original1Button, original2Button, answerButton, nextButton;
let player, fileName;
let answerRevealed = false;

function preload() {
  // Question pool
  sound1 = loadSound('assets/Eno_DigitalClip_6dB.mp3');
  sound2 = loadSound('assets/Eno_DigitalClip_12dB.mp3');
  sound3 = loadSound('assets/Eno_DigitalClip_18dB.mp3');
  sound4 = loadSound('assets/Eno_DigitalClip_24dB.mp3');
  sound5 = loadSound('assets/Hoff_DigitalClip_6dB.mp3');
  sound6 = loadSound('assets/Hoff_DigitalClip_12dB.mp3');
  sound7 = loadSound('assets/Hoff_DigitalClip_18dB.mp3');
  sound8 = loadSound('assets/Hoff_DigitalClip_24dB.mp3');
  // Originals
  original1 = loadSound('assets/EnoOriginal.mp3');
  original2 = loadSound('assets/HoffOriginal.mp3');
}

function setup(){  
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);

  // Title
  textSize(48);
  text("Digital Clipping Practice", width/2, height/9);

  // Subtitle
  textSize(28);
  text("+6dB, +12dB, +18dB, +24dB", width/2, height/9 + 40);

  // --- Layout variables ---
  let rowH = 60;
  let col1X = width/4;
  let col2X = width/2;
  let startY = height/3;  // start layout lower down

  // QUESTION row
  createDiv("QUESTION")
    .position(col1X - 150, startY)
    .style("color","white").style("font-size","24px");
  questionButton = createButton("PLAY");
  styleButton(questionButton, col2X, startY, "#00E938");
  questionButton.mousePressed(toggleQuestion);

  // ORIGINAL 1 row
  createDiv("ORIGINAL 1")
    .position(col1X - 150, startY + rowH)
    .style("color","white").style("font-size","24px");
  original1Button = createButton("PLAY");
  styleButton(original1Button, col2X, startY + rowH, "#00E938");
  original1Button.mousePressed(toggleOriginal1);

  // ORIGINAL 2 row
  createDiv("ORIGINAL 2")
    .position(col1X - 150, startY + rowH*2)
    .style("color","white").style("font-size","24px");
  original2Button = createButton("PLAY");
  styleButton(original2Button, col2X, startY + rowH*2, "#00E938");
  original2Button.mousePressed(toggleOriginal2);

  // ANSWER row
  createDiv("ANSWER")
    .position(col1X - 150, startY + rowH*3)
    .style("color","white").style("font-size","24px");
  answerButton = createButton("REVEAL");
  styleButton(answerButton, col2X, startY + rowH*3, "#03A9F4");
  answerButton.mousePressed(showAnswer);

  // NEXT QUESTION button (full row)
  nextButton = createButton("NEXT QUESTION");
  nextButton.position(width/2 - 100, startY + rowH*4 + 20);
  nextButton.size(200, rowH);
  nextButton.style("font-size","20px");
  nextButton.style("background-color","#FFC107");
  nextButton.mousePressed(nextQuestion);

  // pick first sound
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

function toggleOriginal1() {
  if (original1.isPlaying()) {
    original1.stop();
    resetButton(original1Button, "PLAY", "#00E938");
  } else {
    stopAll();
    original1.amp(0.8);
    original1.loop();
    original1Button.html("STOP").style("background-color","#F80F05");
  }
}

function toggleOriginal2() {
  if (original2.isPlaying()) {
    original2.stop();
    resetButton(original2Button, "PLAY", "#00E938");
  } else {
    stopAll();
    original2.amp(0.8);
    original2.loop();
    original2Button.html("STOP").style("background-color","#F80F05");
  }
}

function resetButton(btn, label, color) {
  btn.html(label);
  btn.style("background-color", color);
}

function stopAll(){
  if (player) player.stop();
  if (original1) original1.stop();
  if (original2) original2.stop();
  resetButton(questionButton, "PLAY", "#00E938");
  resetButton(original1Button, "PLAY", "#00E938");
  resetButton(original2Button, "PLAY", "#00E938");
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
    choice = int(random(8));
  } while (choice === lastChoice && choice === secondLastChoice);

  secondLastChoice = lastChoice;
  lastChoice = choice;

  if (choice === 0) { player = sound1; fileName = "+6dB"; }
  else if (choice === 1) { player = sound2; fileName = "+12dB"; }
  else if (choice === 2) { player = sound3; fileName = "+18dB"; }
  else if (choice === 3) { player = sound4; fileName = "+24dB"; }
  else if (choice === 4) { player = sound5; fileName = "+6dB"; }
  else if (choice === 5) { player = sound6; fileName = "+12dB"; }
  else if (choice === 6) { player = sound7; fileName = "+18dB"; }
  else { player = sound8; fileName = "+24dB"; }
}
