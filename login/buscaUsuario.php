<?php
if(isset($_GET['nick'])){
     buscaUsuario($_GET['nick']);
}
#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null

function buscaUsuario($nick){

$db=new mysqli("localhost","root","","") or die ("No es posible conectarse al servidor");

$motor->set_charset("utf8mb4");
     $prod = htmlspecialchars($prod); // Sanitizar el prod
          $query = ""; // Limitar a un resultado
          $result = $motor->query($query);
     if($result->num_rows == 1){ //si existe el cliente en la bd

          $json_temp=new StdClass();
          while($cliente = $result->fetch_object()){
               //$existe="true";
               //idParticiapnte
               //nombre
               //partidas Ganadas
               //

               $myJson=json_encode($json_temp);
               echo $myJson;
          }}else {//no existe el usuario
               $json_temp->existe = "no";
               $myJson=json_encode($existe);
               echo $myJson;
          }
}

?>