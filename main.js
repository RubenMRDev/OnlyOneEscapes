import {
  assignGoblinToPlayer,
  showDuelingGoblins,
  showDyingGoblin,
  assignedGoblins as importedGoblins,
  showWinnerGoblin,
  showBossAttacking,
} from "./goblin.js";

import { showHistory as displayHistory, saveGame } from "./storage.js";

let assignedGoblins;

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  assignedGoblins = importedGoblins;

  setTimeout(() => {
    loadingScreen.style.transition = "opacity 1s ease";
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      dialogue();
    }, 1000);
  }, 3000);
});

/////////////////////EVENT-LISTENER////////////////////////////////

document
  .getElementById("start-game-button")
  .addEventListener("click", startGame);
document
  .getElementById("show-history-button")
  .addEventListener("click", showHistory);

document
  .getElementById("add-player-button")
  .addEventListener("click", newInsertPlayer);
document.getElementById("play-button").addEventListener("click", showDuels);
document.getElementById("fight-button").addEventListener("click", startDuels);
document
  .getElementById("start-round-button")
  .addEventListener("click", startRound);
document.getElementById("nextButton").addEventListener("click", dialogue);
document.getElementById("playButton").addEventListener("click", loadWebsite);
document
  .getElementById("remove-player-button")
  .addEventListener("click", removeLastPlayer);

function removeLastPlayer() {
  touch_sound.play(); 
  Swal.fire({
    title: "Are you sure you want to remove the last player?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "#808080",
    confirmButtonText: "Remove",
    heightAuto: false,
    customClass: {
      popup: "swal2-custom",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      let deletedPlayer = nombres.pop();
      death_sound.play();
      document.getElementById("lobby").removeChild(
        document.getElementById(deletedPlayer)
      );
    }
  });
}


///////////////////////UI-INICIO///////////////////////////////////

function startGame() {
  document.getElementById("add-player-menu").classList.remove("d-none");
  document.getElementById("add-player-button").style.display = "block";
  document.getElementById("lobby").classList.remove("d-none");
  document.getElementById("play-button").style.display = "block";
  document.getElementById("add-player-menu").classList.remove("d-none");
  document.getElementById("add-player-menu").classList.add("d-flex");
  document.getElementById("start-menu").classList.remove("d-flex");
  document.getElementById("start-menu").style.display = "none";
  document.getElementById("fight-button").classList.add("d-none");
  document.getElementById("historial").classList.remove("d-flex");
  document.getElementById("historial").classList.add("d-none");
  touch_sound.play();

}

function showHistory() {
  displayHistory();
  touch_sound.play();
}

///////////////////////////PLAYERS/////////////////////////////////

let nombres = [];

const fight_music = new Audio("https://res.cloudinary.com/ddguqr8l8/video/upload/v1733382316/battle_yxwsew.mp3");
const touch_sound = new Audio("images/audio/touch.mp3");
const error_sound = new Audio("images/audio/error.mp3");
const death_sound = new Audio("images/audio/death.mp3");
const add_sound = new Audio("images/audio/add.mp3");
const page_sound = new Audio("images/audio/page.mp3");
fight_music.volume = "0.3";
page_sound.volume = "0.1";
error_sound.volume = "0.4";
const menu_music = new Audio(
  "https://res.cloudinary.com/ddguqr8l8/video/upload/v1733180368/crombat_whxfat.mp3"
);
menu_music.volume = "0.3";
const winner_music = new Audio("images/audio/winner.mp3");

let dialogueCount = 0;

function dialogue() {
  document.getElementById("nextButton").style.display = "block";
  const dialog1 =
    "¡Ahhh, welcome, fragile creatures! You are in my domain, a labyrinth that breathes darkness and death. Here, there are no memories, no mercy... only one path: survival.";
  const dialog2 =
    "Do not trust those faces too much... one of you will be the last one standing! Every corner hides a secret, every shadow, a danger. Friends? Enemies? Decide quickly, or the labyrinth will decide for you.";
  const dialog3 =
    "Go, run... or stay and face your fate. Time will not be your ally here. Let the game begin!";

  if (dialogueCount == 0) {
    document.getElementById("dialogue").innerHTML = "";
    addLettersToDiv(dialog1, "dialogue");
    document.getElementById("nextButton").style.display = "none";

    dialogueCount++;
  } else if (dialogueCount == 1) {
    document.getElementById("dialogue").innerHTML = "";
    addLettersToDiv(dialog2, "dialogue");
    document.getElementById("nextButton").style.display = "none";
    page_sound.play()
    

    dialogueCount++;
  } else if (dialogueCount == 2) {
    document.getElementById("dialogue").innerHTML = "";
    addLettersToDiv(dialog3, "dialogue");
    document.getElementById("nextButton").style.display = "none";
    page_sound.play()
    

    dialogueCount++;
  }
}

let mouseX = 0;
let mouseY = 0;
let flashlightOn = true;

let flashlight = document.getElementById("flashlight");

function getMousePosition(e) {
  if (flashlightOn) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    flashlight.style.setProperty("--Xpos", mouseX + "px");
    flashlight.style.setProperty("--Ypos", mouseY + "px");
  }
}

document.addEventListener("mousemove", getMousePosition);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    flashlightOn = !flashlightOn;
    flashlight.style.display = flashlightOn ? "block" : "none";
  }
});

flashlight.style.setProperty("--Xpos", "50vw");
flashlight.style.setProperty("--Ypos", "50vh");

function addLettersToDiv(string, divId) {
  const letters = string.split("");
  const div = document.getElementById(divId);
  let i = 0;
  const intervalId = setInterval(() => {
    div.innerHTML += letters[i];
    i++;
    if (i === letters.length) {
      clearInterval(intervalId);
      document.getElementById("nextButton").style.display = "block";
      if (dialogueCount == 3) {
        document.getElementById("playButton").style.display = "block";
        document.getElementById("nextButton").style.display = "none";
      }
    }
  }, 5);
}

function loadWebsite() {
  document.getElementById("black-screen").remove();
  menu_music.loop = true;
  menu_music.play();
}

//-----------------------------------UPDATE-DEAD-ALIVE-OVERLAY--------------------------------------------

function updatePlayers(alive, dead = []) {
  const listPlayers = document.getElementById("dropdown-players");
  listPlayers.innerHTML = "";

  function createPlayerLi(player, iconStatus, color) {
    const playerLi = document.createElement("li");
    const icon = document.createElement("i");
    playerLi.style.color = color;
    icon.setAttribute("class", iconStatus + " px-2");

    playerLi.appendChild(icon);
    playerLi.appendChild(document.createTextNode(player));

    return playerLi;
  }

  alive.forEach((player) => {
    const playerLi = createPlayerLi(
      player,
      "fa-solid fa-face-smile",
      "#ffe500"
    );
    listPlayers.appendChild(playerLi);
  });

  dead.forEach((player) => {
    const playerLi = createPlayerLi(player, "fa-solid fa-skull", "black");
    listPlayers.appendChild(playerLi);
  });
}

//------------------------------SKULL-BUTTON-STATUS-OVERLAY------------------------------------------------

const buttonSkull = document.getElementById("dropdownPlayersStatus");

buttonSkull.addEventListener("click", () => {
  if (!muertos.length > 0) {
    updatePlayers(nombres);
    if (nombres.length < 1) {
      document.getElementById("dropdown-players").classList.add("d-none");
    }else{
      document.getElementById("dropdown-players").classList.remove("d-none");
    }
  }
});

//Settings Menu
const overlayButton = document.getElementById("settingsOverlayButton");
const overlay = document.getElementById("overlay");
const exitButton = document.getElementById("exitButton");

const slider = document.getElementById("music-slider");
slider.addEventListener("input", () => {
  fight_music.volume = slider.value;
  menu_music.volume = slider.value;
  winner_music.volume = slider.value;
});

const muteButton = document.getElementById("mute-button");
let isMuted = false;

muteButton.addEventListener("click", () => {
  if (isMuted) {
    muteButton.textContent = "MUTE";
    fight_music.muted = false;
    menu_music.muted = false;
    winner_music.muted = false;
  } else {
    muteButton.textContent = "UNMUTE";
    fight_music.muted = true;
    menu_music.muted = true;
    winner_music.muted = true;
  }
  isMuted = !isMuted;
  touch_sound.play();
});


overlayButton.addEventListener("click", () => {
  overlay.classList.toggle("hidden");
  touch_sound.play();
});

exitButton.addEventListener("click", () => {
  overlay.classList.add("hidden");
  touch_sound.play();
});




async function newInsertPlayer() {
  touch_sound.play();
  
  const { value: playerName } = await Swal.fire({
    input: "text",
    inputLabel: "Player Name",
    inputPlaceholder: "Enter the player's name...",
    inputAttributes: {
      "aria-label": "Introduce the name of the player:r",
    },
    heightAuto: false,
    showCancelButton: true,
    customClass: {
      popup: "swal2-custom",
    },
  });

  if (playerName) {
    const name = playerName.trim().toUpperCase();

    if (nombres.includes(name)) {
      await Swal.fire({
        title: "ERROR",
        text: "The name already exists in the player list.",
        icon: "error",
        heightAuto: false,
        customClass: {
          popup: "swal2-custom",
        },
      });

      return;
    }

    if (nombres.length < 20) {
      if (validateName(name)) {
        nombres.push(name);
        assignGoblinToPlayer(name);
        vivos = nombres;
        add_sound.play()
        await Swal.fire({
          title: "Player Added",
          text: `Player ${name} has been added.`,
          icon: "success",
          heightAuto: false,
          customClass: {
            popup: "swal2-custom",
          },
        });
      } else {
        error_sound.play();
        await Swal.fire({
          title: "ERROR",
          text: "The name has more than 10 characters.",
          icon: "error",
          heightAuto: false,
          customClass: {
            popup: "swal2-custom",
          },
        });
      }
    } else {
      error_sound.play();
      await Swal.fire({
        title: "ERROR",
        text: "Maximum player limit reached.",
        icon: "error",
        heightAuto: false,
        customClass: {
          popup: "swal2-custom",
        },
      });
    }
  }
}

function validateName(nickName) {
  return (
    nickName.length > 0 && !nombres.includes(nickName) && nickName.length < 11
  );
}

//------------------------------INICIAR-PARTIDA--------------------------

function showDuels() {
  touch_sound.play(); 
  Swal.fire({
    title: "Are you sure you want to start the game?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Start Game",
    heightAuto: false,
    customClass: {
      popup: "swal2-custom",
    },
  }).then((result) => {
    if (result.isConfirmed) {
  

      if (nombres.length >= 2) {
        touch_sound.play(); 
        document
          .getElementById("player-list-buttons")
          .classList.remove("d-flex");
        document.getElementById("player-list-buttons").classList.add("d-none");
        document.getElementById("play-button").style.display = "none";
        document.getElementById("fight-button").classList.remove("d-none");
        document.getElementById("fight-button").classList.add("d-block");
        parejas = crearParejas(mezclarArray(nombres));
        const lobby = document.getElementById("lobby");
        lobby.innerHTML = "";
        lobby.appendChild(displayPairingsAsList(parejas));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There must be at least 2 players.",
          heightAuto: false,
          customClass: {
            popup: "swal2-custom",
          },
        });
      }
    }
  });
}

function displayPairingsAsList(pairings) {
  const ul = document.createElement("ul");
  ul.classList.add("p-2");
  ul.style.listStyle = "none";

  pairings.forEach((pair) => {
    const li = document.createElement("li");
    li.classList.add("d-flex", "justify-content-between");
    const left = document.createElement("span");
    left.textContent = pair[0];
    left.style.color = "yellow";
    const vs = document.createElement("span");
    vs.textContent = "vs";
    vs.style.color = "white";
    const right = document.createElement("span");
    right.classList.add("text-end");
    right.textContent = pair[1] || "BOSS";
    right.style.color = "yellow";

    li.appendChild(left);
    li.appendChild(vs);
    li.appendChild(right);
    ul.appendChild(li);
  });

  return ul;
}

//-------------------------------------------------------------------------
function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function crearParejas(nombres) {
  let parejas = [];
  for (let i = 0; i < nombres.length; i += 2) {
    if (i + 1 < nombres.length) {
      parejas.push([nombres[i], nombres[i + 1]]);
    } else {
      parejas.push([nombres[i]]);
    }
  }
  return parejas;
}

function startDuels() {
  touch_sound.play(); 
  document.getElementById("fight-button").classList.add("d-none");
  document.getElementById("lobby").classList.add("d-none");
  document.getElementById("duels").classList.add("d-block");
  startRound();
  menu_music.pause();
  menu_music.currentTime = 0;
  fight_music.loop = true;
  fight_music.play();
}

let parejas = [];
let muertos = [];
let vivos = [];
let jugando = [];
let ganadores = [];

// VARIABLES DEL DOM
const player1dice = document.getElementById("player1dice");
const playe2dice = document.getElementById("player2dice");
const roundcount = document.getElementById("roundcount");

let dados = [
  "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733014317/unknowndice_iw0fy9.png",
  "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733014312/dice1_cc8qay.png",
  "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733014312/dice2_ozdull.png",
  "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733014313/dice3_vmikdb.png",
  "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733014314/dice4_pb8kqu.png",
  "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733014315/dice5_yp2kig.png",
  "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733014316/dice6_f6p1mh.png",
];

let step = 0;
let i = 0;
let dice1 = 0;
let dice2 = 0;
let loose = false;

function tirarDado(dado1HTML, dado2HTML, jugadores) {
  return new Promise((resolve) => {
    dado1HTML.innerHTML = `<img id="first-dice" src="${dados[0]}" width="50">`;
    dado2HTML.innerHTML = `<img id="second-dice" src="${dados[0]}" width="50">`;
    do {
      dice1 = 6 - Math.floor(Math.random() * 5);
      dice2 = 6 - Math.floor(Math.random() * 5);
    } while (dice1 === dice2);
    setTurns(jugadores, step, dice1, dice2);
    step++;
    resolve();
  });
}

function setTurns(jugadores, step, dice1, dice2) {
  const turnCount = document.getElementById("turncount");

  async function handleTurn(player, diceId) {
    return new Promise((resolve) => {
      turnCount.textContent = `${player}'S TURN`;
      if (!player) {
        turnCount.textContent = `BOSS'S TURN`;
      }
      showRollingDice();
      rollDice(diceId);
      setTimeout(() => resolve(), 3000);
    });
  }

  async function playTurns(dice1, dice2) {
    showRollingDice();
    await handleTurn(jugadores[step][0], "first-dice");
    document.getElementById("first-dice").src = dados[dice1];
    document.getElementById("rolling-dice").innerHTML = "";
    showRollingDice();
    await handleTurn(jugadores[step][1], "second-dice");
    document.getElementById("second-dice").src = dados[dice2];
    findWinners(dice1, dice2, jugadores, step);
  }

  playTurns(dice1, dice2);
}

function findWinners(dice1, dice2, jugadores, step) {
  if (jugadores[step][1] !== undefined) {
    if (dice1 > dice2) {
      ganadores.push(jugadores[step][0]);
      muertos.push(jugadores[step][1]);
      updatePlayers(ganadores, muertos);
      showDyingGoblin(jugadores[step][1], true);
      document.getElementById(
        "turncount"
      ).textContent = `${jugadores[step][0]} WINS`;
    } else {
      ganadores.push(jugadores[step][1]);
      muertos.push(jugadores[step][0]);
      updatePlayers(ganadores, muertos);
      showDyingGoblin(jugadores[step][0], false);
      document.getElementById(
        "turncount"
      ).textContent = `${jugadores[step][1]} WINS`;
    }
  } else {
    if (dice1 > dice2) {
      ganadores.push(jugadores[step][0]);
      updatePlayers(ganadores, muertos);
      document.getElementById(
        "turncount"
      ).textContent = `${jugadores[step][0]} SURVIVES`;
    } else {
      showBossAttacking();
      muertos.push(jugadores[step][0]);
      updatePlayers(ganadores, muertos);
      setTimeout(() => {
        showDyingGoblin(jugadores[step][0], false);
      }, 800);
      document.getElementById(
        "turncount"
      ).textContent = `${jugadores[step][0]} DIDN'T SURVIVE`;
    }
  }
}

function showRollingDice() {
  const rollingDice = document.createElement("img");
  //rollingDice.style.height = "200px";
  const gifUrl =
    "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733077596/yellowdice_yuvoti.gif";
  rollingDice.src = `${gifUrl}?t=${Date.now()}`;
  const diceContainer = document.getElementById("rolling-dice");
  diceContainer.classList.remove("d-none");
  diceContainer.innerHTML = "";
  diceContainer.appendChild(rollingDice);
}

function rollDice(id) {
  let count = 0;
  let swapNumber = 4;
  let intervalo = setInterval(() => {
    let index = 6 - Math.floor(Math.random() * 5);
    document.getElementById(id).src = dados[index];
    count++;
    if (count >= swapNumber) {
      clearInterval(intervalo);
    }
  }, 500);
}

async function ejecutarRonda(jugadores) {
  if (loose) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You need at least one player to start.",
      heightAuto: false,
    });
  }
  for (let i = 0; i < jugadores.length; i++) {
    showDuelingGoblins(jugadores[i][0], jugadores[i][1]);
    await tirarDado(player1dice, playe2dice, jugadores);
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  if (ganadores.length == 1) {
    if (fight_music) {
      fight_music.pause();
      fight_music.currentTime = 0;
      winner_music.play();
    }

    saveGame(ganadores[0]);
    document.getElementById("start-menu").classList.remove("d-none");
    document.getElementById("duels").classList.remove("d-block");

    loadWinnerScreen();

    parejas = [];
    muertos = [];
    vivos = nombres;

    jugando = [];
    ganadores = [];

    roundNumber = 0;
    step = 0;
    i = 0;
  } else {
    vivos = ganadores;
    ganadores = [];
    document.getElementById("rolling-dice").classList.add("d-none");
    document.getElementById("start-round-button").classList.remove("d-none");
    document.getElementById("start-round-button").classList.add("d-inline");
    step = 0;
  }
}

function loadWinnerScreen() {
  nombres = [];
  let winnerTitle = document.createElement("h2");
  winnerTitle.classList.add("title_victoria");
  winnerTitle.textContent = "Winner";
  let winner = document.createElement("p");
  winner.classList.add("name_victoria");
  winner.textContent = ganadores[0];
  let winnerGoblin = document.createElement("img");
  winnerGoblin.src = showWinnerGoblin(ganadores[0]);
  let backToLobbyButton = document.createElement("button");
  backToLobbyButton.id = "winner";
  backToLobbyButton.classList = "button-UI text-center";
  backToLobbyButton.textContent = "Back to Lobby";
  let winnerContainer = document.createElement("div");
  winnerContainer.classList.add("text");
  winnerContainer.id = "winner-container";

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("w");
  imgContainer.appendChild(winnerGoblin);
  imgContainer.appendChild(winner);
  imgContainer.appendChild(backToLobbyButton);

  winnerContainer.appendChild(winnerTitle);
  winnerContainer.appendChild(imgContainer);

  backToLobbyButton.addEventListener("click", () => {
    document.getElementById("winner-container").classList.add("d-none");
    document.body.removeChild(winnerContainer);
    quitGame();
  });

  document.body.appendChild(winnerContainer);
}

let roundNumber = 0;

vivos = nombres;
function startRound() {
  roundNumber++;
  roundcount.innerHTML = "RONDA " + roundNumber;
  document.getElementById("start-round-button").innerHTML = "Next Round!";
  document.getElementById("start-round-button").classList.add("d-none");
  document.getElementById("start-round-button").classList.add("button-UI");
  document.getElementById("start-round-button").classList.add("mx-auto");
  document.getElementById("start-round-button").classList.add("w-auto");
  
  // playMusic()
  ejecutarRonda(crearParejas(vivos));
}

// --------------- SETTINGS FUNCTIONS ---------------//

function quitGame() {
  let winnerContainer;
  if ((winnerContainer = document.getElementById("winner-container"))) {
    document.body.removeChild(winnerContainer);
  }
  fight_music.pause();
  fight_music.currentTime = 0;
  menu_music.loop = true;
  menu_music.play();
  touch_sound.play();

  const startMenuElement = document.getElementById("start-menu");
  const duelsElement = document.getElementById("duels");
  const addPlayerMenuElement = document.getElementById("add-player-menu");
  const overlayElement = document.getElementById("overlay");
  const startRoundButtonElement = document.getElementById("start-round-button");

  startMenuElement.classList.remove("d-none");
  startMenuElement.style.display = "flex";
  startMenuElement.classList.add("d-flex");

  duelsElement.classList.remove("d-block");
  addPlayerMenuElement.classList.remove("d-block");
  overlayElement.classList.add("hidden");
  //overlayElement.classList.add("none");

  muertos = [];
  vivos = [];
  ganadores = [];
  roundNumber = 0;
  step = 0;
  i = 0;
  parejas = [];
  jugando = [];
  nombres = [];
  assignedGoblins = new Map();

  const addPlayerButtons = document.getElementById("player-list-buttons");
  addPlayerButtons.classList.remove("d-none");
  addPlayerButtons.classList.add("d-flex");

  document.getElementById("lobby").innerHTML = "";
  startRoundButtonElement.innerHTML = "Start Round!";
  startRoundButtonElement.classList.add("d-inline");
  addPlayerMenuElement.classList.remove("d-flex");
  addPlayerMenuElement.classList.add("d-none");
}

const quitGameButton = document.getElementById("quit-button");

quitGameButton.addEventListener("click", () => {
  quitGame();
});

//---------------------------------------WINDOW-EVENT--------------------------------------
