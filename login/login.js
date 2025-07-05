//aca manda a buscar los usuarios
//chequea que el 2do usuario no es el primero
// aca manda a crear los usuarios
//devuelve los usuarios.
//chequea que sean mayores de 15 años
//variable de control,que cuando los dos esten iniciados pase a la siguiente vista.

window.onload=function(){
document.getElementById("inicio1").addEventListener("click", function(e) {
     e.preventDefault();
     console.log("lega");
     buscaNombre(document.getElementById("usuario1").value);
     //no compara la contraseña aun
});
document.getElementById("inicio2").addEventListener("click", function(e) {
     e.preventDefault();
     buscaNombre(document.getElementById("usuario2").value);
});
}

function buscaNombre(usuario){
let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta.existe);
               if(respuesta.existe && respuesta.enUso!=true){
                    //manda que compare la contraseña y que marque en la bd que esta en uso
               }
               //mostrarDetalles2(respuesta);
          }
     };
     console.log(usuario);
     xhr.open("GET", "buscaUsuario.php?nick="+encodeURIComponent(usuario), true);
     xhr.send();
}
