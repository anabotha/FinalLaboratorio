<?php
    if (isset($_GET['resultado'])) {
    $datos = json_decode($_GET['resultado']);
    agregarPartida($datos);
    }

    function agregarPartida($datos) {

    // Obtener los valores del objeto JSON
    $p1 = $datos->player1;
    $p2 = $datos->player2;
    $ganador = $datos->winner;
    $puntaje1 = $datos->puntajej1;
    $puntaje2 = $datos->puntajej2;
    $fecha = $datos->fecha;
    if (strcmp($p1, $p2) > 0) {
    [$p1, $p2] = [$p2, $p1]; 
    [$puntaje1, $puntaje2] = [$puntaje2, $puntaje1];
    }

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
        if ($ganador === null || $ganador === "null") {
    $ganador = $fila['ultimoGanador'];
    }

    // Preparar UPDATE
    $update = "UPDATE partidas 
            SET ganadasComunJ1 = ?, ganadasComunJ2 = ?, partidasTotales = ?, ultimaPartida = ?, ultimoGanador = ?
            WHERE j1 = ? AND j2 = ?";
            
    $stmt = $db->prepare($update);
    $stmt->bind_param("iiissss", $ganadasJ1, $ganadasJ2, $partidasTotales, $fecha, $ganador, $p1, $p2);
    $stmt->execute();

    }
    agregarWin($db,$datos);
    actualizarPuntaje($db,$p1,$puntaje1);
    actualizarPuntaje($db,$p2,$puntaje2);

    $stmt->close();
    $db->close();
    echo json_encode(["estado" => "ok", "mensaje" => "Partida registrada"]);
    }

    function agregarWin($db,$datos) {
    $ganador = $datos->winner;

    // 1. Obtener PartidasGanadas del ganador
    $query = "SELECT PartidasGanadas FROM usuarios WHERE nickname = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("s", $ganador);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $row = $resultado->fetch_assoc();
        $ganadasActuales = (int)$row['PartidasGanadas'];
        $nuevasGanadas = $ganadasActuales + 1;

        // 2. Actualizar PartidasGanadas
        $update = "UPDATE usuarios SET PartidasGanadas = ? WHERE nickname = ?";
        $stmtUpdate = $db->prepare($update);
        $stmtUpdate->bind_param("is", $nuevasGanadas, $ganador);
        $stmtUpdate->execute();
        $stmtUpdate->close();
    }

    }
    function actualizarPuntaje($db, $nickname, $puntajeGanado) {
    $query = "SELECT Puntaje FROM usuarios WHERE nickname = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("s", $nickname);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $row = $resultado->fetch_assoc();
        $puntajeActual = (int)$row['Puntaje'];
        $nuevoPuntaje = $puntajeActual + $puntajeGanado;

        $update = "UPDATE usuarios SET Puntaje = ? WHERE nickname = ?";
        $stmtUpdate = $db->prepare($update);
        $stmtUpdate->bind_param("is", $nuevoPuntaje, $nickname);
        $stmtUpdate->execute();
        $stmtUpdate->close();
    }


    }
