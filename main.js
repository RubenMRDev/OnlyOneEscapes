import { assignGoblinToPlayer, showDuelingGoblins } from "./goblin.js";

//alerta añade un jugador
//play aviso seguro que quieres empezar solo la primera vez
//dado rotando
//resultado del dado
//moverse entre pantallas
//mostrar logs en pantalla inicio
//quitar
//añadir nombres en rojo a la lista en enfrentamientos
//animacion/transicion de inicio
//animacion boss

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");

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

///////////////////////UI-INICIO///////////////////////////////////

function startGame() {
  document.getElementById("add-player-menu").classList.remove("d-none");
  document.getElementById("add-player-button").style.display = "block";
  document.getElementById("lobby").classList.remove("d-none");
  document.getElementById("play-button").style.display = "block";

  document.getElementById("add-player-menu").style.display = "flex";
  document.getElementById("start-menu").classList.remove("d-flex");
  document.getElementById("start-menu").style.display = "none";
  document.getElementById("fight-button").style.display = "none";
}

function showHistory() {
  //Logs
  const p = document.getElementById("history");
  p.textContent = "No history has been found";
  p.style.color = "white";
}

///////////////////////////PLAYERS/////////////////////////////////

/* let ALUMNOS = [
  "Israel Abad Barrera",
  "Javier Ariza Rosales",
  "Nicolás Burgos Contreras",
  "Felipe Chacón Montero",
  "Fernando de la Torre Esperon",
  "Jesús Manuel García Lozano",
  "Alejandro Gómez Ojeda",
  "Pablo Jiménez Menéndez",
  "Mario Lebrero García",
  "Pablo Noria Gómez",
  "Mauricio Nicolas Ortiz",
  "Adrián Pérez Agredano",
  "Jairo Saborito Franco",
  "Judith Tamayo Balogh",
  "Samuel Utrilla Núñez",
  "Ruben Martin Ruiz",
]; */

let nombres = [];

const fight_music = new Audio("images/audio/fight.mp3");
const menu_music = new Audio("images/audio/menu.mp3");
const winner_music = new Audio("images/audio/winner.mp3");

let dialogueCount = 0;

function dialogue() {
  document.getElementById("nextButton").style.display = "block";
  const dialog1 =
    "¡Ahhh, bienvenidos, frágiles criaturas! Están en mi dominio, un laberinto que respira oscuridad y muerte. Aquí no hay recuerdos, ni piedad... solo un camino: sobrevivir.";
  const dialog2 =
    "No confíen demasiado en esas caras... ¡uno de ustedes será el último en pie! Cada esquina guarda un secreto, cada sombra, un peligro. ¿Amigos? ¿Enemigos? ¡Decídanlo pronto, o el laberinto lo hará por ustedes!";
  const dialog3 =
    "Vayan, corran... o quédense y enfrenten su destino. El tiempo no será su aliado aquí. ¡Que comience el juego!";

  if (dialogueCount == 0) {
    document.getElementById("dialogue").innerHTML = "";
    addLettersToDiv(dialog1, "dialogue");
    document.getElementById("nextButton").style.display = "none";
    dialogueCount++;
  } else if (dialogueCount == 1) {
    document.getElementById("dialogue").innerHTML = "";
    addLettersToDiv(dialog2, "dialogue");
    document.getElementById("nextButton").style.display = "none";
    dialogueCount++;
  } else if (dialogueCount == 2) {
    document.getElementById("dialogue").innerHTML = "";
    addLettersToDiv(dialog3, "dialogue");
    document.getElementById("nextButton").style.display = "none";
    dialogueCount++;
  }
}

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
  }
});

//Settings Menu
const overlayButton = document.getElementById("settingsOverlayButton");
const overlay = document.getElementById("overlay");
const exitButton = document.getElementById("exitButton");

overlayButton.addEventListener("click", () => {
  overlay.classList.toggle("hidden");
});

exitButton.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

async function newInsertPlayer() {
  const { value: playerName } = await Swal.fire({
    input: "text",
    inputLabel: "Nombre de Jugador",
    inputPlaceholder: "Introduce el nombre del jugador...",
    inputAttributes: {
      "aria-label": "Introduce the name of the player:r",
    },
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
        text: "El nombre ya existe en la lista de jugadores.",
        icon: "error",
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
        await Swal.fire({
          title: "Jugador Agregado",
          text: `El jugador ${name} ha sido agregado.`,
          icon: "success",
          customClass: {
            popup: "swal2-custom",
          },
        });
      } else {
        await Swal.fire({
          title: "ERROR",
          text: "El nombre tiene mas de 10 caracteres.",
          icon: "error",
          customClass: {
            popup: "swal2-custom",
          },
        });
      }
    } else {
      await Swal.fire({
        title: "ERROR",
        text: "Límite máximo de jugadores alcanzado.",
        icon: "error",
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
  Swal.fire({
    title: "Are you sure you want to start the game?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Start Game",
    customClass: {
      popup: "swal2-custom",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (nombres.length >= 1) {
        //show first round pairings
        //TODO FIX EVENT
        document
          .getElementById("player-list-buttons")
          .classList.remove("d-flex");
        document.getElementById("player-list-buttons").style.display = "none";
        document.getElementById("play-button").style.display = "none";
        document.getElementById("fight-button").style.display = "block";
        parejas = crearParejas(mezclarArray(nombres));
        const lobby = document.getElementById("lobby");
        lobby.innerHTML = "";
        lobby.appendChild(displayPairingsAsList(parejas));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tiene que haber al menos 1 jugador.",
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
const duelsContainer = document.getElementById("duelsContainer");

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

  function handleTurn(player, diceId) {
    return new Promise((resolve) => {
      turnCount.textContent = `${player}'S TURN`;
      rollDice(diceId);
      showRollingDice();
      setTimeout(() => resolve(), 3000);
    });
  }

  async function playTurns(dice1, dice2) {
    await handleTurn(jugadores[step][0], "first-dice");
    console.log(dados[dice1]);
    document.getElementById("first-dice").src = dados[dice1];
    await handleTurn(jugadores[step][1], "second-dice");
    console.log(dados[dice2]);
    document.getElementById("second-dice").src = dados[dice2];
    findWinners(dice1, dice2, jugadores);
  }

  playTurns(dice1, dice2);
}

function findWinners(dice1, dice2, jugadores) {
  if (jugadores[step][1]) {
    if (dice1 > dice2) {
      ganadores.push(jugadores[step][0]);
      muertos.push(jugadores[step][1]);
      document.getElementById(
        "turncount"
      ).textContent = `${jugadores[step][0]} WINS`;
    } else {
      ganadores.push(jugadores[step][1]);
      muertos.push(jugadores[step][0]);
      document.getElementById(
        "turncount"
      ).textContent = `${jugadores[step][1]} WINS`;
    }
  } else {
    if (dice1 > dice2) {
      ganadores.push(jugadores[step][0]);
      document.getElementById(
        "turncount"
      ).textContent = `${jugadores[step][1]} SURVIVES`;
    } else {
      muertos.push(jugadores[step][0]);
      document.getElementById(
        "turncount"
      ).textContent = `${jugadores[step][1]} DIDN'T SURVIVE`;
    }
  }
}

function showRollingDice() {
  const rollingDice = document.createElement("img");
  rollingDice.src =
    "https://res.cloudinary.com/ddguqr8l8/image/upload/v1733077596/yellowdice_yuvoti.gif";
  rollDice.classList = "align-items-start";
  document.getElementById("rolling-dice-desktop").appendChild(rollingDice);
  setTimeout(() => {
    rollingDice.src = "";
    document.getElementById("goblins-row").removeChild(rollingDice);
  }, 3000);
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

    document.getElementById("start-menu").classList.remove("d-none");
    document.getElementById("duels").classList.remove("d-block");
    //TODO: Insertar pantalla ganador
    swal.fire({
      title: "Tenemos un ganador",
      text: `El ganador es ${ganadores[0]}`,
      imageUrl: "images/crown.png",
      imageWidth: 230,
      imageHeight: 150,
      confirmButtonText: "Aceptar",
      customClass: {
        popup: "swal2-custom",
      },
    });

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
    document.getElementById("start-round-button").style.display = "inline";
    step = 0;
  }
}

let roundNumber = 0;

vivos = nombres;
function startRound() {
  roundNumber++;
  roundcount.innerHTML = "RONDA " + roundNumber;
  document.getElementById("start-round-button").innerHTML = "Next Round!";
  document.getElementById("start-round-button").style.display = "none";
  // playMusic()
  ejecutarRonda(crearParejas(mezclarArray(vivos)));
}

//---------------------------------------WINDOW-EVENT--------------------------------------
