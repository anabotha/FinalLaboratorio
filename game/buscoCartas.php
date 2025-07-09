<?php
if(getCookiePHP("settings")){
     $settings=getCookiePHP("settings");
     $config = json_decode($_COOKIE['settings'], true); // true = array asociativo
     buscoCartas($config);
}

function getCookiePHP($nombre) {
     return isset($_COOKIE[$nombre]) ? $_COOKIE[$nombre] : null;
}

function buscoCartas($config){
     $cartas = $config['cartas'];
     $tipo = $config['tipo'];
     $tiempo = $config['tiempo'];
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
               echo json_encode($mazo);
     }
     
          ?>