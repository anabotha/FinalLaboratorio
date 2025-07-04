<?php
if (isset($_GET['nick']) && isset($_GET['fechaNac']) && isset($_GET['json'])) {
     $nick = htmlspecialchars($_GET['nick']);
     if(!existeNombre($_GET['nick'])){
          creaUsuario($nick,$_GET['json']);
     }else{
          $respuesta = ["existe" => true];//ya existe ese nombre
          echo json_encode($respuesta);
          
     }
}
#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null
function existeNombre($nick){
$db=new mysqli("localhost","root","","") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
          $query = "SELECT idUsuario FROM Usuarios WHERE nickname = '$nick'"; // Limitar a un resultado
          $result = $db->query($query);
     if($result->num_rows == 0){ //si no existe el cliente en la bd
          return true;
}else{
     return false;
}}

function creaUsuario($nick){
$db=new mysqli("localhost","root","","") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
               $insert="INSERT INTO Usuarios (
                    nickname, fechaNacimiento,
                    PartidasJugadas, PartidasGanadas, email
                    ) VALUES ('nick123', '2001-04-15',0, 0, 'nick123@example.com'
                    );"
               //$existe="si";
               //idParticiapnte
               //nombre
               //partidas Ganadas
               //
          $result = $db->query($insert);

     if ($result->affected_rows() > 0) {
     echo " Usuario insertado correctamente.";
} else {
     echo " No se insertó ningún usuario.";
}
          
}

?>