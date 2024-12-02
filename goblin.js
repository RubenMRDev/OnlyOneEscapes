const goblins = {
  1: {
    color: "black",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786869/idleBlack_jd3lw4.gif",
      death: "",
    },
  },
  2: {
    color: "black-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786869/idleBlackYellow_rsdo7j.gif",
      death: "",
    },
  },
  3: {
    color: "blue",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786868/iddlePurple_n6gal5.gif",
      death: "",
    },
  },
  4: {
    color: "blue-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786866/idlePurpleYellow_gx5qpi.gif",
      death: "",
    },
  },
  5: {
    color: "brown",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786858/idleBrown_zomgdq.gif",
      death: "",
    },
  },
  6: {
    color: "brown-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786859/idleBrownYellow_vreuly.gif",
      death: "",
    },
  },
  7: {
    color: "green",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786859/idleGreen_u5glu0.gif",
      death: "",
    },
  },
  8: {
    color: "green-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786860/idleGreenYellow_whdt1d.gif",
      death: "",
    },
  },
  9: {
    color: "olive",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786862/idleOlive_qb2e7f.gif",
      death: "",
    },
  },
  10: {
    color: "olive-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786861/idleOliveYellow_hweqrs.gif",
      death: "",
    },
  },
  11: {
    color: "orange",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786862/idleOrange_xvmowk.gif",
      death: "",
    },
  },
  12: {
    color: "orange-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786863/idleOrangeYellow_nttaz2.gif",
      death: "",
    },
  },
  13: {
    color: "pink",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786863/idlePink_mohhl7.gif",
      death: "",
    },
  },
  14: {
    color: "pink-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786864/idlePinkYellow_jwgu3g.gif",
      death: "",
    },
  },
  15: {
    color: "pistacho",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786865/idlePistacho_avwf7w.gif",
      death: "",
    },
  },
  16: {
    color: "pistacho-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786866/idlePistachoYellow_fzbgn2.gif",
      death: "",
    },
  },
  17: {
    color: "purple",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786868/iddlePurple_n6gal5.gif",
      death: "",
    },
  },
  18: {
    color: "purple-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786866/idlePurpleYellow_gx5qpi.gif",
      death: "",
    },
  },
  19: {
    color: "red",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786867/idleRed_s4it4j.gif",
      death: "",
    },
  },
  20: {
    color: "red-yellow",
    animations: {
      idle: "https://res.cloudinary.com/ddguqr8l8/image/upload/v1732786241/idleRedYellow_hhidwt.gif",
      death: "",
    },
  },
};

//-------------------------------------------------------------------------------------------------------------------

const availableGoblins = Object.keys(goblins);
const spareGoblins = [...availableGoblins];
export const assignedGoblins = new Map();
const containerSize = 250;
const qSize = containerSize / 5;
const quadrantsPixels = new Map([
  [1, [qSize, containerSize]],
  [2, [qSize, qSize * 4]],
  [3, [qSize, qSize * 3]],
  [4, [qSize, qSize * 2]],
  [5, [qSize, qSize]],
  [6, [qSize * 2, containerSize]],
  [7, [qSize * 2, qSize * 4]],
  [8, [qSize * 2, qSize * 3]],
  [9, [qSize * 2, qSize * 2]],
  [10, [qSize * 3, qSize]],
  [11, [qSize * 3, containerSize]],
  [12, [qSize * 3, qSize * 4]],
  [13, [qSize * 3, qSize * 3]],
  [14, [qSize * 3, qSize * 2]],
  [15, [qSize * 3, qSize]],
  [16, [qSize * 4, containerSize]],
  [17, [qSize * 4, qSize * 4]],
  [18, [qSize * 4, qSize * 3]],
  [19, [qSize * 4, qSize * 2]],
  [20, [qSize * 4, qSize]],
  [21, [containerSize, containerSize]],
  [22, [containerSize, qSize * 4]],
  [23, [containerSize, qSize * 3]],
  [24, [containerSize, qSize * 2]],
  [25, [containerSize, qSize]],
]);

const spareQuadrants = Array.from(quadrantsPixels.keys());

function findRandomGoblin() {
  let randomGoblin = Math.floor(Math.random() * spareGoblins.length);
  return spareGoblins.splice(randomGoblin, 1)[0];
}

export function assignGoblinToPlayer(playerNickname) {
  const goblinNumber = findRandomGoblin();
  assignedGoblins.set(playerNickname, goblinNumber);

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
  const quadrant = selectRandomQuadrant();
  const containerHeight = quadrantsPixels.get(quadrant)[0];
  const containerWidth = quadrantsPixels.get(quadrant)[1];
  const padding = 25;
  const y =
    containerHeight > 60
      ? Math.floor(Math.random() * qSize) + (containerHeight - qSize - padding)
      : 0;
  const x =
    containerWidth > 60
      ? Math.floor(Math.random() * qSize) + (containerWidth - qSize - padding)
      : 0;

  return [y, x];
}

function selectRandomQuadrant() {
  let randomIndex = Math.floor(Math.random() * spareQuadrants.length);
  let selectedQuadrant = spareQuadrants.splice(randomIndex, 1)[0];
  return selectedQuadrant;
}

export function showDuelingGoblins(player1, player2){
  const player1Container = document.getElementById("player1");
  const player2Container = document.getElementById("player2");

  player1Container.innerHTML = "";
  player2Container.innerHTML = "";

  const goblin1Number = assignedGoblins.get(player1);
  const goblin2Number = assignedGoblins.get(player2);
  console.log(goblin1Number);

  let nickname1 = document.createElement("div");
  nickname1.setAttribute("class", "nickname text-center");
  nickname1.textContent = player1;

  let goblin1 = document.createElement("img");
  goblin1.setAttribute("src", goblins[goblin1Number].animations.idle);
  goblin1.setAttribute("alt", `${player1} goblin`);
  goblin1.setAttribute("class", "goblin-image");
  player1Container.appendChild(goblin1);
  player1Container.appendChild(nickname1);

  let nickname2 = document.createElement("div");
  nickname2.setAttribute("class", "nickname text-center");
  nickname2.textContent = player2;

  //seguro que se pasa algo diferente a undefined tras una comprobacion x
  if(player2){
    let goblin2 = document.createElement("img");
    goblin2.setAttribute("src", goblins[goblin2Number].animations.idle);
    goblin2.setAttribute("alt", `${player2} goblin`);
    goblin2.setAttribute("class", "goblin-image");
    goblin2.style.transform = "scaleX(-1)";
    player2Container.appendChild(goblin2);
  }else{
    nickname2.textContent = "BOSS";
  }
  player2Container.appendChild(nickname2);

  
}