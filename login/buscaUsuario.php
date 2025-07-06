<?php
if (isset($_GET['nick']) && isset($_GET['jugador'])) {
     $nick = htmlspecialchars($_GET['nick']);
     $nroJug = intval($_GET['jugador']); // Por si querés usarlo como número

     if (!cookieEsIgualA($nroJug,$nick)) {
          buscaUsuario($nick, $nroJug);
     } else {
          $json_temp = new stdClass();
          $json_temp->existe = true;
          $json_temp->enUso = true;
          echo json_encode($json_temp);
     }
}
#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null

function setCookiePHP($nombre, $valor, $dias = 7) {
    $tiempoExpiracion = time() + ($dias * 24 * 60 * 60); // tiempo actual + X días
    setcookie($nombre, $valor, $tiempoExpiracion, "/"); // "/" = disponible en todo el sitio
}

function getCookiePHP($nombre) {
     return isset($_COOKIE[$nombre]) ? $_COOKIE[$nombre] : null;
}

function cookieEsIgualA($nombre, $valorEsperado) {
     return isset($_COOKIE[$nombre]) && $_COOKIE[$nombre] === $valorEsperado;
}

function buscaUsuario($nick,$nroJug){
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
          $json_temp->nroJug = $nroJug;
          $json_temp->enUso=false;

          $json_temp->partidasGanadas = $cliente->PartidasGanadas ?? null;
          setcookiePHP($nroJug,$cliente->nickname,1);
          }else {//no existe el usuario
               $json_temp->existe = false;
          $json_temp->enUso=false;

          }
          $myJson=json_encode($json_temp);
          echo $myJson;
     }

?>