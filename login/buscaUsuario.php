<?php
if(isset($_GET['nick'])){
     buscaUsuario($_GET['nick']);
}
#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null

function buscaUsuario($nick){
$nick = htmlspecialchars($nick); // Sanitizar el NI$nick
$db=new mysqli("localhost","root","","juegodb") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
$query = "SELECT * FROM Usuarios WHERE nickname ='".$nick."'"; // Limitar a un resultado
$result = $db->query($query);
$json_temp = new stdClass(); 
     if ($result && $result->num_rows == 1) {
          $cliente = $result->fetch_object(); // Solo uno
          $json_temp->existe = true;
          $json_temp->nickname = $cliente->nickname;
          $json_temp->partidasGanadas = $cliente->partidasGanadas ?? null;
          $json->temp->enUso=$cliente->enUso;
          }else {//no existe el usuario
               $json_temp->existe = false;
          }
          $myJson=json_encode($json_temp);
          echo $myJson;
     }

?>