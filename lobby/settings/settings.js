window.onload=function(){
//selectOption();
//document.getElementById("btnIniciar").addEventListener("click",selectOption);
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
const resumen = {
cartas: document.getElementById("resumen-cartas"),
tipo: document.getElementById("resumen-tipo"),
tiempo: document.getElementById("resumen-tiempo")
};

resumen[categoria].innerText = texto;
}