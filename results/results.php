
<?php
session_start(); 
?>
<!DOCTYPE html>
<html lang="es">
<head>
     <script>
  const j1='<?php echo $_SESSION['j1']?>';
  const j2='<?php echo $_SESSION['j2']?>';
</script>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Memory Game</title>
<link rel="stylesheet" href="./results.css" />
<script src="results.js" defer></script>
</head>
<body>
<h1>MEMORY GAME</h1>

<div class="grid-3x3">
<div class="cell"></div> <!-- fila 1 -->
<div class="cell"><div class="tiempo" id="cronometro"></div></div>
<div class="cell"></div>

<div class="cell" id="cont-jugador1">
     <h1 id="ganador1"></h1>
     <h2 id="jugador1"> </h2>
     <div class="mensaje"><p> <span id="mensaje1"></span></p></div>
     <div class="porcentaje" ><p id="porcentaje1"></p></div>
     <div class="aciertos" ><p id="aciertos1"></p></div>
     <div class="intentos" ><p id="intentos1"></p></div>

     <div class="ranking" ><p id="ranking1"></p></div>


</div>

<div class="cell" id="game-container">
     <div class="mensaje"><p> <span id="mensaje"></span></p></div>

</div>

<div class="cell" id="cont-jugador2">
     <h1 id="ganador2"></h1>

     <h2 id="jugador2"> </h2>
     <div class="mensaje"><p> <span id="mensaje2"></span></p></div>
     <div class="porcentaje"><p id="porcentaje2"></p></div>
     <div class="aciertos" ><p id="aciertos1"></p></div>
     <div class="intentos" ><p id="intentos1"></p></div>

     <div class="ranking" ><p id="ranking2"></p></div>

</div>

<div class="cell"></div> <!-- fila 3 -->
<div class="cell" id="info"> <a href="../login/login.php" class="btn">IR AL INICIO</a>
<!-- <a href="../lobby/lobby.php?j1=<?php echo urlencode($_SESSION['j1']); ?>&j2=<?php echo urlencode($_SESSION['j2']); ?>" class="btn">REVANCHA</a> -->


</div>
<div class="cell"></div>
</div>
</body>
</html>