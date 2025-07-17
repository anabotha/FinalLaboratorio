//aca manda a buscar los usuarios x
//chequea que el 2do usuario no es el primero x
// aca manda a crear los usuarios x
//devuelve los usuarios.
//variable de control,que cuando los dos esten iniciados pase a la siguiente vista.

// tu código aquí
window.onload = function () {
     console.log("getters");
     deleteAllCookies();
     document.getElementById("inicio1").addEventListener("click", function (e) {
          e.preventDefault();
          buscaNombre(document.getElementById("usuario1").value,1,document.getElementById("password1").value);

          //no compara la contraseña aun
     });
     document.getElementById("inicio2").addEventListener("click", function (e) {
          e.preventDefault();
          buscaNombre(document.getElementById("usuario2").value,2,document.getElementById("password2").value);

     });
}



function buscaNombre(usuario, jugador,contraseña) {
     console.log(usuario, jugador);

     let xhr = new XMLHttpRequest();

     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               gestionarRtas(respuesta); 
          }
     };

     console.log("usuario: " + usuario);
     xhr.open("GET", "buscaUsuario.php?nick=" + encodeURIComponent(usuario) + "&jugador=" + encodeURIComponent(jugador)+"&contraseña="+ encodeURIComponent(contraseña), true);
     xhr.send();
}

function deleteAllCookies() {
const cookies = document.cookie.split(";");

for (let cookie of cookies) {
     const nombre = cookie.split("=")[0].trim();
     document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
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

function finLogueo(){
     j1=getCookie('1');
     j2=getCookie('2');
     console.log(j1,j2);
if(j1&&j2){
//pasar a siguiente vista
/*
deleteCookie('jugador1');
deleteCookie('jugador2');*/
console.log("llego a fin logueo");
const mensaje=document.getElementById("logueado1");
mensaje.style.display='none';
const mensaje2=document.getElementById("logueado2");
mensaje2.style.display='none';
     //pase a otra vista
     const btnLobby = document.createElement("button");
     btnLobby.textContent = "IR A LOBBY";
     btnLobby.id = "btnLobby";
     btnLobby.className="btnLobby";
     const body = document.getElementById("body");
     body.appendChild(btnLobby);
     btnLobby.addEventListener("click",irTurnos);//direcciona
}
}

function gestionarRtas(rta){
     let nroJug = rta.nroJug; 
     if(rta.existe && rta.enUso){
     //nroJug = (nroJug === "1") ? "2" : "1";
     console.log("no podes jugar contra vos mismo");
limpiarCampos(nroJug);
console.log(nroJug);
const p=document.getElementById("info"+nroJug);
          p.innerText="no podes jugar contra vos mismo";

}else if(rta.existe && !rta.enUso){
     if(rta.contra){
          const p=document.getElementById("info"+nroJug);
          p.innerText="";
          setCookie(nroJug,rta.nickname,1);
          const ingreso=document.getElementById("ingresoData"+nroJug);
          ingreso.style.display ='none'; 
          const mensaje=document.getElementById("logueado"+nroJug);
          mensaje.style.display='flex';
          finLogueo();
     }else{
          limpiarCampos(nroJug);
          console.log("contraseña incorrecta");
          const p=document.getElementById("info"+nroJug);
          p.innerText="Contraseña incorrecta";
     }
}
     else if(!rta.existe){
          limpiarCampos(nroJug);
     console.log("no existe ese usuario,crealo");
     const p=document.getElementById("info"+nroJug);
          p.innerText=" No tenes usuario? Registrate!";
}
}

function irTurnos(){//direcciona a la siguiente vista
     //window.location.href = "../lobby/lobby.php";
window.location.href = "../lobby/lobby.php?refrescar=" + new Date().getTime();
}

function limpiarCampos(jugador) {
// Determinar los IDs según el jugador
const usuario = document.getElementById("usuario" + jugador);
const password = document.getElementById("password" + jugador);
const info = document.getElementById("info" + jugador);

if (usuario) usuario.value = "";
if (password) password.value = "";
if (info) info.textContent = "";
}