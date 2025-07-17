<?php
if (isset($_GET['nick']) && isset($_GET['jugador']) &&isset($_GET['contraseña'])) {
     $nick = htmlspecialchars($_GET['nick']);
     $nroJug = intval($_GET['jugador']); // Por si querés usarlo como número
     $contra=$_GET['contraseña'];
     $nroJug2 = ($nroJug === "1") ? "2" : "1";

     if (!cookieEsIgualA($nroJug2,$nick)) {
          buscaUsuario($nick, $nroJug,$contra);
     } else {
          $json_temp = new stdClass();
          $json_temp->existe = true;
          $json_temp->enUso = true;
          $json_temp->nroJug = $nroJug;

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

function verificarContraseña($ingreso, $nick) {
// Conexión a la base de datos
$db = new mysqli("localhost", "root", "", "datosJuegoDb");
$db->set_charset("utf8mb4");

if ($db->connect_error) {
     return false;
}

//buscar el hash guardado del usuario
$stmt = $db->prepare("SELECT contraseñas FROM contraseñas WHERE nickname = ?");
if (!$stmt) {
     return false;
}

// Asocio el nickname
$stmt->bind_param("s", $nick);
$stmt->execute();

// Obtenemos el resultado
$resultado = $stmt->get_result();
if ($resultado->num_rows === 0) {
     // No existe el usuario
     return false;
}

$fila = $resultado->fetch_assoc();
$hashGuardado = $fila['contraseñas'];

// Verificamos la contraseña
$esValida = password_verify($ingreso, $hashGuardado);

// Cerramos conexión
$stmt->close();
$db->close();
return $esValida;
}

function buscaUsuario($nick,$nroJug,$contra){
$nick = htmlspecialchars($nick); // Sanitizar el $nick
$db=new mysqli("localhost","root","","juegodb") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
$query = "SELECT * FROM Usuarios WHERE nickname ='".$nick."'"; // Limitar a un resultado
$result = $db->query($query);
$json_temp = new stdClass(); 
     if ($result && $result->num_rows == 1) {
          if(verificarContraseña($contra, $nick)){ //si la contraseña coincide.
               $cliente = $result->fetch_object(); // Solo uno
               $json_temp->existe = true;
               $json_temp->nickname = $cliente->nickname;
               $json_temp->nroJug = $nroJug;
               $json_temp->enUso=false;
               $json_temp->contra = true;
               $json_temp->partidasGanadas = $cliente->PartidasGanadas ?? null;
               setcookiePHP($nroJug,$cliente->nickname,1);
          }else{/// si la contra no coincide
               $json_temp->existe = true;
               $json_temp->contra = false;
               $json_temp->enUso=false;
               $json_temp->nroJug = $nroJug;

          }
          }else {//no existe el usuario
               $json_temp->existe = false;
          $json_temp->enUso=false;
               $json_temp->nroJug = $nroJug;

          }
           $db->close();
          $myJson=json_encode($json_temp);
          echo $myJson;
     }

?>