
window.onload = function (e) {
     carga();
}




function carga() {
     let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               console.log("Texto recibido del servidor:", xhr.responseText);
               let respuesta = JSON.parse(xhr.responseText);
               console.log(respuesta);
               gestionar(respuesta);
               setLocal("partida", respuesta);
               setLocal("p1", respuesta.puntajej1);
               setLocal("p2", respuesta.puntajej2);
          }
     };
     xhr.open("GET", "buscaPartidas.php", true);
     xhr.send();
}
function gestionar(rta) { //recibe el objeto con todas las cosas que me tocan imprimir.
     nick1 = j1;
     nick2 = j2;
     console.log(nick1);

     if (rta.j1 == nick1) { //vuelve a ordenar los jugadores de acuerdo a como se loguearon.
          usuario1 = rta.j1;
          usuario2 = rta.j2;
     } else {
          usuario1 = rta.j2;
          usuario2 = rta.j1;
     }

     if (rta.partidasTotales == 0) {
          setVistaPrimeraPartida(rta);
     } else {
          setVistaLobby(rta);
     }

     function setVistaLobby(rta) {
          let divTitulo = document.getElementById("titulo");
          console.log(rta.ultimaPartida);
          let ultima = new Date(rta.ultimaPartida.date + "Z");
          let fechaFormateada = ultima.toLocaleDateString("es-AR", {
               weekday: 'long', // lunes, martes...
               year: 'numeric',
               month: 'long',   // julio, agosto...
               day: 'numeric'
          });

          console.log("ULTIMA PARTIDA: " + fechaFormateada);

          let ganador = rta.ultimoGanador;
          let p2 = document.createElement("p");
          if (ganador == "null" || ganador == null) {
               p2.innerHTML = "<strong>Ultima Partida: </strong><br>Empate";

          } else {

               p2.innerHTML = "<strong>Ultimo Ganador:</strong> <br> 👑 " + ganador + " 👑";
          }
          const partidasJugadas = rta.partidasTotales;
          let div = document.getElementById("ultimaPartida");

          let h2 = document.createElement("h2");
          let p1 = document.createElement("p");
          let p3 = document.createElement("p");

          //let p2 = document.createElement("p");
          div.className = "ultimaPartida";
          h2.innerHTML = "⚔️ <strong>ULTIMO DUELO</strong> ⚔️";
          p1.innerHTML = "<strong>Jugado el:</strong><br> " + fechaFormateada;
          p3.innerHTML = "<strong>Partidas totales jugadas:</strong><br> " + partidasJugadas;
          divTitulo.appendChild(h2);
          div.appendChild(p1);
          div.appendChild(p2);
          div.appendChild(p3);
          setBoton();

     }

     function setVistaPrimeraPartida(rta) {
          console.log("primera vista");
          let div = document.getElementById("titulo");
          let h1 = document.createElement("h2");
          h1.innerText = "PRIMER ENFRENTAMIENTO";
          div.appendChild(h1);

          console.log(rta.puntajej1);
          mostrarInfoJugador("jugador1", rta.j1, rta.ganadasIndivJ1, rta.puntajej1);
          mostrarInfoJugador("jugador2", rta.j2, rta.ganadasIndivJ2, rta.puntajej2);
          setBoton();

     }

     function setBoton() {
          let btn = document.getElementById("btn");
          btn.innerHTML = "";
          let button = document.createElement("button");
          button.innerText = "SELECCIONAR TURNOS";
          btn.appendChild(button);
          button.addEventListener("click", pasarATurnos);
     }

     function mostrarInfoJugador(idDiv, nombreJugador, partidasGanadas, ptje) {
          let div = document.getElementById(idDiv);
          let h2 = document.createElement("h2");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          div.className = "jugadores";
          h2.innerHTML = "👑<br>Info de: " + nombreJugador;
          p1.innerText = "Partidas Ganadas: " + partidasGanadas;
          p2.innerText = "Puntaje: " + ptje;

          div.appendChild(h2);
          div.appendChild(p1);
          div.appendChild(p2);
     }

     function pasarATurnos() {
          window.location.href = "../turns/turno.php?ts=" + new Date().getTime();
     }
}