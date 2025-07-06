window.onload = function () {
     document
          .getElementById("registreUsuario")
          .addEventListener("click", function (e) {
               e.preventDefault();
               console.log("register llega");
               const nombre = document.getElementById("usuario").value;
               const password = document.getElementById("password").value;
               const email = document.getElementById("email").value;
               const fecha_nacimiento =
                    document.getElementById("fecha_nacimiento").value;
               const datosUsuario = {
                    nickname: nombre,
                    password: password,
                    email: email,
                    fechaNacimiento: fecha_nacimiento,
               };

               // Convertir a JSON
               const json = JSON.stringify(datosUsuario);
               creaUsuario(json);
               //no compara la contraseña aun
          });
};

function creaUsuario(usuario) {
     let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               let respuesta = JSON.parse(xhr.responseText);
               console.log(respuesta);
               gestionarRespuestas(respuesta);
          }
     };
     console.log(usuario);
     xhr.open("GET", "creaUsuario.php?obj=" + encodeURIComponent(usuario), true);
     xhr.send();
}

function gestionarRespuestas(usuario){
if(usuario.existe && usuario.nuevo){
     console.log("se creo exitosamente,ya puede jugar");
}else if(usuario.existe && usuario.nuevo!=true){
     console.log("ya existe un usuario con ese nombre,intente otro");
}else if(usuario.existe!=true && usuario.menor){
     console.log("debe ser mayor a 15 años");
}else if(usuario.existeEmail=true && !usuario.existe){
     console.log("ya existe un usuario con ese mail");

}
else{
     console.log("hubo un error,intente de nuevo");
     console.log(usuario.menor);
}
}
