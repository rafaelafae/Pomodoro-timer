// BACKGROUND CONFIGURATIONS
const html = document.querySelector("html");
const tittle = document.querySelector(".app__title");
const banner = document.querySelector(".app__figure");

// BUTTONS
const buttons = document.querySelectorAll(".app__card-button");
const focusBtn = document.querySelector("[button--focus]");
const shortRestBtn = document.querySelector("[button--shortrest]");
const longRestBtn = document.querySelector("[button--longrest]");
const startPauseBtn = document.querySelector("#start-pause span");
const startPauseBtnIcon = document.querySelector(
  ".app__card-primary-button-icon"
);

// SOUNDS
const musicFocus = document.querySelector("#alternar-musica");
const music = new Audio("/sounds/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sounds/play.wav");
const audioPause = new Audio("/sounds/pause.mp3");
const audioEnd = new Audio("/sounds/beep.mp3");

// TIMER (seconds)
const displayTimer = document.querySelector("#timer");
let RegressTimer = 1500;
let intervalTimer = null;

// MUSIC
music.loop = true;

musicFocus.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

// CHANGING STATUS TO FOCUS
focusBtn.addEventListener("click", () => {
  RegressTimer = 1500;
  changeContext("focus");
  focusBtn.classList.add("active");
});

// CHANGING STATUS TO SHORT REST
shortRestBtn.addEventListener("click", () => {
  RegressTimer = 300;
  changeContext("short-rest");
  shortRestBtn.classList.add("active");
});

// CHANGING STATUS TO LONG REST
longRestBtn.addEventListener("click", () => {
  RegressTimer = 900;
  changeContext("long-rest");
  longRestBtn.classList.add("active");
});

// FUNCTION CHANGING STATUS
function changeContext(context) {
  showTimer();

  buttons.forEach((context) => {
    context.classList.remove("active");
  });

  html.setAttribute("data-contexto", context);
  banner.setAttribute("src", `/img/${context}.png`);

  switch (context) {
    case "focus":
      tittle.innerHTML = `Otimize sua <br>produtividade,<br>
      <strong class="app__title-strong">mergulhe no <br> que importa.</strong>`;
      break;
    case "short-rest":
      tittle.innerHTML = `Que tal dar <br> uma respirada?<br>
        <strong class="app__title-strong">Faça uma<br> pausa curta.</strong>`;
      break;
    case "long-rest":
      tittle.innerHTML = `Hora de voltar<br> à superfície.<br>
    <strong class="app__title-strong">Faça uma<br> pausa longa.</strong>`;
    default:
      break;
  }
}

// FUNCTION TIMER
const countdown = () => {
  if (RegressTimer <= 0) {
    audioEnd.play();
    alert("Tempo finalizado!");
    reset();
    return;
  }
  RegressTimer -= 1;
  showTimer();
};

// FUNCTION START OR PAUSE BUTTON
startPauseBtn.addEventListener("click", startOrPause);

function startOrPause() {
  if (intervalTimer) {
    audioPause.play();
    reset();
    return;
  }
  audioPlay.play();
  intervalTimer = setInterval(countdown, 1000); // 1 second = 1000 mileseconds
  startPauseBtn.textContent = "Stop";
  startPauseBtnIcon.setAttribute("src", `/img/pause-white.png`);
}

// FUNCTION RESET TIMER
function reset() {
  clearInterval(intervalTimer);
  startPauseBtn.textContent = "Start";
  startPauseBtnIcon.setAttribute("src", `/img/play-white.png`);
  intervalTimer = null;
}

// FUNCTION SHOW TIMER
function showTimer() {
  const clockTimer = new Date(RegressTimer * 1000);
  const formatTimer = clockTimer.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  displayTimer.innerHTML = `${formatTimer}`;
}

showTimer();
