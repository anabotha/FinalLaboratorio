<?php
if (isset($_GET['resultado'])) {
agregarPartida($_GET['resultado']);
}

function agregarPartida($resultadoJson) {
$datos = json_decode($resultadoJson);

// Obtener los valores del objeto JSON
$p1 = $datos->player1;
$p2 = $datos->player2;
$ganador = $datos->winner;
$puntaje1 = $datos->puntajej1;
$puntaje2 = $datos->puntajej2;
$fecha = $datos->fecha;

$db = new mysqli("localhost", "root", "", "juegodb");
if ($db->connect_error) {
     die("No se pudo conectar a la base de datos: " . $db->connect_error);
}
$db->set_charset("utf8mb4");

// Buscar si ya existe una fila con j1 y j2
$query = "SELECT * FROM partidas WHERE j1=? AND j2=?";
$stmt = $db->prepare($query);
$stmt->bind_param("ss", $p1, $p2);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
     // Si existe, actualizarla
     $fila = $resultado->fetch_assoc();
     $ganadasJ1 = $fila['ganadasComunJ1'];
     $ganadasJ2 = $fila['ganadasComunJ2'];
     $partidasTotales = $fila['partidasTotales'] + 1;

     if ($ganador == $p1) $ganadasJ1++;
     if ($ganador == $p2) $ganadasJ2++;

     $update = "UPDATE partidas 
               SET ganadasComunJ1=?, ganadasComunJ2=?, partidasTotales=?, ultimaPartida=?, ultimoGanador=? 
               WHERE j1=? AND j2=?";
     $stmt = $db->prepare($update);
     $stmt->bind_param("iiissss", $ganadasJ1, $ganadasJ2, $partidasTotales, $fecha, $ganador, $p1, $p2);
     $stmt->execute();
} else {
     // Si no existe, insertar una nueva
     $ganadasJ1 = $ganador == $p1 ? 1 : 0;
     $ganadasJ2 = $ganador == $p2 ? 1 : 0;

     $insert = "INSERT INTO partidas (j1, j2, ganadasComunJ1, ganadasComunJ2, partidasTotales, ultimaPartida, ultimoGanador)
               VALUES (?, ?, ?, ?, 1, ?, ?)";
     $stmt = $db->prepare($insert);
     $stmt->bind_param("ssiiss", $p1, $p2, $ganadasJ1, $ganadasJ2, $fecha, $ganador);
     $stmt->execute();
}

$stmt->close();
$db->close();
  echo json_encode(["estado" => "ok", "mensaje" => "Partida registrada"]);
}
?>
