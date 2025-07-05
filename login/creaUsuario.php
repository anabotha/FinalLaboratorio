<?php
if (isset($_GET['obj'])) {
     $json_string = $_GET['obj'];
    // Decodificar JSON
     $data = json_decode($json_string);
     $nick = htmlspecialchars($data->nickname);
     $fechaNac = htmlspecialchars($data->fechaNacimiento);
     $email=htmlspecialchars($data->email);
     if(!existeNombre($_GET['nick'])){
          creaUsuario($nick,$fechaNac,$email);
     }else{
          $respuesta = ["existe" => true];//ya existe ese nombre
          echo json_encode($respuesta);
          
     }
}

#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null
function existeNombre($nick){
$db=new mysqli("localhost","root","","juegodb") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
          $query = "SELECT nickname FROM Usuarios WHERE nickname = '$nick'"; // Limitar a un resultado
          $result = $db->query($query);
     if($result->num_rows == 0){ //si no existe el cliente en la bd
          return true;
}else{
     return false;
}}


function esMayorDe15() {
          $fechaNacimiento = new DateTime($fechaNac);
          $hoy = new DateTime();
          $edad = $hoy->diff($fechaNacimiento)->y;
          return $edad >= 15;
}

function creaUsuario($nick,$fechaNac,$email){
     if(esMayorDe15($fechaNac)){

          $db=new mysqli("localhost","root","","") or die ("No es posible conectarse al servidor");
          $db->set_charset("utf8mb4");
                         $insert="INSERT INTO Usuarios (
                              nickname, fechaNacimiento,
                              PartidasJugadas, PartidasGanadas, email
                              ) VALUES ('$nick', '$fechaNac',0, 0, '$email'
                              );"
                    $result = $db->query($insert);
$json_temp = new stdClass(); 
          
               if ($result->affected_rows() > 0) {
          $json_temp->existe = true;

          } else {
          $json_temp->existe = true;
          $json_temp->explanation = "No se insertó ningún usuario.";
          }
     }else {
          $json_temp->existe = true;
          $json_temp->explanation = "Menor a 15 años.";
          }
     $myJson=json_encode($json_temp);
          echo $myJson;
}

?>