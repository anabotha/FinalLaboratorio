<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
<script src="lobby.js" defer></script>
<link rel="stylesheet" href="./lobby.css">
</head>
<body>
     <?php
function getCookiePHP($nombre) {
     return isset($_COOKIE[$nombre]) ? $_COOKIE[$nombre] : null;
}
$info = getCookiePHP("partida");
echo $info;
if ($info) {
     $partida = json_decode($info);
     //echo $partida;
     if ($partida) {


     ?>
     <h2>hola mundo, existe la cookie y anda el json.</h2>

<?php
//echo $partida->J1;
}else{
echo"no anda el json";
}
}else{
echo"de q cookie me habals flaca";
}
?>
</body>
</html>