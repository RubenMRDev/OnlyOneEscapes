////////////////////////////////////////////////PLAYERS//////////////////////////////////

// let nombres = [
//     "Israel Abad Barrera",
//     "Javier Ariza Rosales",
//     "Nicolás Burgos Contreras",
//     "Felipe Chacón Montero",
//     "Fernando de la Torre Esperon",
//     "Jesús Manuel García Lozano",
//     "Alejandro Gómez Ojeda",
//     "Pablo Jiménez Menéndez",
//     "Mario Lebrero García",
//     "Pablo Noria Gómez",
//     "Mauricio Nicolas Ortiz",
//     "Adrián Pérez Agredano",
//     "Jairo Saborito Franco",
//     "Judith Tamayo Balogh",
//     "Samuel Utrilla Núñez",
//     "Ruben Martin Ruiz"
// ];

let nombres = []

function loadPlayers(players) {
  const divPlayers = document.getElementById("dropdown-players");
  divPlayers.innerHTML = "";
  for (let i = 0; i < players.length; i++) {
    divPlayers.innerHTML += `<li> ${players[i]}</li>`
  }

}
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
      popup: "swal2-custom" // Aplica el fondo personalizado
    }
  });

  if (playerName) {
    const name = playerName.trim();

    // Verificar si el array ya contiene el nombre ingresado
    if (nombres.includes(name)) {
      await Swal.fire({
        title: "ERROR",
        text: "El nombre ya existe en la lista de jugadores.",
        icon: "error",
        customClass: {
          popup: "swal2-custom"
        }
      });
      return; // Salir de la función si el nombre ya existe
    }

    if (nombres.length < 20) {
      if (validateName(name)) {
        nombres.push(name);
        loadPlayers(nombres);
        await Swal.fire({
          title: "Jugador Agregado",
          text: `El jugador ${name} ha sido agregado.`,
          icon: "success",
          customClass: {
            popup: "swal2-custom"
          }
        });
      } else {
        await Swal.fire({
          title: "ERROR",
          text: "El nombre tiene mas de 10 caracteres.",
          icon: "error",
          customClass: {
            popup: "swal2-custom"
          }
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
        loadPlayers(nombres)
        closeNewPlayerMenu()
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
  //name empty o ya existe en el array
  return nickName.length > 0 && !nombres.includes(nickName) && nickName.length < 11;
}






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
const deathplayers = document.getElementById("deathplayers");

let step = 0;
let i = 0;
let intervalo = 100; // Tiempo inicial en milisegundos


function tirarDado(dado1HTML, dado2HTML, jugadores) {
  return new Promise((resolve) => {
    let dado1 = Math.floor(Math.random() * 6 + 1);
    let dado2 = Math.floor(Math.random() * 6 + 1);
    dado1HTML.innerHTML = "<span>" + dado1 + "</span>";
    dado2HTML.innerHTML = "<span>" + dado2 + "</span>";

    i++;
    intervalo *= 1.2;

    if (i >= 10) {
      dado1HTML.innerHTML = "<h1>" + dado1 + "</h1>";
      dado2HTML.innerHTML = "<h1>" + dado2 + "</h1>";
      intervalo = 50;
      i = 0;

      // Comprobar si los números son iguales
      if (dado1 === dado2) {
        // Si los dados son iguales, esperar 1 segundo antes de reiniciar
        setTimeout(() => {
          // Llamar de nuevo a la función para continuar tirando los dados
          resolve(tirarDado(dado1HTML, dado2HTML, jugadores));
        }, 1000);  // Espera de 1 segundo (1000 ms)
      } else {
        if (jugadores[step][1] != undefined) {
          if (dado1 > dado2) {
            ganadores.push(jugadores[step][0]);
            aliveplayers.innerHTML += jugadores[step][0] + "<br>";
            muertos.push(jugadores[step][1])
            deathplayers.innerHTML += jugadores[step][1] + "<br>";
            step++;
          } else {
            ganadores.push(jugadores[step][1]);
            aliveplayers.innerHTML += jugadores[step][1] + "<br>";
            muertos.push(jugadores[step][0])
            deathplayers.innerHTML += jugadores[step][0] + "<br>";
            step++;
          }
          resolve();
        } else {
          if (dado1 > dado2) {
            ganadores.push(jugadores[step][0]);
            aliveplayers.innerHTML += jugadores[step][0] + "<br>";
            step++;
          }
          resolve();
        }
      }
    } else {
      setTimeout(() => resolve(tirarDado(dado1HTML, dado2HTML, jugadores)), intervalo);
    }
  });
}
function boss(dado1HTML, dado2HTML, jugadores) {
  return new Promise((resolve) => {
    let dado1 = Math.floor(Math.random() * 6 + 1);
    let dado2 = Math.floor(Math.random() * 6 + 1);
    dado1HTML.innerHTML = "<span>" + dado1 + "</span>";
    dado2HTML.innerHTML = "<span>" + dado2 + "</span>";

    i++;
    intervalo *= 1.2;

    if (i >= 10) {
      dado1HTML.innerHTML = "<h1>" + dado1 + "</h1>";
      dado2HTML.innerHTML = "<h1>" + dado2 + "</h1>";
      intervalo = 50;
      i = 0;

      // Comprobar si los números son iguales
      if (dado1 === dado2) {
        // Si los dados son iguales, esperar 1 segundo antes de reiniciar
        setTimeout(() => {
          // Llamar de nuevo a la función para continuar tirando los dados
          resolve(tirarDado(dado1HTML, dado2HTML, jugadores));
        }, 1000);  // Espera de 1 segundo (1000 ms)
      } else {

        if (dado1 < dado2) {
          ganadores.push(jugadores[step][0]);
          aliveplayers.innerHTML += jugadores[step][0] + "<br>";
          step++;
        } else {
          muertos.push(jugadores[step][0])
          deathplayers.innerHTML += jugadores[step][0] + "<br>";
          step++;
        }
        resolve();
      }
    } else {
      setTimeout(() => resolve(tirarDado(dado1HTML, dado2HTML, jugadores)), intervalo);
    }
  });
}

async function ejecutarRonda(jugadores) {
  for (let i = 0; i < jugadores.length; i++) {
    if (jugadores[i][1] == undefined) {
      player1.innerHTML = jugadores[i][0]
      player2.innerHTML = "PALOMA"
      await tirarDado(player1dice, playe2dice, jugadores);
    } else {
      // Esperar a que termine la tirada del dado de cada jugador antes de continuar
      player1.innerHTML = jugadores[i][0]
      player2.innerHTML = jugadores[i][1]
      await tirarDado(player1dice, playe2dice, jugadores);
    }

    // Esperar 1 segundo antes de pasar al siguiente jugador
    await new Promise(resolve => setTimeout(resolve, 1000));  // Espera de 1 segundo
  }

  if (ganadores.length == 1) {
    alert("el ganador es " + ganadores[0])
  } else {
    vivos = ganadores;
    ganadores = [];
    document.getElementById("playbutton").style.display = "inline";
    step = 0;
  }
}
let roundNumber = 0;

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
        mezclarArray(nombres);
        vivos = nombres;
    
        roundNumber++;
        roundcount.innerHTML = "RONDA " + roundNumber;
        aliveplayers.innerHTML = "";
        document.getElementById("playbutton").innerHTML = "Next Round!";
        document.getElementById("playbutton").style.display = "none";
    
        ejecutarRonda(crearParejas(mezclarArray(vivos)))
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tiene que aver al menos 1 jugador.",
        });
      }
    }
  });
}
