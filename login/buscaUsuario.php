<?php
if(isset($_GET['nick'])){
     buscaUsuario($_GET['nick']);
}
#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null

function buscaUsuario($nick){

$db=new mysqli("localhost","root","","inmobiliaria") or die ("No es posible conectarse al servidor");

$motor->set_charset("utf8mb4");
     $prod = htmlspecialchars($prod); // Sanitizar el prod
          $query = ""; // Limitar a un resultado
          $result = $motor->query($query);
     if($result->num_rows > 0){ //si existe el cliente en la bd
          while($cliente = $result->fetch_object()){
               //$existe="true";
               //idParticiapnte
               //nombre
               //partidas Ganadas
               //
               $myJson=json_encode();
               echo $myJson;
          }}else {//no existe el usuario
               $existe="no";
               $myJson=json_encode($existe);
               echo $myJson;
          }
}

?>