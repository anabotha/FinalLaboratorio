window.onload=function(){
     deleteCookie("settings");
settings={
     cartas:"8 Cartas (Fácil)" ,
     tipo: "argentina",
     tiempo:"5 min" 
}
document.getElementById("btnIniciar").addEventListener("click",dirigir);
}

function selectOption(element, categoria, texto) {

const box = document.getElementById(`${categoria}-box`);
const opciones = box.querySelectorAll(".option");

// Quita la clase 'selected' de todos
opciones.forEach(opt => opt.classList.remove("selected"));

// Agrega la clase 'selected' al clickeado
element.classList.add("selected");

console.log(element);
// Actualiza el resumen
var resumen = {
cartas: document.getElementById("resumen-cartas"),
tipo: document.getElementById("resumen-tipo"),
tiempo: document.getElementById("resumen-tiempo")
};

switch (categoria) {
     case "tiempo":
          switch (texto) {
               case "0":
                    resumen[categoria].innerText = "sin limite";
                    break;
               case "5":
                    resumen[categoria].innerText = "5 min";
                    break;
               case "10":
                    resumen[categoria].innerText = "10 min";
                    break;
               case "20":
                    resumen[categoria].innerText = "20 min";
                    break;
               default:
                    resumen[categoria].innerText = texto;
          }
          break;
     default:
          resumen[categoria].innerText = texto;
}

     settings[categoria]= texto;

console.log(settings);

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

function dirigir(){
     setCookie("settings", JSON.stringify(settings),1);
     //setLocal("settings", JSON.stringify(settings));
window.location.href = "../../game/game.php";


}