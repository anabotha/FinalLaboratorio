/*mensjae de bienvenida en el que se incluira
la fecha de la última partida entre ellos y 
quien fue el ganador. Si es la primera vez que juegan 
juntos, entonces se debe mostrar la cantidad de partidas
ganadas, por cada uno de ellos, con otros jugadores
*/

window.onload=function (e) {
     carga();
}

function setCookie(nombre, valor, dias) {
     const d = new Date();
     d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000)); // días → ms
     const expiracion = "expires=" + d.toUTCString();
     document.cookie = `${nombre}=${valor}; ${expiracion}; path=/`;
}

function getCookie(nombre) { //
     const nombreEQ = nombre + "=";
     const cookies = document.cookie.split(";");

     for (let i = 0; i < cookies.length; i++) {
          let c = cookies[i].trim();
          if (c.indexOf(nombreEQ) === 0) {
               return c.substring(nombreEQ.length);
          }
     }
     return null;
}

function getLocal(key) {
     try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
     } catch (e) {
          console.error("Error al leer de localStorage:", e);
          return null;
     }
}

function setLocal(key, value) {
     try {
          localStorage.setItem(key, JSON.stringify(value));
     } catch (e) {
          console.error("Error al guardar en localStorage:", e);
     }
}

function carga() {
     let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               console.log("Texto recibido del servidor:", xhr.responseText);
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               gestionar(respuesta); 
               setLocal("partida",respuesta);

          }
     };
     xhr.open("GET", "buscaPartidas.php", true);
     xhr.send();
}
     //window.location.href = "../turns/turno.php";
function gestionar(rta){ //recibe el objeto con todas las cosas que me tocan imprimir.
console.log("llega a gestionar fatla ivista nomas");
nick1=getCookie(1);
nick2=getCookie(2);
console.log(nick1);

if (rta.j1==nick1) { //vuelve a ordenar los jugadores de acuerdo a como se loguearon.
     usuario1 = rta.j1;
     usuario2 = rta.j2;
} else {
     usuario1 = rta.j2;
     usuario2 = rta.j1;
}

if(rta.partidasTotales==0){
     setVistaPrimeraPartida(rta);
}else{
setVistaLobby(rta);
}

function setVistaLobby(rta){
let divTitulo = document.getElementById("titulo");
let ultima=rta.ultimaPartida;
let ganador= rta.ultimoGanador;
const partidasJugadas=rta.partidasTotales;
let div=document.getElementById("ultimaPartida");

     let h2 = document.createElement("h2");
     let p1 = document.createElement("p");
     let p2 = document.createElement("p");
     let p3 = document.createElement("p");

     //let p2 = document.createElement("p");
     div.className="ultimaPartida";
     h2.innerText = " INFO ULTIMA PARTIDA " ;
     p1.innerText = "ULTIMA PARTIDA: " + ultima;
     p2.innerText = "Ultimo Ganador: " + ganador;
     p3.innerText = "Partidas totales jugadas: " + partidasJugadas;
     divTitulo.appendChild(h2);
     div.appendChild(p1);
     div.appendChild(p2);
     div.appendChild(p3);
     setBoton();

}

function setVistaPrimeraPartida(rta){
     console.log("primera vista");
     let div = document.getElementById("titulo");
     let h1= document.createElement("h1");
     h1.innerText="PRIMER ENFRENTAMIENTO";
     div.appendChild(h1);
mostrarInfoJugador("jugador1", rta.j1, rta.ganadasIndivJ1);
mostrarInfoJugador("jugador2", rta.j2, rta.ganadasIndivJ2);
     setBoton();

}
function setBoton(){
     let btn = document.getElementById("btn");
     btn.innerHTML="";
     let button= document.createElement("button");
     button.innerText="SELECCIONAR TURNOS";
     btn.appendChild(button);
     button.addEventListener("click",pasarATurnos);
}

function mostrarInfoJugador(idDiv, nombreJugador, partidasGanadas) {
     let div = document.getElementById(idDiv);
     let h2 = document.createElement("h2");
     let p1 = document.createElement("p");
     //let p2 = document.createElement("p");
     div.className="jugadores";
     h2.innerText = "Info de: " + nombreJugador;
     p1.innerText = "Partidas Ganadas: " + partidasGanadas;
     //p2.innerText = "Partidas Jugadas: " + partidasJugadas;

     div.appendChild(h2);
     div.appendChild(p1);
     //div.appendChild(p2);
}

function pasarATurnos(){
window.location.href = "../turns/turno.php?ts=" + new Date().getTime();
}
}