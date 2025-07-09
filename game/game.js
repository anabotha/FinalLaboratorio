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

function empezarJuego(mazo){
     console.log("empezar juego js");
     mazo.forEach(carta => {

          container=document.createElement("button");
          container.id="container"+carta.id;
          container.className="btn-container";
          console.log("id "+ carta.id+ " carta: "+carta.carta);
          img=document.createElement("img")
          img.src = carta.reverso; 
          //img.alt =carta;
          img.style.width = "100%"; 
          container.appendChild(img);
          gameContainer=document.getElementById("game-container");
          gameContainer.appendChild(container);
          container.addEventListener("click",click);
     });
}
     function click(){
          console.log("llega a click");
     }
function daVuelta(carta){
console.log(carta.id);
comparoCartas(id1,id2);
}

function comparoCartas(cont,id1,id2){ 
     let carta1=document.getElementById("container"+id1);
     let carta2=document.getElementById("container"+id2); 
     setTimeout(() => {

     if (carta1.value==carta2.value){//comapra si son iguales
console.log("acerto");
carta1.disabled = true; //las desabilita porque ya adivino.
carta2.disabled = true;
carta1.classList="adivinado";
carta2.classList="adivinado";
asignoAciertos(); //suma aciertos
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


// Informacion de jugadores
function infoJugadores(){
     j1=getCookie("inicia");
     j2=getCookie("segundo");

}
