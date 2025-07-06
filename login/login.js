//aca manda a buscar los usuarios x
//chequea que el 2do usuario no es el primero x
// aca manda a crear los usuarios x
//devuelve los usuarios.
//variable de control,que cuando los dos esten iniciados pase a la siguiente vista.

window.onload = function () {
     
     document.getElementById("inicio1").addEventListener("click", function (e) {
          e.preventDefault();
          buscaNombre(document.getElementById("usuario1").value,1);
               console.log("llegaaaaaa");

          //no compara la contraseña aun
     });
     document.getElementById("inicio2").addEventListener("click", function (e) {
          e.preventDefault();
          buscaNombre(document.getElementById("usuario2").value,2);

     });
}

function buscaNombre(usuario, jugador) {
     console.log(usuario, jugador);

     let xhr = new XMLHttpRequest();

     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               gestionarRtas(respuesta); // Asegurate de que esta función exista
          }
     };

     console.log("usuario: " + usuario);
     xhr.open("GET", "buscaUsuario.php?nick=" + encodeURIComponent(usuario) + "&jugador=" + encodeURIComponent(jugador), true);
     xhr.send();
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
     j1=getCookie('jugador1');
     j2=getCookie('jugador2');
if(j1&&j2){
//pasar a siguiente vista
console.log("llego");
deleteCookie('jugador1');
     deleteCookie('jugador2');

     //pase a otra vista
}
}

function gestionarRtas(rta){
     console.log("entra");

if(rta.existe && rta.enUso){
     console.log("no podes jugar contra vos mismo");
}else if(rta.existe && !rta.enUso){
     console.log("logueada, falta tu compa nomas");
     finLogueo();
}
     else if(!rta.existe){
     console.log("no existe ese usuario,crealo");
     //escrbir q no existe el usuario
}
}