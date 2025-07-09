<?php
if(isset($_GET["id"])&&isset($_GET["tipo"])){
buscacartas($_GET["id"],$_GET["tipo"]);
}

function buscacartas($id, $tipo){
    // Conexión a la BD
     $db = new mysqli("localhost", "root", "", "juegodb") or die("No es posible conectarse al servidor");
     $db->set_charset("utf8mb4");

     // Consulta
     $query = "SELECT * FROM cartas WHERE tipo='" . $db->real_escape_string($tipo) . "' AND id=" . intval($id);
     $result = $db->query($query);

     // Resultado
     if ($result && $result->num_rows > 0) {
          $carta = $result->fetch_object();
          echo json_encode($carta); 
     } else {
          echo json_encode(["error" => "Carta no encontrada"]);
     }
}
?>