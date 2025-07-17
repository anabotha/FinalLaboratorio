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
/*if (strcasecmp($nick1, $nick2) < 0) {
     $nick1 = $nick1;
     $nick2 = $nick2;
} else {
     $nick1 = $nick2;
     $nick2 = $nick1;
}*/
if (strcmp($nick1, $nick2) > 0) {
    [$nick1, $nick2] = [$nick2, $nick1]; 
    //[$puntaje1, $puntaje2] = [$puntaje2, $puntaje1];
}

require_once './Partida.class.php';

//conexion a bd
$db=new mysqli("localhost","root","","juegoDb") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
$query = "SELECT 
p.j1,p.j2,
p.ganadasComunJ2,
p.ganadasComunJ1,
p.partidasTotales,
p.ultimaPartida, 
p.ultimoGanador,
u1.PartidasGanadas AS ganadasIndivJ1, 
u2.PartidasGanadas AS ganadasIndivJ2
FROM partidas p
JOIN usuarios u1 ON p.j1 = u1.nickname
JOIN usuarios u2 ON p.j2 = u2.nickname
WHERE p.j1 = '$nick1' AND p.j2 = '$nick2'"; // Limitar a un resultado
     $result = $db->query($query);
     if($result->num_rows == 1){ //si existe el cliente en la bd
          while($cliente = $result->fetch_object()){
               $partida = new Partida();
               $partida->setJ1($cliente->j1);
               $partida->setJ2($cliente->j2);
               $partida->setGanadasComunJ1($cliente->ganadasComunJ1);
               $partida->setGanadasComunJ2($cliente->ganadasComunJ2);
               $partida->setpartidasTotales($cliente->partidasTotales);
               $partida->setUltimoGanador($cliente->ultimoGanador);
               $partida->setPrimeroActual($cliente->ultimoGanador); // o lo que corresponda
               $partida->setGanadasIndivJ1($cliente->ganadasIndivJ1);
               $partida->setGanadasIndivJ2($cliente->ganadasIndivJ2);
                    if (!empty($cliente->ultimaPartida)) {
     $partida->setUltimaPartida(new DateTime($cliente->ultimaPartida));
} 
}
} else {
// Insertar nueva partida
          $partida = new Partida();

$update = "INSERT INTO Partidas (
     j1, j2,
     ganadasComunJ1,
     ganadasComunJ2,
     partidasTotales
) VALUES (
     '$nick1', '$nick2', 0, 0, 0
);";
$db->query($update);

// Obtener ganadas individuales desde la tabla usuarios
$ganadasJ1 = 0;
$ganadasJ2 = 0;

$resJ1 = $db->query("SELECT partidasGanadas FROM usuarios WHERE nickname = '$nick1'");
if ($resJ1 && $resJ1->num_rows > 0) {
     $ganadasJ1 = $resJ1->fetch_object()->partidasGanadas;
}

$resJ2 = $db->query("SELECT partidasGanadas FROM usuarios WHERE nickname = '$nick2'");
if ($resJ2 && $resJ2->num_rows > 0) {
     $ganadasJ2 = $resJ2->fetch_object()->partidasGanadas;
}

// Inicializar el objeto Partida
$partida->setJ1($nick1);
$partida->setJ2($nick2);
$partida->setGanadasComunJ1(0);
$partida->setGanadasComunJ2(0);
$partida->setPrimeroActual(null);
$partida->setGanadasIndivJ1($ganadasJ1);
$partida->setGanadasIndivJ2($ganadasJ2);
$partida->setpartidasTotales(0);
//$partida->setUltimaPartida(null);
$partida->setUltimoGanador(null);
}
     $myJson=json_encode($partida);//si creo una  partida class armo eso y la mando
     setCookiePHP("partida",$myJson,1);
          return $myJson;
}

?>