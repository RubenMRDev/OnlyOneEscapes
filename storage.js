export function saveGame(goblinGanador) {
  let historial = JSON.parse(localStorage.getItem("historialJuego")) || [];

  const nuevaPartida = {
    fecha: new Date().toISOString(),
    ganador: goblinGanador,
  };

  historial.push(nuevaPartida);
  localStorage.setItem("historialJuego", JSON.stringify(historial));
}

export function showHistory() {
  const historial = JSON.parse(localStorage.getItem("historialJuego")) || [];

  const historialContainer = document.getElementById("historial");
  historialContainer.innerHTML = "";
  historialContainer.classList.remove("d-none");
  historialContainer.classList.add("d-flex");
  historialContainer.classList.add("flex-column");
  historialContainer.style.overflowY = "auto";
  historialContainer.style.maxHeight = "100px"; 


  if (localStorage.getItem("historialJuego") === null) {
    const p = document.getElementById("history");
    p.textContent = "No history has been found";
    p.style.color = "red";
    p.style.display = "block";
    setTimeout(() => {
      p.textContent = "";
      p.style.display = "none";
    }, 2000);
  } else {
    historial.forEach((partida, index) => {
      const partidaElemento = document.createElement("p");
      partidaElemento.id = "historial-texto";
      partidaElemento.classList.add("partida");
      partidaElemento.classList.add("text-center");
      partidaElemento.classList.add("w-75");
      partidaElemento.textContent = `Partida ${index + 1}: 
            Fecha: ${new Date(partida.fecha).toLocaleString()}, 
            Ganador: ${partida.ganador}`;
      partidaElemento.style.color = "white";
      historialContainer.classList.add("justify-content-center");
    /*   document
        .getElementById("show-history-button")
        .addEventListener("click", () => {
          partidaElemento.classList.add("hidden");
        }); */
      historialContainer.appendChild(partidaElemento);
    });
  }
}
