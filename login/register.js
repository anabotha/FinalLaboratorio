
window.onload=function(){
document.getElementById("registreUsuario").addEventListener("click", function(e) {
     e.preventDefault();
     console.log("register llega");
     const nombre=document.getElementById("usuario").value;
     const password=document.getElementById("password").value;
     const email=document.getElementById("email").value;
     const fecha_nacimiento=document.getElementById("fecha_nacimiento").value;
     const datosUsuario = {
     nickname: nombre,
     password: password,
     email: email,
     fechaNacimiento: fecha_nacimiento
};

// Convertir a JSON
const json = JSON.stringify(datosUsuario);
     creaUsuario(json);
     //no compara la contraseña aun
});
}


function creaUsuario(usuario){
let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               
               //mostrarDetalles2(respuesta);
          }
     };
     console.log(usuario);
     xhr.open("GET", "creaUsuario.php?obj="+encodeURIComponent(usuario), true);
     xhr.send();
}