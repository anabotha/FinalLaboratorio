<?php
function getRanking($jugadorActual) {
    $conn = new mysqli("localhost", "root", "", "juegodb");
    if ($conn->connect_error) {
        die("No se pudo conectar a la base de datos: " . $conn->connect_error);
    }
    $conn->set_charset("utf8mb4");

    $jugadorActual = $conn->real_escape_string($jugadorActual);

    $sql = "SELECT u.nickname AS jugador, r.puntaje, r.porcentaje, r.fecha
            FROM ranking r
            JOIN usuarios u ON r.usuario_id = u.idUsuario
            WHERE u.nickname = '$jugadorActual'
            ORDER BY r.puntaje DESC, r.fecha ASC
            LIMIT 5";

    $resultado = $conn->query($sql);

    if ($resultado->num_rows === 0) {
        return [];
    }

    $ranking = [];
    while ($fila = $resultado->fetch_assoc()) {
        $fila['es_actual'] = ($fila['jugador'] === $jugadorActual);
        $ranking[] = $fila;
    }

    return $ranking;
}
?>