window.onload = function (e) {
     setIntentosMax();
     infoJugadores();
     buscaCartas();
     abandono = false;
     intentosMaximos = false;
     rendirj1 = document.getElementById('rendirj1').addEventListener("click", function (e) {
          e.preventDefault();
          abandonoPartida(1);
     });
     rendirj2 = document.getElementById('rendirj2').addEventListener("click", function (e) {
          e.preventDefault();
          abandonoPartida(2);
     });
     

}

function setIntentosMax(){
     console.log(JSON.parse(getCookie("settings")).cartas);
          switch (JSON.parse(getCookie("settings")).cartas) {
               case "8":
                    setLocal("intentosMax", 20);
                    break;
          case "16":
               setLocal("intentosMax", 40);
               break;
          case "32":
               setLocal("intentosMax", 64);

               break;
          default:
               break;
     }

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
//local storage
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
// trabajo en la bd
function buscaCartas() {
     let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               console.log(xhr.responseText);

               let respuesta = JSON.parse(xhr.responseText);
               empezarJuego(respuesta);
          }
     };
     xhr.open("GET", "buscoCartas.php", true);
     xhr.send();
}
function agregaPartidaBd() {
     let j1 = getCookie(1);
     let j2 = getCookie(2);
     let winner = "";

     // Ordenar alfabéticamente o numéricamente para consistencia (si usás nombres, se ordenan alfabéticamente)
     if (j1 > j2) {
          const temp = j1;
          j1 = j2;
          j2 = temp;
          score1 = getLocal("score2");
          score2 = getLocal("score1");
     } else {
          score1 = getLocal("score1");
          score2 = getLocal("score2");
     }


     const infoPartida = {
          player1: j1,
          player2: j2,
          winner: getCookie("winner"),
          puntajej1: score1,
          puntajej2: score2,
          fecha: new Date().toISOString().split('T')[0]
     }
     let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               console.log(xhr.responseText);

               let respuesta = JSON.parse(xhr.responseText);
               irAResults(respuesta);
          }
     };
     xhr.open("GET", "agregaPartidas.php?resultado=" + encodeURIComponent(JSON.stringify(infoPartida)), true);

     xhr.send();
}

function empezarJuego(mazo) {
     deleteCookie("winner");
     deleteCookie("score1");
     deleteCookie("score2");
     deleteCookie("razon");
     console.log("empezar juego js");
     terminoPorTiempo = false;
     reloj(() => {
          terminoPorTiempo = true;
          finJuego();
          console.log("Se terminó el tiempo, se cierra el juego.");
          //finJuego();
     });
     //logica de pares
     let pares = parseInt(JSON.parse(getCookie("settings")).cartas);
     pares = pares / 2;
     setLocal("pares", pares, 1);
     //
     console.log(pares)
     mazo.forEach((carta, index) => {
          const container = document.createElement("button");
          container.id = index + "_" + carta.id;
          container.className = "btn-container";
          var game = document.getElementById("game-container");
          switch (pares) {
               case 8:
                    container.classList.add('btn-mediano');
                    game.classList.add("grid-4x4");
                    break;
               case 16:
                    container.classList.add('btn-small');
                    game.classList.add("grid-6x6");
                    break;
               default:
                    break;
          }
          container.setAttribute("data-id", carta.id); // para usar luego
          container.setAttribute("data-carta", carta.carta); // guarda src imagen verdadera

          const img = document.createElement("img");
          img.id = "img" + container.id;
          img.style.width = "100%";

          container.appendChild(img);
          gameContainer = document.getElementById("game-container");
          gameContainer.appendChild(container);

          container.addEventListener("click", function (e) {
               e.preventDefault();
               console.log(this);
               daVuelta(this);
          });
     });
}

function getNumeroJugador(nombre) {
     const jugador1 = getCookie("1");
     const jugador2 = getCookie("2");

     if (nombre === jugador1) return "1";
     if (nombre === jugador2) return "2";

}

function muestroTurno(jug) {
     console.log("jug:", jug, "typeof:", typeof jug);

     const p = document.getElementById("turno"+jug);
     console.log(p, jug)
     if (p) p.innerText = "¡Es tu turno!";
     p.style.visibility="visible";

     const otro = document.getElementById("turno" + (jug === "1" ? "2" : "1"));
     otro.style.visibility="hidden";
     if (otro) otro.innerText = "";
}

function daVuelta(button) {
     const uid = button.id;
     const cartaReal = button.getAttribute("data-carta");
     const id = button.getAttribute("data-id");

     console.log("llega a daVuelta " + uid);

     const img = document.getElementById("img" + uid);
     img.src = cartaReal;
     button.disabled = true;

     // Borrar cookies temporales
     /*deleteCookie("inicia");
     deleteCookie("segundo");
     deleteCookie("partida");*/


     // Control de jugadas
     const jugadasTurno = getCookie("jugadasTurno") || "0";

     if (getCookie("turno") && jugadasTurno == "0") {
          setCookie("jugadasTurno", 1, 1);
          setCookie("1stPick", uid, 1);
     } else if (getCookie("turno") && jugadasTurno == "1") {
          setCookie("2ndPick", uid, 1);

          const id1 = getCookie("1stPick");
          const id2 = getCookie("2ndPick");
          const nroJugador = getNumeroJugador(getCookie("turno"));
          bloquearBotones();
          comparoCartas(id1, id2, nroJugador, (debeCambiarTurno) => {
               const turnoActual = getCookie("turno");
               if (debeCambiarTurno) {
                    const nuevoTurno = turnoActual === getCookie("1") ? getCookie("2") : getCookie("1");
                    setCookie("turno", nuevoTurno, 1);
               } else {
                    setCookie("turno", turnoActual, 1); // mantiene el turno
               }
               setCookie("jugadasTurno", 0, 1);
               muestroTurno(getNumeroJugador(getCookie("turno")));
               deleteCookie("1stPick");
               deleteCookie("2ndPick");
          });
          habilitarBotonesNoAdivinados();
     } else {
          console.log("error en el control de jugadas");
          setCookie("jugadasTurno", 0, 1);
     }
}

function sacoValor() {
     const botones = document.getElementsByClassName("btn-container");
     for (let boton of botones) {
          if (!boton.classList.contains("adivinado")) {
               const img = document.getElementById("img" + boton.id);
               console.log(boton.id);
               img.src = "";
          }
     }
}
function bloquearBotones() {
     const botones = document.getElementsByClassName("btn-container");
     for (let boton of botones) {
          boton.disabled = true;
     }
}

function habilitarBotonesNoAdivinados() {
     const botones = document.getElementsByClassName("btn-container");
     for (let boton of botones) {
          if (!boton.classList.contains("adivinado")) {
               boton.disabled = false;
          }
     }
}

function comparoCartas(id1, id2, jugador, callbackCambioTurno) {
     sumoIntentos(jugador);
     const carta1 = document.getElementById(id1);
     const carta2 = document.getElementById(id2);
     const valor1 = id1.slice(-3);
     const valor2 = id2.slice(-3);
     console.log(valor1, valor2, id1, id2);

     setTimeout(() => {
          let acerto = false;
          if (valor1 === valor2) {
               acerto = true;
               carta1.disabled = true;
               carta2.disabled = true;
               carta1.classList.add("adivinado");
               carta2.classList.add("adivinado");
               sumoAciertos(jugador);
               // Lógica de pares


               let paresEncontrados = parseInt(getCookie("paresEncontrados") || 0) + 1;
               setCookie("paresEncontrados", paresEncontrados, 1);

               if (paresEncontrados >= getLocal("pares") || terminoPorTiempo) {
                    console.log("Fin del juego");
                    deleteCookie("pares");
                    deleteCookie("paresEncontrados");
                    finJuego();
                    return;
               }
          } else {
               console.log(id1, id2);
               sacoValor();

          }

          console.log("Comparando:", valor1, "vs", valor2, "→ Acertó:", acerto);
          // Habilitar botones no adivinados
          /* const botones = document.getElementsByClassName("btn-container");
          for (let boton of botones) {
               if (!boton.classList.contains("adivinado")) {
                    boton.disabled = false;
               }
               }*/

              // Llamar al callback con el resultado
              if (callbackCambioTurno) callbackCambioTurno(!acerto);
          }, 500);
          habilitarBotonesNoAdivinados();
}

// Informacion de jugadores
function infoJugadores() {
     deleteCookie("pares");
     deleteCookie("paresEncontrados");
     j1 = getCookie("1");
     j2 = getCookie("2");
     inicia = getCookie("inicia");
     setCookie("turno", inicia, 1);
     setCookie("jugadasTurno", 0, 1);
     imprimoJugador(j1, 1);
     imprimoJugador(j2, 2);
     const jug = getNumeroJugador(inicia);
     muestroTurno(jug);
}

function imprimoJugador(j, id) {
     // Crear y agregar el nombre del jugador
     let h2 = document.getElementById("jugador" + id);
     h2.textContent = j;

     // setea el contador de intentos
     let intentos = document.getElementById("intentos-" + id);
     intentos.textContent = 0;

     // setea el contador de aciertos
     let aciertos = document.getElementById("aciertos-" + id);
     aciertos.textContent = 0;
}

function sumoIntentos(jugadorId) {
     let intentosElem = document.getElementById("intentos-" + jugadorId);
     let intentos = parseInt(intentosElem.textContent) || 0;
     intentosElem.textContent = intentos + 1;
     console.log(getLocal("intentosMax"));
     maximo=parseInt(getLocal("intentosMax"));
     if ((intentos >=maximo) && maximo!=null) {
          setCookie("razon", "intentos");
          intentosMaximos = true;
          finJuego();
     } 
     
}

function sumoAciertos(jugadorId) {
     let aciertosElem = document.getElementById("aciertos-" + jugadorId);
     let aciertos = parseInt(aciertosElem.textContent, 10) || 0;
     aciertosElem.textContent = aciertos + 1;
}

function abandonoPartida(jugador) {
     setCookie("razon", "abandono");

     abandono = true;
     console.log("abandono" + jugador);
     const num = getNumeroJugador(jugador);
     setLocal("score"+ num, 0);
     if (num == 1) {
          setLocal("score2", 2);
          setLocal("score1", 0);
          setCookie("winner", getCookie(2));

     } else {
          setLocal("score1", 2);
          setLocal("score2", 0);
          setCookie("winner", getCookie(1));
     }
     finJuego();
}

function finJuego() {
     console.log(getCookie("razon"));
     if (!abandono) {
          ganador();

     }
     console.log("termino por tiempo"+terminoPorTiempo);
     if (!terminoPorTiempo) {//si termino porq se adivino todo detiene el reloj.
          detenerReloj();
     }
     tiempo = document.getElementById("cronometro");
     setLocal("tiempo", tiempo);
     agregaPartidaBd();
     //cargar partida
     //mostrar resto de info
}

function reloj(callbackFin) {
     tiempo = JSON.parse(getCookie("settings"));
     minutos = tiempo.tiempo;
     //console.log(minutos+"min");

     if (minutos === "0") {
          console.log("⏳ Tiempo ilimitado");
          return; // No iniciar reloj
     } else {
          minutos = parseInt(minutos);
     }

     let segundos = 0;

     relojIntervalo = setInterval(() => {
          if (segundos === 0) {
               if (minutos === 0) {
                    clearInterval(relojIntervalo);
                    console.log("⏰ Tiempo finalizado");
                    if (callbackFin) finJuego(); // Llamar a la función cuando termina
                    return terminoPorTiempo = true;

               } else {
                    minutos--;
                    segundos = 59;
               }
          } else {
               segundos--;
          }

          //console.log(`${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`);
          const cronometro = document.getElementById("cronometro");
          if (cronometro) {
               cronometro.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
          }
     }, 1000);
}

function detenerReloj() {
     clearInterval(relojIntervalo); // Detiene el reloj
}

function ganador() {
     const aciertosj1 = parseInt(document.getElementById("aciertos-1").textContent) || 0;
     const aciertosj2 = parseInt(document.getElementById("aciertos-2").textContent) || 0;
     const intentosj1 = parseInt(document.getElementById("intentos-1").textContent) || 0;
     const intentosj2 = parseInt(document.getElementById("intentos-2").textContent) || 0;
     const pares = parseInt(getLocal("pares")) || 4;
     let porcentajesJ1=0;
     let porcentajesJ2=0;
console.log(aciertosj1, 1, pares);
                    console.log(aciertosj2, 1, pares);
     document.querySelectorAll(".turno").forEach(el => el.textContent = "");

     if (!terminoPorTiempo) {
          if (!intentosMaximos) setCookie("razon", "adivinadas");

               switch (true) {
     case (aciertosj1 > aciertosj2): {
          document.getElementById("cont-jugador1").className = "ganador";
          setCookie("winner", getCookie(1));
          setLocal("score1", 10);
          setLocal("score2", 0);
          
          porcentajesJ1 = calcularPorcentajes(aciertosj1, 1, pares, true);
          porcentajesJ2 = calcularPorcentajes(aciertosj2, 2, pares, false);
          setLocal("porcentajesJ1", JSON.stringify(porcentajesJ1));
          setLocal("porcentajesJ2", JSON.stringify(porcentajesJ2));
          break;
     }

     case (aciertosj1 < aciertosj2): {
          document.getElementById("cont-jugador2").className = "ganador";
          setCookie("winner", getCookie(2));
          if (intentosMaximos) {
               setLocal("score1", 4);
               setLocal("score2", 6);
          } else {
               setLocal("score1", 0);
               setLocal("score2", 10);
          }

          porcentajesJ1 = calcularPorcentajes(aciertosj1, 1, pares, false);
          porcentajesJ2 = calcularPorcentajes(aciertosj2, 2, pares, true);
          setLocal("porcentajesJ1", JSON.stringify(porcentajesJ1));
          setLocal("porcentajesJ2", JSON.stringify(porcentajesJ2));
          break;
     }

     case (aciertosj1 === aciertosj2 && !intentosMaximos && intentosj1 < intentosj2): {
          setCookie("winner", getCookie(1));
          setLocal("score1", 6);
          setLocal("score2", 4);

          porcentajesJ1 = calcularPorcentajes(aciertosj1, 1, pares, true);
          porcentajesJ2 = calcularPorcentajes(aciertosj2, 2, pares, false);
          setLocal("porcentajesJ1", JSON.stringify(porcentajesJ1));
          setLocal("porcentajesJ2", JSON.stringify(porcentajesJ2));
          break;
     }

     case (aciertosj1 === aciertosj2 && !intentosMaximos && intentosj1 > intentosj2): {
          setCookie("winner", getCookie(2));
          setLocal("score1", 4);
          setLocal("score2", 6);

          porcentajesJ1 = calcularPorcentajes(aciertosj1, 1, pares, false);
          porcentajesJ2 = calcularPorcentajes(aciertosj2, 2, pares, true);
          setLocal("porcentajesJ1", JSON.stringify(porcentajesJ1));
          setLocal("porcentajesJ2", JSON.stringify(porcentajesJ2));
          break;
     }

     case (aciertosj1 === aciertosj2 && !intentosMaximos && intentosj1 === intentosj2): {
          setCookie("winner", null);
          setLocal("score1", 5);
          setLocal("score2", 5);

          porcentajesJ1 = calcularPorcentajes(aciertosj1, 1, pares, false);
          porcentajesJ2 = calcularPorcentajes(aciertosj2, 2, pares, false);
          setLocal("porcentajesJ1", JSON.stringify(porcentajesJ1));
          setLocal("porcentajesJ2", JSON.stringify(porcentajesJ2));
          break;
     }

     case (aciertosj1 === aciertosj2 && intentosMaximos): {
          setCookie("winner", null);
          setLocal("score1", 3);
          setLocal("score2", 3);

          porcentajesJ1 = calcularPorcentajes(aciertosj1, 1, pares, false);
          porcentajesJ2 = calcularPorcentajes(aciertosj2, 2, pares, false);
          setLocal("porcentajesJ1", JSON.stringify(porcentajesJ1));
          setLocal("porcentajesJ2", JSON.stringify(porcentajesJ2));
          break;
     }
     }
}else {
          // Se quedaron sin tiempo
          setCookie("winner", null);
          setCookie("razon", "tiempo");
          setLocal("score1", 0);
          setLocal("score2", 0);

     }
     const usuario1={
          nombre:getCookie(1),
          ptje:getLocal("score1"),
          porcentaje: porcentajesJ1.porcentaje ?? 0
     }
     const usuario2={
          nombre:getCookie(2),
          ptje:getLocal("score2"),
          porcentaje:porcentajesJ2.porcentaje ?? 0
     }
     mandarARanking(usuario1);
     mandarARanking(usuario2);
}


function calcularPorcentajes(puntajeJugador, numeroJugador, pares, gano) {
     const porcentaje = (puntajeJugador / pares) * 100;
     let mensaje = "";

     switch (true) {
          case (gano && porcentaje === 100):
               mensaje = `¡¡¡EXCELENTE MEMORIA!!!`;
               break;
          case (gano && porcentaje >= 80):
               mensaje = `¡¡¡MUY BUENA MEMORIA!!!`;
               break;
          case (gano && porcentaje >= 60):
               mensaje = `¡¡¡BUENA MEMORIA!!! ¡¡¡Puedes mejorar!!!`;
               break;
          case (gano && porcentaje < 60):
               mensaje = `¡¡¡Ganaste, pero necesitas entrenar más tu memoria!!!`;
               break;

          case (!gano && porcentaje >= 80):
               mensaje = `¡¡¡MUY BUENA MEMORIA!!!`;
               break;
          case (!gano && porcentaje >= 60):
               mensaje = `¡¡¡BUENA MEMORIA!!! ¡¡¡Puedes mejorar!!!`;
               break;
          case (!gano && porcentaje < 60):
               mensaje = `¡¡¡Mala memoria, debes practicar más!!!`;
               break;

          default:
               mensaje = `Resultado no definido.`;
               console.log(mensaje);
               
     }

     return {
          porcentaje: porcentaje.toFixed(1),
          mensaje
     };

}

function mandarARanking(usuario) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            try {
                const respuesta = JSON.parse(xhr.responseText);
                console.log("✅ Respuesta del servidor:", respuesta);
                 irAResults(respuesta);
            } catch (e) {
                console.error("❌ Error al parsear JSON:", xhr.responseText);
            }
        }
    };

    const url = "rankingUsuario.php?usuario=" + encodeURIComponent(JSON.stringify(usuario));
     console.log(url);

    xhr.open("GET", url, true);
    xhr.send();
}


function mostrarRanking(){

}
function irAResults(rta) {
     window.location.href = "../results/results.php";

}