<?php
if(isset($_GET['jugador1']) && isset($_GET['jugador2'])){
     buscaUsuario($_GET['jugador1'],$_GET['jugador2']);
}
#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null

function buscaUsuario($nick1,$nick2){

$db=new mysqli("localhost","root","","inmobiliaria") or die ("No es posible conectarse al servidor");


$motor->set_charset("utf8mb4");
     $prod = htmlspecialchars($prod); // Sanitizar el prod
          $query = ""; // Limitar a un resultado
          $result = $motor->query($query);
     if($result->num_rows > 0){ //si existe el cliente en la bd
          while($cliente = $result->fetch_object()){
               //idParticiapntes
               //nombres
               //partidas en comun ?? crear tupla
               // si partidas en comun ultimo ganador
               // y datos de ltuimas partidas,
               $myJson=json_encode();
               echo $myJson;
          }}
}

?>