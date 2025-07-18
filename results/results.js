window.onload=function (e) {
     if (getCookie("razon")==="adivinadas" || getCookie("razon")==="intentos"){
          mostrarPorcentajes(1);
          mostrarPorcentajes(2);
     }else{
          mostrarPuntajes(1);
          mostrarPuntajes(2);

     }
     if(getCookie("razon")!=="tiempo"){// si termino debido al tiempo, sus aciertos son indisintos porque suman 0 ptos.
          mostrarAciertos();
     }
     mostrarGanador();
     //mostrarResultados();
}

function mostrarPorcentajes(num){
const nombre=document.getElementById("jugador"+num);
const resultado=JSON.parse(getLocal("porcentajesJ"+num));
const porc=document.getElementById("porcentaje"+num);
const mensaje=document.getElementById("mensaje"+num);
porc.innerText=resultado.porcentaje;
mensaje.innerText=resultado.mensaje;
nombre.innerText=getCookie(num);
}

function mostrarAciertos(){
     const aciertos1=document.getElementById("aciertos1");
     const aciertos2=document.getElementById("aciertos2");
aciertos1.innerText="Tuviste: " +getLocal("aciertos1")+" aciertos";
aciertos2.innerText="Tuviste: " +getLocal("aciertos2")+" aciertos";
}
function mostrarPuntajes(num){
     console.log(j1,j2,num);
    const nombre = document.getElementById("jugador" + num);
    const puntos = JSON.parse(getLocal("p" + num));
    const score=JSON.parse(getLocal("score"+num));
    const puntajeActual=parseInt(puntos)+parseInt(score);
    const puntosContainer = document.getElementById("porcentaje" + num);
    puntosContainer.innerHTML = "+ "+score+" puntos!"+"<br> <br> Puntaje de jugador: <br>" + puntajeActual+" puntos.";

    // Mostrar j1 si num es 1, j2 si num es 2
    nombre.innerText = num === 1 ? j1 : j2;

}
function mostrarGanador(){
     const winner=getCookie("winner");
     const num=getNumeroJugador(winner);
     if(winner!==null && winner!=="null"){
          document.getElementById("ganador"+num).innerHTML="👑";
          document.getElementById("mensaje").innerHTML=" 👑<br>WINNER <br>"+winner;
     }else{
          document.getElementById("mensaje").innerHTML="EMPATE";

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

function getNumeroJugador(nombre) {
     if (nombre === j1) return "1";
     if (nombre === j2) return "2";

}
function irARanking(){
     window.location.href="../ranking/ranking.php"
}