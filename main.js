const nombres = [
    "Israel Abad Barrera",
    "Javier Ariza Rosales",
    "Nicolás Burgos Contreras",
    "Felipe Chacón Montero",
    "Fernando de la Torre Esperon",
    "Alejandro Gómez Ojeda",
    "Pablo Jiménez Menéndez",
    "Mario Lebrero García",
    "Pablo Noria Gómez",
    "Mauricio Nicolás Ortiz",
    "Adrián Pérez Agredano",
    "Jairo Saborito Franco",
    "Judith Tamayo Balogh",
    "Samuel Utrilla Núñez",
    "Rubén Martín Ruiz"
];


function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



function crearParejas(nombres){

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
mezclarArray(nombres);
let jugadores = crearParejas(nombres);

// for(let i=0;i<parejas.length;i++){
//     document.getElementById("players").innerHTML += parejas[i].join(" y ") + "<br>";
// }

let muertos=[];
let vivos=[];
let jugando=[];
let ganadores= [];

function empezarPartida(jugador1,jugador2){
    let dado1 = Math.floor(Math.random()*6+1);
    let dado2 = Math.floor(Math.random()*6+1);
    if(dado1==dado2){
        console.log("Han salido dados repetidos")
        empezarPartida(jugador1,jugador2);
    }else{
        if(dado1>dado2){
            console.log(jugador2 + " mato a " + jugador1)
            muertos.push(jugador1);
            ganadores.push(jugador2);
        }else{
            console.log(jugador1 + " mato a " + jugador2)
            muertos.push(jugador2);
            ganadores.push(jugador1);
        }
    }
}

function boss(jugador1){
    let dado1 = Math.floor(Math.random()*6+1);
    let dado2 = Math.floor(Math.random()*6+1);
    if(dado1==dado2){
        console.log("Han salido dados repetidos")
        boss(jugador1);
    }else{
        if(dado1>dado2){
            console.log(jugador1 + " murio a manos de Paloma")
            muertos.push(jugador1);
        }else{
            console.log(jugador1 + " sobrevivio a Paloma.")
            ganadores.push(jugador1);
        }
    }
}

function ejecutarRonda(jugadores){
    for(let i=0;i<jugadores.length;i++){
        if(jugadores[i][1] === undefined){

            boss(jugadores[i][0])

        }else{
            empezarPartida(jugadores[i][0],jugadores[i][1]);
        }
    }
}

console.log(jugadores)

jugando = jugadores;

while(jugando.length>1){
    console.log("== NUEVA RONDA ==")
    ejecutarRonda(jugadores)
    console.log("MUERTOS")
    console.log(muertos)
    console.log("GANADORES")
    console.log(ganadores)
    jugando= ganadores;
    mezclarArray(jugando);
    jugadores = crearParejas(ganadores);
    ganadores = [];
 }