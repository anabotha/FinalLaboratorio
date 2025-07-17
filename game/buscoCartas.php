<?php
header('Content-Type: application/json');

session_start();
if(isset($_SESSION['cartas'],$_SESSION['tipo'],$_SESSION['tiempo'])){
     $cartas = $_SESSION['cartas'];
     $tipo=$_SESSION['tipo'];
  $tiempo=$_SESSION['tiempo'];
  
     buscoCartas($cartas,$tipo,$tiempo);
}

function getCookiePHP($nombre) {
     return isset($_COOKIE[$nombre]) ? $_COOKIE[$nombre] : null;
}

function buscoCartas($cartas,$tipo,$tiempo){
     $cartas = $cartas;
     $tipo = $tipo;
     $tiempo = $tiempo;
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