<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <link rel="stylesheet" href="./settings.css">
     <script src="./settings.js" defer></script>
</head>
<body>
     <h2>CONFIGURACIÓN DE PARTIDA</h2>
     <p>Personalizá tu experiencia de juego</p>

     <div class="config-container">
     <!-- CANTIDAD -->
     <div class="config-box" id="cartas-box">
          <h3>CANTIDAD DE CARTAS</h3>
          <div class="option selected" onclick="selectOption(this, 'cartas', '8 Cartas - Fácil')">8 Cartas (Fácil)</div>
          <div class="option" onclick="selectOption(this, 'cartas', '16 Cartas - Medio')">16 Cartas (Medio)</div>
          <div class="option" onclick="selectOption(this, 'cartas', '32 Cartas - Difícil')">32 Cartas (Difícil)</div>
     </div>

     <!-- TIPO -->
     <div class="config-box" id="tipo-box">
          <h3>TIPO DE CARTAS</h3>
          <div class="option selected" onclick="selectOption(this, 'tipo', 'argentina')">Argentina</div>
          <div class="option" onclick="selectOption(this, 'tipo', 'poker')">Poker</div>
          <div class="option" onclick="selectOption(this, 'tipo', 'snoopy')">Snoopy</div>
          <div class="option" onclick="selectOption(this, 'tipo', 'avion')">aviones</div>
     </div>

     <!-- TIEMPO -->
     <div class="config-box" id="tiempo-box">
          <h3>TIEMPO LÍMITE</h3>
          <div class="option selected" onclick="selectOption(this, 'tiempo', '5')">5 min</div>
          <div class="option" onclick="selectOption(this, 'tiempo', '10')">10 min</div>
          <div class="option" onclick="selectOption(this, 'tiempo', '20')">20 min</div>
          <div class="option" onclick="selectOption(this, 'tiempo', '1')">Sin límite</div>
     </div>
     </div>

     <!-- RESUMEN -->
     <div class="summary" id="resumen">
     <div>
          <h4>CARTAS</h4>
          <p id="resumen-cartas"> 
               8 Cartas (Fácil)

          </p>
     </div>
     <div>
          <h4>TIPO</h4>
          <p id="resumen-tipo">Números</p>
          
     </div>
     <div>
          <h4>TIEMPO</h4>
          <p id="resumen-tiempo">5 min</p>
     </div>
     </div>

     <!-- BOTÓN -->
     <button class="start-button" id="btnIniciar"> ▶ INICIAR PARTIDA</button>
     </body>
     </html>
