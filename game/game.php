
<?php
session_start(); 
include 'ranking.php';
if(isset($_POST['carta'],$_POST['tipo'],$_POST['tiempo'])){
  $_SESSION['tipo']=$_POST['tipo'];
  $_SESSION['tiempo']=$_POST['tiempo'];
  $_SESSION['cartas']=$_POST['carta'];
  
header('Location:./');
exit();
}

?>

<!DOCTYPE html>
<html lang="es">
  <head>
    <script>
  const settings={
    cartas:'<?php echo $_SESSION['cartas']?>',
    tipo:'<?php echo $_SESSION['tipo'] ?>',
    tiempo:'<?php echo $_SESSION['tiempo']?>'
  }
    const j1='<?php echo $_SESSION['j1']?>';
  const j2='<?php echo $_SESSION['j2']?>';
</script>

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Memory Game</title>
    <link rel="stylesheet" href="./game.css" />
</head>
<body>
  <div class="header">
    <div class="left"></div>
    <div><h1>MEMORY GAME</h1></div>
    <div class="right"> <button onclick="cerrarSesion()" style="border: none; background: none;">
  <img src="../docs\iconos\quit" title="Cerrar Sesion" class="iconos">
</button>

</div>
  </div>

  <div class="grid-3x3">
    <div class="cell"></div> <!-- fila 1 -->
    <div class="cell"><div class="tiempo" id="cronometro"></div></div>
    <div class="cell"></div>

    <div class="cell" id="cont-jugador1">
      <h2 id="jugador1">Jugador 1</h2>
      <div class="intentos"><p>Intentos: <span id="intentos-1"></span></p></div>
      <div class="aciertos"><p>Aciertos: <span id="aciertos-1"></span></p></div>
      <div class="turno" ><p id="turno1"></p></div>
      
        

      <button class="button" type='button' id="rendirj1"> Rendirse</button>
      
    </div>
    
    <div class="cell" id="game-container"></div>
    
    <div class="cell" id="cont-jugador2">
      <h2 id="jugador2">Jugador 2</h2>
      <div class="intentos"><p>Intentos: <span id="intentos-2"></span></p></div>
      <div class="aciertos"><p>Aciertos: <span id="aciertos-2"></span></p></div>
      <div class="turno"><p id="turno2"></p></div>
      <button class="button"type='button' id="rendirj2"> Rendirse</button>

    </div>

    <div class="cell"><div class="ranking">
  Ranking:
  <table>
    <?php 
    $ranking = getRanking(getCookiePHP(1));
    if (!empty($ranking)) { ?>
      <thead>
        <tr>
          <th>Puntos</th>
          <th>Porcentaje</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($ranking as $fila): ?>
          <tr>
            <td><?= htmlspecialchars($fila['puntaje']) ?></td>
            <td><?= htmlspecialchars($fila['porcentaje']) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    <?php } else { ?>
      <tbody>
        <tr>
          <td colspan="2">No hay datos de ranking aún</td>
        </tr>
      </tbody>
    <?php } ?>
  </table>
</div>
</div> <!-- fila 3 -->
    <div class="cell" id="info"></div>
    <div class="ranking">
  Ranking:
  <table>
    <?php 
    $ranking = getRanking(getCookiePHP(2));
    if (!empty($ranking)) { ?>
      <thead>
        <tr>
          <th>Puntos</th>
          <th>Porcentaje</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($ranking as $fila): ?>
          <tr>
            <td><?= htmlspecialchars($fila['puntaje']) ?></td>
            <td><?= htmlspecialchars($fila['porcentaje']) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    <?php } else { ?>
      <tbody>
        <tr>
          <td colspan="2">No hay datos de ranking aún</td>
        </tr>
      </tbody>
    <?php } ?>
  </table>
</div>
</div>
  </div>
    <script src="./game.js" defer></script>

</body>
</html>
<?php
function getCookiePHP($nombre) {
     return isset($_COOKIE[$nombre]) ? $_COOKIE[$nombre] : null;
}
?>