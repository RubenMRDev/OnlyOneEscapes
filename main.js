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

///////////////////////UI-INICIO///////////////////////////////////

function startGame() {
  document.getElementById("add-player-menu").style.display = "flex";
  document.getElementById("start-menu").classList.add("d-none");
}

function showHistory() {
  //Logs
  const p = document.getElementById("history");
  p.textContent = "No history has been found";
  p.style.color = "white";
}

////////////////////////////////////////////////PLAYERS//////////////////////////////////

let nombres = [
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
];

//let nombres=[]
//let nombresa = ["Jugador 1","Jugador 2","Jugador 3","Jugador 4"]

let dados = ["/images/dado1", "/images/dado2", "/images/dado3", "/images/dado4", "/images/dado5", "/images/dado6"]

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

function popNewPlayerMenu() {
  const formContainer = document.getElementById("form-container");
  formContainer.style.display = "block";
  document.getElementById("add-player-button").style.display = "none";
}

function closeNewPlayerMenu() {
  document.getElementById("add-player-button").style.display = "inline";
  const formContainer = document.getElementById("form-container");
  formContainer.style.display = "none";
  formContainer.elements.playerNickname = "";
}

async function newInsertPlayer() {
  const { value: playerName } = await Swal.fire({
    input: "text",
    inputLabel: "Nombre de Jugador",
    inputPlaceholder: "Introduce el nombre del jugador...",
    inputAttributes: {
      "aria-label": "Introduce el nombre del jugador"
    },
    showCancelButton: true,
    customClass: {
      popup: "swal2-custom"
    }
  });

  if (playerName) {
    const name = playerName.trim();

    if (nombres.includes(name)) {
      await Swal.fire({
        title: "ERROR",
        text: "El nombre ya existe en la lista de jugadores.",
        icon: "error",
        customClass: {
          popup: "swal2-custom"
        }
      });
      return;
    }

    if (nombres.length < 20) {
      if (validateName(name)) {
        nombres.push(name);
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
          popup: "swal2-custom"
        }
      });
    }
  }
}




function insertPlayer() {

  let form = document.getElementById("newPlayerForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.elements.playerNickname.value.trim();
    console.log();
    if (nombres.length < 20) {
      if (validateName(name)) {
        nombres.push(name);
        closeNewPlayerMenu();
      } else {
        Swal.fire({
          title: "ERROR",
          text: "The name is not valid.",
          icon: "error"
        });
        document.getElementById("playerNickname").value = "";
        closeNewPlayerMenu()
      }
    } else {
      Swal.fire({
        title: "ERROR",
        text: "MAX PLAYER ERROR",
        icon: "error"
      });
      closeNewPlayerMenu()
    }

  });
}

async function insertPlayerAlert() {
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: "URL address",
    inputPlaceholder: "Enter the URL"
  });
  if (url) {
    Swal.fire(`Entered URL: ${url}`);
  }
}

function stringFromCurrentPlayers(playersArr) {
  return playersArr.join("</br>");
}

function validateName(nickName) {
  return nickName.length > 0 && !nombres.includes(nickName) && nickName.length < 11;
}

//------------------------------INICIAR-PARTIDA--------------------------

let parejas = [];
function startDuels() {
  Swal.fire({
    title: "Are you sure you want to start the game?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Start Game"
  }).then((result) => {
    if (result.isConfirmed) {
      if (nombres.length >= 1) {
        //show first round pairings
        document.getElementById("add-player-button").style.display = "none";
        document.getElementById("play").style.display = "none";
        document.getElementById("fight").style.display = "block";
        parejas = crearParejas(mezclarArray(nombres));
        document.getElementById("lobby").appendChild(displayPairingsAsList(parejas));
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
  console.log(pairings);

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



let muertos = [];
let vivos = [];
let jugando = [];
let ganadores = [];




// VARIABLES DEL DOM
const player1dice = document.getElementById("player1dice");
const playe2dice = document.getElementById("player2dice");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const roundcount = document.getElementById("roundcount");
const aliveplayers = document.getElementById("aliveplayers");
const deadplayers = document.getElementById("deadplayers");

let step = 0;
let i = 0;

function tirarDado(dado1HTML, dado2HTML, jugadores) {
  return new Promise((resolve) => {

    do {
      dado1 = Math.floor(Math.random() * 6 + 1);
      dado2 = Math.floor(Math.random() * 6 + 1);
    } while (dado1 === dado2);

    if (jugadores[step][1] !== undefined) {
      dado1HTML.innerHTML = `<img src="${dados[dado1 - 1]}.png" width="50">`;
      dado2HTML.innerHTML = `<img src="${dados[dado2 - 1]}.png" width="50">`;
      if (dado1 > dado2) {
        ganadores.push(jugadores[step][0]);
        aliveplayers.innerHTML += jugadores[step][0] + "<br>";
        muertos.push(jugadores[step][1]);
        deadplayers.innerHTML += jugadores[step][1] + "<br>";
        updatePlayers(ganadores, muertos);
      } else {
        ganadores.push(jugadores[step][1]);
        aliveplayers.innerHTML += jugadores[step][1] + "<br>";
        muertos.push(jugadores[step][0]);
        deadplayers.innerHTML += jugadores[step][0] + "<br>";
        updatePlayers(ganadores, muertos);

      }
    } else {

      dado1HTML.innerHTML = `<img src="${dados[dado1 - 1]}.png " width="50">`;
      dado2HTML.innerHTML = `<img src="${dados[dado2 - 1]}evil.png" width=50">`;
      if (dado1 > dado2) {
        ganadores.push(jugadores[step][0]);
        aliveplayers.innerHTML += jugadores[step][0] + "<br>";
      }
    }
    step++;
    resolve();
  });
}
async function ejecutarRonda(jugadores) {
  for (let i = 0; i < jugadores.length; i++) {
    if (jugadores[i][1] == undefined) {
      player1.innerHTML = jugadores[i][0]
      player2.innerHTML = "PALOMA"
      await tirarDado(player1dice, playe2dice, jugadores);
    } else {
      player1.innerHTML = jugadores[i][0]
      player2.innerHTML = jugadores[i][1]
      await tirarDado(player1dice, playe2dice, jugadores);
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  if (ganadores.length == 1) {
    alert("el ganador es " + ganadores[0])
  } else {
    vivos = ganadores;
    ganadores = [];
    document.getElementById("playbutton").style.display = "inline";
    step = 0;
  }

  //Guardar captura del estado de las rondas para los Logs

}
let roundNumber = 0;

//TODO HACER FUNCION DONDE METAS POR PARAMETRO EL FICHERO DE AUDIO
function playMusic() {
  var music = new Audio('images/play.mp3');
  music.play();
}

function startRound() {
  Swal.fire({
    title: "Are you sure you want to start the game?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Start Game"
  }).then((result) => {
    if (result.isConfirmed) {
      if (nombres.length >= 1) {
        roundNumber++;
        roundcount.innerHTML = "RONDA " + roundNumber;
        aliveplayers.innerHTML = "";
        document.getElementById("playbutton").innerHTML = "Next Round!";
        document.getElementById("playbutton").style.display = "none";
        playMusic()
        //SOS
        ejecutarRonda(crearParejas(mezclarArray(nombres)));
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



