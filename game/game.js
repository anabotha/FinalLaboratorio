window.onload=function(e){
     infoJugadores();
     buscaCartas();
}

//cookie time
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

function deleteCookie(nombre) { 
     document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function buscaCartas() {
     let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               empezarJuego(respuesta); 
          }
     };
     console.log("busca cartas js");
     xhr.open("GET", "buscoCartas.php", true);
     xhr.send();
}

function buscaCarta(id,tipo) {
     let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               console.log(xhr.responseText);
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               empezarJuego(respuesta); 
          }
     };
     console.log("tipo"+ tipo);
     xhr.open("GET", "buscaCarta.php?id="+encodeURI(id)+"&tipo="+encodeURI(tipo), true);
     xhr.send();
}
function empezarJuego(mazo){
     console.log("empezar juego js");
     mazo.forEach((carta, index) => {
     const container = document.createElement("button");
     container.id = "container" + index + "_" + carta.id;
     container.className = "btn-container";
     container.setAttribute("data-id", carta.id); // para usar luego
     container.setAttribute("data-carta", carta.carta); // guarda imagen verdadera

     const img = document.createElement("img");
     img.src = carta.reverso;
     img.id = "img" + carta.id;
     img.style.width = "100%";

     container.appendChild(img);
     gameContainer=document.getElementById("game-container");
     gameContainer.appendChild(container);

     container.addEventListener("click", function (e) {
          e.preventDefault();
          daVuelta(this);
     });
     });
}

function getNumeroJugador(nombre) {
    const jugador1 = getCookie("1");
    const jugador2 = getCookie("2");

    if (nombre === jugador1) return "1";
    if (nombre === jugador2) return "2";
    return null;
}

     function daVuelta(button) {
     const uid = button.id;
     const cartaReal = button.getAttribute("data-carta");
     const id = button.getAttribute("data-id");

     console.log("llega a daVuelta " + uid);

     const img = document.getElementById("img" + id);
     img.src = cartaReal;
     button.disabled = true;

     // Borrar cookies temporales
     deleteCookie("inicia");
     deleteCookie("segundo");
     deleteCookie("partida");

     // Control de jugadas
     if (getCookie("turno") && getCookie("jugadasTurno") == "0") {
          setCookie("jugadasTurno", 1, 1);
          setCookie("1stPick", uid, 1);
     } else if (getCookie("turno") && getCookie("jugadasTurno") == "1") {
          setCookie("2ndPick", uid, 1);

          const id1 = getCookie("1stPick");
          const id2 = getCookie("2ndPick");
          const nroJugador=getNumeroJugador(getCookie("turno") );
          comparoCartas(id1, id2,nroJugador);

          // Cambio de turno
          const turnoActual = getCookie("turno");
          const nuevoTurno = turnoActual === getCookie("1") ? getCookie("2") : getCookie("1");

          setCookie("turno", nuevoTurno, 1);
          setCookie("jugadasTurno", 0, 1);
          deleteCookie("1stPick");
          deleteCookie("2ndPick");

          document.getElementById("info").innerText = "Turno de: " + nuevoTurno;
     } else {
          console.log("error en el control de jugadas");
     }
     }

function setLocal(key, value) {
     try {
          localStorage.setItem(key, JSON.stringify(value));
     } catch (e) {
          console.error("Error al guardar en localStorage:", e);
     }
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


function comparoCartas(id1,id2,jugador){
     sumoIntentos(jugador);
     const carta1=document.getElementById(id1);
     const carta2=document.getElementById(id2);
     console.log(carta1 ,carta2);
     setTimeout(() => {

     if (carta1.value==carta2.value){//comapra si son iguales
          console.log("acerto");
          carta1.disabled = true; //las desabilita porque ya adivino.
          carta2.disabled = true;
          carta1.classList="adivinado";
          carta2.classList="adivinado";
          sumoAciertos(jugador); //suma aciertos
     } else{
     console.log("no acerto");
     sacoValor(id2);//"da vuelta la carta"
     sacoValor(id1);//deja de mostrar
     }
     let botones=document.getElementsByClassName("botonCarta");
     for (let boton of botones) {
          boton.disabled = false;
     }
     },500);
}

function asignoIntentos(){
     intentosJuego=JSON.parse(getCookie("settings")).cartas;
     let aciertos=document.getElementById("intentos"); //fijarme si voy a trabajar con la variable global o que hago.
     intentos+=1;
     aciertos.innerHTML=("Intentos: "+intentos);
     if(intentos==IntentosJuego){
          finalizoJuego();
     }
}

function sumoIntentos(jugadorId) {
     let intentosElem = document.getElementById("intentos-" + jugadorId);
     let intentos = parseInt(intentosElem.textContent) || 0;
     intentosElem.textContent = intentos + 1;
}

function sumoAciertos(jugadorId) {
     let aciertosElem = document.getElementById("aciertos-" + jugadorId);
     let aciertos = parseInt(aciertosElem.textContent, 10) || 0;
     aciertosElem.textContent = aciertos + 1;
}

// Informacion de jugadores
function infoJugadores(){
     j1=getCookie("1");
     j2=getCookie("2");
     inicia=getCookie("inicia");
     setCookie("turno",inicia,1);
     setCookie("jugadasTurno",0,1);
     imprimoJugador(j1,1);
     imprimoJugador(j2,2);
     document.getElementById("info").innerText="Turno de: "+inicia;
}
function imprimoJugador(j,id){
     // Crear y agregar el nombre del jugador
     let h2 = document.getElementById("jugador"+id);
     h2.textContent = j;

     // setea el contador de intentos
     let intentos = document.getElementById("intentos-"+id);
     intentos.textContent = 0;

     // setea el contador de aciertos
     let aciertos = document.getElementById("aciertos-"+id);
     aciertos.textContent = 0;
}