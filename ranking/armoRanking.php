<?php

function conexion(){
$db = new mysqli("localhost", "root", "", "juegodb");
if ($db->connect_error) {
     die("No se pudo conectar a la base de datos: " . $db->connect_error);
}
$db->set_charset("utf8mb4");
return $db;
}

function armoRanking(){
$db = conexion();

$sql = "SELECT nickname, puntaje FROM usuarios ORDER BY puntaje DESC LIMIT 5";
$resultado = $db->query($sql);

if (!$resultado) {
     echo "Error al obtener el ranking: " . $db->error;
     return;
}

echo "<h2>Top 5 Jugadores</h2>";
echo "<table >";
echo "<tr><th>Posición</th><th>Nickname</th><th>Puntaje</th></tr>";

$pos = 1;
while ($fila = $resultado->fetch_assoc()) {
     echo "<tr>";
     echo "<td>{$pos}°</td>";
     echo "<td>{$fila['nickname']}</td>";
     echo "<td>{$fila['puntaje']} puntos</td>";
     echo "</tr>";
     $pos++;
}

echo "</table>";

$db->close();
}
?>
