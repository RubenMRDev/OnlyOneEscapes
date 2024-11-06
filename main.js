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
