
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
<div class="header">
    <div class="left"></div>
    <div><h1 class="titulo">MEMORY GAME</h1></div>
    <div class="right"> <button onclick="irARanking()" style="border: none; background: none;">
  <img src="../docs\iconos\star" title="Ranking" class="iconos">
</button></div>
  </div>
<div class="grid-3x3">
<div class="cell"></div> <!-- fila 1 -->
<div class="cell"><div class="tiempo" id="cronometro"></div></div>
<div class="cell"></div>

<div class="cell" id="cont-jugador1">
     <h1 id="ganador1"></h1>
     <h2 id="jugador1"> </h2>
     <div class="puntaje" ><p id="puntaje1"></p></div>
     <div class="porcentaje" ><p id="porcentaje1"></p></div>
     <div class="mensaje"><p> <span id="mensaje1"></span></p></div>
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
     <div class="puntaje" ><p id="puntaje2"></p></div>

     <div class="porcentaje"><p id="porcentaje2"></p></div>
     <div class="mensaje"><p> <span id="mensaje2"></span></p></div>
     <div class="aciertos" ><p id="aciertos2"></p></div>
     <div class="intentos" ><p id="intentos1"></p></div>

     <div class="ranking" ><p id="ranking2"></p></div>

</div>

<div class="cell">
     <div class="mje" ><p id="mje1"></p></div>


</div> <!-- fila 3 -->
<div class="cell" id="info"> <a href="../login/login.php" class="btn">IR AL INICIO</a>
<a href="../turns/turno.php" class="btn">REVANCHA</a>


</div>
<div class="cell">

     <div class="mje" ><p id="mje2"></p></div>

</div>
</div>
</body>
</html>