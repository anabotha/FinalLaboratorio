<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Memory Game</title>
     <link rel="stylesheet" href="./turno.css">
     <script src="./turno.js" defer></script>
</head>
<body>
     <?php
     function getCookiePHP($nombre) {
     return isset($_COOKIE[$nombre]) ? $_COOKIE[$nombre] : null;
}

     ?>
     <div class="icono">🎲</div>
<h1>DECIDIR TURNO</h1>
<p class="subtitulo">¡Que la suerte decida quién comienza!</p>

<div class="turno-container">
<!-- Jugador 1 -->
<div class="jugador-box">
     <div class="icono">👑</div>
     <h2><?php
      $nombre = getCookiePHP(1);
      echo strtoupper($nombre);
     ?></h2>
     <div class="dado" id="dado1">?</div>
     <button class="btn" onclick="tirarDado(1)">TIRAR DADO</button>
</div>

<div class="vs-circle">VS</div>

<!-- Jugador 2 -->
<div class="jugador-box">
     <div class="icono">⚔</div>
     <h2><?php
                    
     $nombre =getCookiePHP(2);
     echo strtoupper($nombre);
     ?></h2>
     <div class="dado" id="dado2">?</div>
     <button class="btn" onclick="tirarDado(2)">TIRAR DADO</button>
</div>
</div>

<div class="resultado" id="resultado"></div>

<div class="footer">
Cada jugador debe tirar su dado para decidir quién comienza<br>
El jugador con el número más alto tendrá el primer turno
</div>
</body>
</html>