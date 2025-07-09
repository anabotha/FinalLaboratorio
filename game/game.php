<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
</head>
<body>
     <?php
/*function setCookiePHP($nombre, $valor, $dias = 7) {
    $tiempoExpiracion = time() + ($dias * 24 * 60 * 60); // tiempo actual + X días
    setcookie($nombre, $valor, $tiempoExpiracion, "/"); // "/" = disponible en todo el sitio
}*/

function getCookiePHP($nombre) {
     return isset($_COOKIE[$nombre]) ? $_COOKIE[$nombre] : null;
}


if(getCookiePHP("settings")){
     echo"settingss";
     $settings=getCookiePHP("settings");
     $config = json_decode($_COOKIE['settings'], true); // true = array asociativo
     $cartas = $config['cartas'];
     $tipo = $config['tipo'];
     $tiempo = $config['tiempo'];
     /*echo $settings;
     $i= getCookiePHP("inicia");
     echo "<br> inicia ".$i;*/
     $limit=intval($cartas)/2;
     //conexion a bd
     $db=new mysqli("localhost","root","","juegodb") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
$query = "SELECT * FROM cartas WHERE tipo='".$tipo."' LIMIT $limit"; // Limitar a un resultado
$result = $db->query($query);
$mazo=[];
if ($result && $result->num_rows >0) {
     while($carta = $result->fetch_object()) {
               $mazo[] = $carta;
               $mazo[] = clone $carta; // duplicado como nuevo objeto
          }}
          shuffle($mazo);
          echo"<div id='game-container' class='game-container'>";
               foreach ($mazo as $carta) {
                    echo "<div class='carta' data-id='$carta->id'> $carta->id<img src='$carta->reverso'>
          </div>";
               }
          echo"</div>";
}else{
     echo"error al cargar la pagina";
}
     ?>
</body>
</html>