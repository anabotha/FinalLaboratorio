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
function carga() {
     let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               console.log("Texto recibido del servidor:", xhr.responseText);
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               gestionar(respuesta); 
          }
     };
     xhr.open("GET", "buscaPartidas.php", true);
     xhr.send();
}
     //window.location.href = "../turns/turno.php";
function gestionar(rta){ //recibe el objeto con todas las cosas que me tocan imprimir.
console.log("llega a gestionar fatla ivista nomas");
console.log(rta.j1);

}