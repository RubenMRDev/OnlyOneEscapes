////////////////////////////////////////////////PLAYERS//////////////////////////////////

let players = new Array();

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

insertPlayer();

function insertPlayer() {
  let form = document.getElementById("newPlayerForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.elements.playerNickname.value.trim();
    console.log();
    if (validateName(name)) {
      players.push(name);
      document.getElementById("playerNickname").value = "";
      document.getElementById("players-roster").innerHTML = stringFromCurrentPlayers(players);
      closeNewPlayerMenu();
    } else {
      alert(`el nickname ${name} no es válido`);
      document.getElementById("playerNickname").value = "";
    }
  });
}

function stringFromCurrentPlayers(playersArr) {
  return playersArr.join("</br>");
}

function validateName(nickName) {
  //name empty o ya existe en el array
  return nickName.length > 0 && !players.includes(nickName);
}

//-------------------------------------------------------------------------------------------------------------
/*
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
];

function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

mezclarArray(nombres);

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

let jugadores = crearParejas(nombres);

// for(let i=0;i<parejas.length;i++){
//     document.getElementById("players").innerHTML += parejas[i].join(" y ") + "<br>";
// }

let muertos = [];
let vivos = [];
let jugando = [];
let ganadores = [];

function empezarPartida(jugador1, jugador2) {
  let dado1 = Math.floor(Math.random() * 6 + 1);
  let dado2 = Math.floor(Math.random() * 6 + 1);

  if (dado1 > dado2) {
    console.log(jugador1 + " ha muerto.");
    muertos.push(jugador1);
    ganadores.push(jugador2);
  } else {
    console.log(jugador2 + " ha muerto.");
    muertos.push(jugador2);
    ganadores.push(jugador1);
  }
}

function ejecutarRonda(jugadores) {
  for (let i = 0; i < jugadores.length; i++) {
    empezarPartida(jugadores[i][0], jugadores[i][1]);
  }
}

ejecutarRonda(jugadores);
console.log("== RONDA 1 ==");
console.log("MUERTOS");
console.log(muertos);
console.log("GANADORES");
console.log(ganadores);
*/
