window.onload=function(){
//selectOption();
settings={
     cartas:"" ,
     tipo: "",
     tiempo:"" 
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

resumen[categoria].innerText= texto;

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
function dirigir(){
     setCookie("settings", JSON.stringify(settings),1);
window.location.href = "../lobby/lobby.php"
}