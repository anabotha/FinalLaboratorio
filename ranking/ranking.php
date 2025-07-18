<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Memory Game</title>
     <link rel="stylesheet" href="ranking.css">
    <script src="./ranking.js" defer></script>

</head>
<body>
     <div class="header">
    <div class="left"></div>
    <div><h1>MEMORY GAME</h1></div>
    <div class="right"> <button onclick="cerrarSesion()" style="border: none; background: none;">
  <img src="../docs\iconos\closure" title="Volver a Inicio" class="iconos">
</button>

</div>
  </div>

     <?php
     include('armoRanking.php');
armoRanking();
?>


</body>
</html>