import { goblins } from "./goblins.js";

const availableGoblins = Object.keys(goblins);
const spareGoblins = availableGoblins;
const assignedGoblins = new Map();

function findRandomGoblin() {
  let randomGoblin = Math.floor(Math.random() * spareGoblins.length);
  return spareGoblins.splice(randomGoblin, 1);
}

export function assignGoblinToPlayer(playerNickname) {
  const goblinNumber = findRandomGoblin();
  assignedGoblins.set(playerNickname, goblinNumber);

  /////////////////////
  let goblinContainer = document.createElement("div");
  goblinContainer.setAttribute("class", "goblin");

  let randomGoblin = document.createElement("img");
  randomGoblin.setAttribute("src", goblins[goblinNumber].animations.idle);
  randomGoblin.setAttribute("alt", `${playerNickname} goblin`);
  randomGoblin.setAttribute("class", "goblin-image");

  let nickname = document.createElement("div");
  nickname.setAttribute("class", "nickname");
  nickname.textContent = playerNickname.toUpperCase();

  goblinContainer.setAttribute("class", "goblin");
  goblinContainer.appendChild(nickname);
  goblinContainer.appendChild(randomGoblin);
  const container = document.getElementById("lobby");
  //random location inside lobby
  const location = randomizeLocationGoblinSpawn(container);
  goblinContainer.style.top = `${location[0]}px`;
  goblinContainer.style.right = `${location[1]}px`;
  //change z-index based on location[0] number to overlap gif
  goblinContainer.style.zIndex = `${location[0]}`;
  container.appendChild(goblinContainer);
}

function randomizeLocationGoblinSpawn() {
  const containerWidth = 214;
  const containerHeight = 214;
  const y = Math.floor(Math.random() * containerHeight);
  const x = Math.floor(Math.random() * containerWidth);
  return [y, x];
}
