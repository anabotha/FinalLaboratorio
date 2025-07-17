window.onload = function () {
     document
          .getElementById("registreUsuario")
          .addEventListener("click", function (e) {
               e.preventDefault();
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
               console.log(xhr.responseText);
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
     var p=document.getElementById("info");
     var exito=document.getElementById("exito");

if(usuario.nombreExiste===false && usuario.nuevo){
     console.log("se creo exitosamente,ya puede jugar");
     exito.innerText="Registrado exitosamente";
     p.innerText="";
     setTimeout(() => {
  window.location.href = "../login.php";
}, 2000); // 2000 ms = 2 segundos


}else if(usuario.nombreExiste && usuario.nuevo===false){
     console.log("ya existe un usuario con ese nombre,intente otro");
     p.innerText="Ya existe un usuario con ese nombre, intente con otro";
}else if(usuario.nombreExiste===false && usuario.menor){
     console.log("debe ser mayor a 15 años");
     exito.innerText="";
     p.innerText="Debe ser mayor a 15 años";

}else if(usuario.emailExiste && usuario.nuevo===false){
     console.log("ya existe un usuario con ese mail");
     exito.innerText="";
     p.innerText="Ya existe una cuenta asociada a ese email, intente con otro";
}
else{
     console.log("hubo un error,intente de nuevo");
     console.log(usuario);
     exito.innerText="";
     p.innerText="hubo un error,intente de nuevo";
}
}
