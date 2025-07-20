<?php
session_start(); 
if( isset($_POST['1'],$_POST['2'])){
  $_SESSION['j1']=$_POST['1'];
  $_SESSION['j2']=$_POST['2'];  
header('Location:./');
exit();
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
<script>
  const j1='<?php echo $_SESSION['j1']?>';
  const j2='<?php echo $_SESSION['j2']?>';
</script>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Memory Game</title>
<script src="lobby.js" defer></script>
<link rel="stylesheet" href="./lobby.css">
    <script src="../utils/cookies.js" defer></script>
    <script src="../utils/storage.js" defer></script>
</head>
<body>

     <h2></h2>
     <div id="titulo" class="titulo"></div>

<div class="infoLobby">
     <div id="ultimaPartida"></div>
     <div id="jugador1"></div>
     <div id="jugador2"></div>
</div>
     <div id="btn" class="btn"></div>

</body>
</html>