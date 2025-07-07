<?php
$jugador1=getCookiePHP("1");
$jugador2=getCookiePHP("2");

if($jugador1 && $jugador2){
     $nick1 = htmlspecialchars($jugador1);
     $nick2 = htmlspecialchars($jugador2);
     $info=buscaPartidas($nick1,$nick2) ;
     if ($info){
          echo $info;
          exit;
     }
}
echo json_encode(null);
exit;

function setCookiePHP($nombre, $valor, $dias = 7) {
    $tiempoExpiracion = time() + ($dias * 24 * 60 * 60); // tiempo actual + X días
    setcookie($nombre, $valor, $tiempoExpiracion, "/"); // "/" = disponible en todo el sitio
}

function getCookiePHP($nombre) {
     return isset($_COOKIE[$nombre]) ? $_COOKIE[$nombre] : null;
}

function buscaPartidas($nick1,$nick2){
//ordena alfabeticamente los nicks
if (strcasecmp($nick1, $nick2) < 0) {
     $usuario1 = $nick1;
     $usuario2 = $nick2;
} else {
     $usuario1 = $nick2;
     $usuario2 = $nick1;
}

require_once './Partida.class.php';
$partida = new Partida();

//conexion a bd
$db=new mysqli("localhost","root","","juegoDb") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
          $query = "SELECT * FROM partidas where j1='$usuario1'
          AND j2='$usuario2'"; // Limitar a un resultado
          $result = $db->query($query);
     if($result->num_rows == 1){ //si existe el cliente en la bd
          while($cliente = $result->fetch_object()){
               $partida->setJ1($cliente->j1);
               $partida->setJ2($cliente->j2);
               $partida->setGanadasComunJ1($cliente->ganadasComunJ1);
               $partida->setGanadasComunJ2($cliente->ganadasComunJ2);
               $partida->setGanadasIndivJ1(0); // Asignar 
               $partida->setGanadasIndivJ2(0); // Asignar 
               //$partida->setPrimeroActual($cliente->ultimoGanador); // O asigna quien inicia
          
     }} else{//no existen partidas
          // la subo a la bd
          $update="INSERT INTO Partidas (
          j1, j2,
          ganadasComunJ1,
          ganadasComunJ2,
          partidasTotales
          ) VALUES (
          '$usuario1', '$usuario2',0, 0,0);";
          $result = $db->query($update);
          // Inicializa el objeto Partida con los valores de la nueva partida
          $partida->setJ1($usuario1);
          $partida->setJ2($usuario2);
          $partida->setGanadasComunJ1(0);
          $partida->setGanadasComunJ2(0);
          $partida->setGanadasIndivJ1(0);
          $partida->setGanadasIndivJ2(0);
          $partida->setPrimeroActual(null);
     }
     $myJson=json_encode($partida);//si creo una  partida class armo eso y la mando
     setCookiePHP("partida",$myJson,1);
          return $myJson;
}

?>