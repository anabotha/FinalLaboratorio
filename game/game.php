<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Memory Game</title>
  <link rel="stylesheet" href="./game.css" />
  <script src="game.js" defer></script>
</head>
<body>
  <h1>MEMORY GAME</h1>

  <div class="grid-3x3">
    <div class="cell"></div> <!-- fila 1 -->
    <div class="cell"></div>
    <div class="cell"></div>

    <div class="cell" id="cont-jugador1">
      <h2 id="jugador1">Jugador 1</h2>
      <div class="intentos"><p>Intentos: <span id="intentos-1"></span></p></div>
      <div class="aciertos"><p>Aciertos: <span id="aciertos-1"></span></p></div>
      <div class="turno" ><p id="turno1"></p></div>

    </div>

    <div class="cell" id="game-container"></div>

    <div class="cell" id="cont-jugador2">
      <h2 id="jugador2">Jugador 2</h2>
      <div class="intentos"><p>Intentos: <span id="intentos-2"></span></p></div>
      <div class="aciertos"><p>Aciertos: <span id="aciertos-2"></span></p></div>
      <div class="turno"><p id="turno2"></p></div>

    </div>

    <div class="cell"></div> <!-- fila 3 -->
    <div class="cell" id="info"></div>
    <div class="cell"></div>
  </div>
</body>
</html>
