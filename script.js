const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const roadWidth = canvas.width * 0.6;
const laneCount = 3;
const laneWidth = roadWidth / laneCount;
const roadX = (canvas.width - roadWidth) / 2;

// Oyuncu arabası
const playerCar = {
  x: roadX + laneWidth,
  y: canvas.height - 150,
  width: 50,
  height: 100,
  lane: 1,
  image: new Image(),
};
playerCar.image.src = "https://i.imgur.com/Q9nC8zV.png"; // Kırmızı araba sprite

// Düşman araçlar
const enemies = [];
for (let i = 0; i < 3; i++) {
  enemies.push({
    x: roadX + laneWidth * i,
    y: -200 * i - 150,
    width: 50,
    height: 100,
    image: new Image(),
  });
  enemies[i].image.src = "https://i.imgur.com/ax9qMBO.png"; // Siyah araba sprite
}

// Oyun döngüsü
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRoad();
  drawCar(playerCar);

  for (let car of enemies) {
    car.y += 5;
    if (car.y > canvas.height) {
      car.y = -200;
      car.x = roadX + laneWidth * Math.floor(Math.random() * laneCount);
    }
    drawCar(car);
    if (checkCollision(playerCar, car)) {
      alert("ÇARPTIN! Oyun bitti.");
      window.location.reload();
    }
  }

  requestAnimationFrame(gameLoop);
}

function drawRoad() {
  ctx.fillStyle = "#2c3e50";
  ctx.fillRect(roadX, 0, roadWidth, canvas.height);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 5;
  for (let i = 1; i < laneCount; i++) {
    const x = roadX + i * laneWidth;
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 20);
      ctx.stroke();
    }
  }
}

function drawCar(car) {
  ctx.drawImage(car.image, car.x, car.y, car.width, car.height);
}

function checkCollision(carA, carB) {
  return (
    carA.x < carB.x + carB.width &&
    carA.x + carA.width > carB.x &&
    carA.y < carB.y + carB.height &&
    carA.y + carA.height > carB.y
  );
}

// Kontroller
document.getElementById("leftBtn").addEventListener("touchstart", () => {
  if (playerCar.lane > 0) playerCar.lane--;
  playerCar.x = roadX + laneWidth * playerCar.lane;
});

document.getElementById("rightBtn").addEventListener("touchstart", () => {
  if (playerCar.lane < laneCount - 1) playerCar.lane++;
  playerCar.x = roadX + laneWidth * playerCar.lane;
});

gameLoop();
