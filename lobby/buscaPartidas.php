<?php
if(isset($_GET['jugador1']) && isset($_GET['jugador2'])){
     $nick1=htmlspecialchars($_GET['jugador1']);
     $nick2=htmlspecialchars($_GET['jugador2']);

     buscaPartidas($nick1,$nick2);
}
#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null

function buscaPartidas($nick1,$nick2){
//ordena alfabeticamente los nicks
if (strcasecmp($nick1, $nick2) < 0) {
     $usuario1 = $nick1;
     $usuario2 = $nick2;
} else {
     $usuario1 = $nick2;
     $usuario2 = $nick1;
}


//conexion a bd
$db=new mysqli("localhost","root","","") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
          $query = ""; // Limitar a un resultado
          $result = $db->query($query);
     if($result->num_rows == 1){ //si existe el cliente en la bd
          while($cliente = $result->fetch_object()){
               //idParticiapntes
               //nombres
               //partidas en comun ?? crear tupla
               // si partidas en comun ultimo ganador
               // y datos de ltuimas partidas,
               $myJson=json_encode();
               echo $myJson;
          }} else{//no existen partidas
               
               // la subo a la bd
               $update="INSERT INTO Partidas (
               Usuario1, Usuario2,
               partidasGanadasUsuario1,
               partidasGanadasUsuario2,
               ultimoGanador,
               partidasTotales
               ) VALUES (
               '$usuario1', '$usuario2',0, 0,NULL,0);"
               $myJson=json_encode();//si creo una  partida class armo eso y la mando
               echo $myJson;

               
          }
}

?>