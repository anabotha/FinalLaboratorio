//aca manda a buscar los usuarios
//chequea que el 2do usuario no es el primero
// aca manda a crear los usuarios
//devuelve los usuarios.

//chequea que sean mayores de 15 años
window.onload=function(){
document.getElementById("inicio1").addEventListener("blur", function(e) {
  // acá va lo que querés que pase cuando el inicio salga del input
     e.preventDefault();
     buscaNombre(document.getElementById("usuario1"));
     //no compara la contraseña aun
     });
document.getElementById("inicio2").addEventListener("blur", function(e) {
  // acá va lo que querés que pase cuando el inicio salga del input
     e.preventDefault();
     buscaNombre(document.getElementById("usuario2"));
     });

}
function buscaNombre(usuario){

let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               //mostrarDetalles2(respuesta);
          }
     };
     console.log(usuario);
     xhr.open("GET", "buscaUsuario.php?nick="+encodeURIComponent(usuario), true);
     xhr.send();
}
