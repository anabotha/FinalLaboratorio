//si getCookie("razon")=='adivinadas' muestre los pordentajes.
window.onload=function (e) {
     if (getCookie("razon")==="adivinadas" || getCookie("razon")==="intentos"){
          mostrarPorcentajes(1);
          mostrarPorcentajes(2);
     }
     mostrarGanador();
     //mostrarResultados();
     deleteAllCookies();
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

function mostrarGanador(){
     const winner=getCookie("winner");
     if(winner!=null){

          document.getElementById("mensaje").innerHTML="WINNER <br>"+winner;
     }else{
          document.getElementById("mensaje").innerHTML="EMPATE";

     }
}
/*
function mostrarResultados(){
const aciertos=document.getElementById("aciertos"+num);
const intentos=document.getElementById("intentos"+num);
}*/
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
function deleteAllCookies() {
const cookies = document.cookie.split(";");

for (let cookie of cookies) {
     const nombre = cookie.split("=")[0].trim();
     document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
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