<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <link rel="stylesheet" href="./game.css">
<script src="game.js" defer></script>

</head>
<body>
<h1> Memory Game</h1>

     <div id="view-container" class="view-container">
     <div id="cont-jugador1" class="cont-jugador1">
          <h2 id="jugador1"></h2>
          <div id="intentos" class="intentos"><p>Intentos: <span id="intentos-1"></span></p></div>
          <div id="aciertos" class="aciertos"><p>Aciertos:<span id="aciertos-1"></span> </p></div>
     </div>
     <div id="game-container" class="game-container"> </div>
     <div id="cont-jugador2" class="cont-jugador2">
          <h2 id="jugador2"></h2>
          <div id="intentos" class="intentos"><p>Intentos: <span id="intentos-2"></span></p></div>
          <div id="aciertos" class="aciertos"><p>Aciertos:<span id="aciertos-2"></span> </p></div>
     </div>
</div>
<div> <p id="info" class="info"></p></div>
</body>
</html>