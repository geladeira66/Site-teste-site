Array.prototype.last = function () {
  return this[this.length - 1];
};

Math.sinus = function (degree) {
  return Math.sin((degree / 180) * Math.PI);
};

// ===============================
// CONFIGURAÇÕES DO JOGO
// ===============================

let phase = "waiting";
let lastTimestamp;

let heroX;
let heroY;
let sceneOffset;

let platforms = [];
let sticks = [];
let trees = [];

let score = 0;

const canvasWidth = 375;
const canvasHeight = 375;
const platformHeight = 100;

const heroDistanceFromEdge = 10;
const paddingX = 100;
const perfectAreaSize = 10;

const backgroundSpeedMultiplier = 0.2;

const hill1BaseHeight = 100;
const hill1Amplitude = 10;
const hill1Stretch = 1;

const hill2BaseHeight = 70;
const hill2Amplitude = 20;
const hill2Stretch = 0.5;

const stretchingSpeed = 4;
const turningSpeed = 4;
const walkingSpeed = 4;

const transitioningSpeed = 2;
const fallingSpeed = 2;

const heroWidth = 17;
const heroHeight = 30;

// ===============================
// ELEMENTOS DA PÁGINA
// ===============================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const introductionElement =
  document.getElementById("introduction");

const perfectElement =
  document.getElementById("perfect");

const restartButton =
  document.getElementById("restart");

const scoreElement =
  document.getElementById("score");

// ===============================
// TAMANHO DO CANVAS
// ===============================

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draw();
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// ===============================
// RESETAR JOGO
// ===============================

function resetGame() {
  phase = "waiting";
  lastTimestamp = undefined;

  sceneOffset = 0;
  score = 0;

  introductionElement.style.opacity = "1";
  perfectElement.style.opacity = "0";

  restartButton.style.display = "none";

  scoreElement.innerText = score;

  platforms = [
    {
      x: 50,
      w: 50
    }
  ];

  for (let i = 0; i < 4; i++) {
    generatePlatform();
  }

  sticks = [
    {
      x: platforms[0].x + platforms[0].w,
      length: 0,
      rotation: 0
    }
  ];

  trees = [];

  for (let i = 0; i < 10; i++) {
    generateTree();
  }

  heroX =
    platforms[0].x +
    platforms[0].w -
    heroDistanceFromEdge;

  heroY = 0;

  draw();
}

// ===============================
// GERAR ÁRVORES
// ===============================

function generateTree() {
  const minimumGap = 30;
  const maximumGap = 150;

  const lastTree =
    trees[trees.length - 1];

  const furthestX =
    lastTree ? lastTree.x : 0;

  const x =
    furthestX +
    minimumGap +
    Math.floor(
      Math.random() *
        (maximumGap - minimumGap)
    );

  const treeColors = [
    "#6D8821",
    "#8FAC34",
    "#98B333"
  ];

  trees.push({
    x: x,
    color:
      treeColors[
        Math.floor(
          Math.random() *
            treeColors.length
        )
      ]
  });
}

// ===============================
// GERAR PLATAFORMAS
// ===============================

function generatePlatform() {
  const minimumGap = 40;
  const maximumGap = 200;

  const minimumWidth = 20;
  const maximumWidth = 100;

  const lastPlatform =
    platforms[platforms.length - 1];

  const furthestX =
    lastPlatform.x +
    lastPlatform.w;

  const x =
    furthestX +
    minimumGap +
    Math.floor(
      Math.random() *
        (maximumGap - minimumGap)
    );

  const w =
    minimumWidth +
    Math.floor(
      Math.random() *
        (maximumWidth - minimumWidth)
    );

  platforms.push({
    x: x,
    w: w
  });
}

// ===============================
// COMEÇAR A ESTICAR
// ===============================

function startStretch() {
  if (phase !== "waiting") {
    return;
  }

  lastTimestamp = undefined;

  introductionElement.style.opacity = "0";

  phase = "stretching";

  requestAnimationFrame(animate);
}

// ===============================
// PARAR DE ESTICAR
// ===============================

function endStretch() {
  if (phase === "stretching") {
    phase = "turning";
  }
}

// ===============================
// TECLADO
// ===============================

window.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();

    if (phase === "waiting") {
      startStretch();
    } else if (phase === "stretching") {
      endStretch();
    } else if (phase === "ended") {
      resetGame();
    }
  }
});

// ===============================
// MOUSE
// ===============================

window.addEventListener("mousedown", function (event) {
  if (isNavigationOrButton(event.target)) {
    return;
  }

  startStretch();
});

window.addEventListener("mouseup", function (event) {
  if (isNavigationOrButton(event.target)) {
    return;
  }

  endStretch();
});

// ===============================
// TOQUE NO CELULAR
// ===============================

window.addEventListener(
  "touchstart",
  function (event) {
    if (isNavigationOrButton(event.target)) {
      return;
    }

    event.preventDefault();

    startStretch();
  },
  {
    passive: false
  }
);

window.addEventListener(
  "touchend",
  function (event) {
    if (isNavigationOrButton(event.target)) {
      return;
    }

    event.preventDefault();

    endStretch();
  },
  {
    passive: false
  }
);

// ===============================
// IGNORAR NAVEGAÇÃO E BOTÕES
// ===============================

function isNavigationOrButton(target) {
  if (!target) {
    return false;
  }

  if (
    target.closest(".bottom-nav")
  ) {
    return true;
  }

  if (
