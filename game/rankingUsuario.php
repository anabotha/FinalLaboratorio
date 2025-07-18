
<?php
header('Content-Type: application/json');
if(isset($_GET["usuario"])){
     $usuario=json_decode($_GET["usuario"]);
$db=conexion();
ranking($db,$usuario);
}

function conexion(){
$db = new mysqli("localhost", "root", "", "juegodb");
if ($db->connect_error) {
     die("No se pudo conectar a la base de datos: " . $db->connect_error);
}
$db->set_charset("utf8mb4");
return $db;
}

function ranking($conn, $player) {
    $nombreUsuario = $player->nombre;
    $nuevoPuntaje = $player->ptje;
    $nuevoPorcentaje = $player->porcentaje;

    if (!$nombreUsuario || $nuevoPuntaje === null || $nuevoPorcentaje === null) {
        return false;
    }

    // 1. Obtener ID del usuario
    $stmt = $conn->prepare("SELECT idUsuario FROM usuarios WHERE nickname = ?");
    $stmt->bind_param("s", $nombreUsuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 0) {
        return false;
    }

    $usuario = $resultado->fetch_assoc();
    $usuarioId = $usuario['idUsuario'];

    // 2. Obtener top 5 del usuario
    $stmt = $conn->prepare("SELECT id, puntaje, porcentaje FROM ranking WHERE usuario_id = ? ORDER BY puntaje DESC, porcentaje DESC");
    $stmt->bind_param("i", $usuarioId);
    $stmt->execute();
    $rankingUsuario = $stmt->get_result();

    $entra = false;

    if ($rankingUsuario->num_rows < 5) {
        $entra = true;
    } else {
        $filas = $rankingUsuario->fetch_all(MYSQLI_ASSOC);
        $peor = $filas[4]; // 5ta peor

        if (
            $nuevoPuntaje > $peor['puntaje'] ||
            ($nuevoPuntaje === $peor['puntaje'] && $nuevoPorcentaje > $peor['porcentaje'])
        ) {
            $entra = true;
            // Eliminar la peor del usuario
            $peorId = $peor['id'];
            $conn->query("DELETE FROM ranking WHERE id = $peorId");
        }
    }

    // 3. Insertar si entra
    if ($entra) {
        $stmt = $conn->prepare("INSERT INTO ranking (usuario_id, puntaje, porcentaje) VALUES (?, ?, ?)");
        $stmt->bind_param("iid", $usuarioId, $nuevoPuntaje, $nuevoPorcentaje);
        $stmt->execute();
        return true;
    }

    return false;
}

