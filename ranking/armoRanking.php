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

echo "<h2>🥇 Top 5 Jugadores 🥇</h2>";
echo "<table class='ranking-table'>";
echo "<thead>"; 
echo "<tr><th>Posición</th><th>Nickname</th><th>Puntaje</th></tr>";
echo "</thead>";
echo "<tbody>"; 

$pos = 1;
while ($fila = $resultado->fetch_assoc()) {
$rowClass = '';
$positionCellClass = ''; 

if ($pos === 1) {
     $rowClass = 'rank-1-row'; // adapta a 1er puesto
     $positionCellClass = 'rank-1-pos'; 
} elseif ($pos === 2) {
     $rowClass = 'rank-2-row';
     $positionCellClass = 'rank-2-pos';
} elseif ($pos === 3) {
     $rowClass = 'rank-3-row';
     $positionCellClass = 'rank-3-pos';
}

echo "<tr class='{$rowClass}'>";
echo "<td class='position-cell {$positionCellClass}'>{$pos}°</td>";
echo "<td>{$fila['nickname']}</td>";
echo "<td>{$fila['puntaje']} puntos</td>";
echo "</tr>";

$pos++;
if ($pos > 5) {
     break;
}
}

echo "</tbody>";
echo "</table>";

$db->close();
}
?>