const ship = {
  top: 750,
  left: 850,
};

const scoreDisplay = document.querySelector("#score");

const ships = [];

const missiles = [];

let enemyCount = 16;

let score = 0;

const enemies = [
  { top: 100, left: 500 },
  { top: 100, left: 600 },
  { top: 100, left: 700 },
  { top: 100, left: 800 },
  { top: 100, left: 900 },
  { top: 100, left: 1000 },
  { top: 100, left: 1100 },
  { top: 100, left: 1200 },
  { top: 175, left: 500 },
  { top: 175, left: 600 },
  { top: 175, left: 700 },
  { top: 175, left: 800 },
  { top: 175, left: 900 },
  { top: 175, left: 1000 },
  { top: 175, left: 1100 },
  { top: 175, left: 1200 },
];

document.onkeydown = function (e) {
  if (e.keyCode === 37) {
    ship.left = ship.left - 15;
    moveShip();
  } else if (e.keyCode === 39) {
    ship.left = ship.left + 15;
    moveShip();
  } else if (e.keyCode === 68) {
    ship.left = ship.left + 15;
    moveShip();
  } else if (e.keyCode === 65) {
    ship.left = ship.left - 15;
    moveShip();
  } else if (e.keyCode === 32) {
    missiles.push({
      left: ship.left + 15,
      top: ship.top - 27,
    });
    drawMissles();
  }
};

function moveShip() {
  document.getElementById("ship").style.left = ship.left + "px";

  document.getElementById(
    "ship"
  ).innerHTML += `<div class = 'ship' style = 'left: ${ships[ship].left}px;
        top: ${ships[ship].top}px;'></div>`;
}

function drawMissles() {
  document.getElementById("missiles").innerHTML = "";

  for (let missile = 0; missile < missiles.length; missile = missile + 1) {
    document.getElementById(
      "missiles"
    ).innerHTML += `<div class='missile' style='left: ${missiles[missile].left}px; 
            top:${missiles[missile].top}px;'></div>`;
  }
}

function moveMissiles() {
  for (let missile = 0; missile < missiles.length; missile = missile + 1) {
    missiles[missile].top = missiles[missile].top - 20;
  }
}

function drawEnemies() {
  document.getElementById("enemies").innerHTML = "";

  for (let enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
    document.getElementById(
      "enemies"
    ).innerHTML += `<div class='enemy' style='left: ${enemies[enemy].left}px; 
            top:${enemies[enemy].top}px;'></div>`;
  }
}

function moveEnemies() {
  for (let enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
    enemies[enemy].top = enemies[enemy].top + 3;
  }
}

function detectCollision() {
  for (let enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
    for (let missile = 0; missile < missiles.length; missile = missile + 1) {
      console.log("enemies[enemy].top", enemies[enemy].top);

      if (
        missiles[missile].top <= enemies[enemy].top + 50 &&
        missiles[missile].top >= enemies[enemy].top &&
        missiles[missile].left >= enemies[enemy].left &&
        missiles[missile].left <= enemies[enemy].left + 50
      ) {
        enemies.splice(enemy, 1);
        missiles.splice(missile, 1);
        score++;
        enemyCount--;
        updateScore();
      }
    }
  }
}

function updateScore() {
  scoreDisplay.innerText = `score: ${score}`;
}

function postScore() {
  const scoreToPost = score;
  axios
    .post("http://localhost:6969/api/space", {
      scoreToPost,
    })
    .then((res) => {
      alert(`your score is ${res.data}`);
    });
}

function gameLoop() {
  setTimeout(gameLoop, 100);
  moveMissiles();
  drawMissles();
  moveEnemies();
  drawEnemies();
  detectCollision();
}
gameLoop();

const scoreBtn = document.getElementById("scorebtn");
scoreBtn.addEventListener("click", postScore);
