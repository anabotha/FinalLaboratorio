<?php
#muestra login y registro.
?>
<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <link rel="stylesheet" href="./login.css">
</head>
<body id="body">
     <section class="logins">
          <div class="login-box">
     <div class="crown">👑</div>
     <h2>PLAYER ONE</h2>
     <div class="ingresoData1" id="ingresoData1">
     <p>¿Listo para dominar?</p>
     <form action="juego.php" method="post">
          <input type="text" id="usuario1" name="usuario1" placeholder="Nombre de usuario" required>
          <input type="password" id="password1"name="password1" placeholder="Contraseña" required>
          <button id="inicio1" type="button">ENTRAR AL JUEGO</button>
     </form>
     <a href="./register/register.php">¿No tenés cuenta? Registrate</a>
     <p id="info1" class="info"></p>

</div>
     <p class="logueado1" id="logueado1" > ✅ Ya casi estamos! Espera que tu compañero ingrese</p>

</div>

<div class="login-box">
     <div class="crown">👑</div>
     <h2>PLAYER TWO</h2>
     <div class="ingresoData2" id="ingresoData2">
          <p>¿Listo para dominar?</p>
     <form action="login.php" method="post">
          <input type="text" id="usuario2"name="usuario2" placeholder="Nombre de usuario" required>
          <input type="password" id="password2" name="password2" placeholder="Contraseña" required>
          <button id="inicio2" type="button">ENTRAR AL JUEGO</button>
     </form>
     <a href="register.php">¿No tenés cuenta? Registrate</a>
</div>
<p name="info" id="info2" class="info" ></p>
<p class="logueado2" id="logueado2" > ✅ Ya casi estamos! Espera que tu compañero ingrese</p>

</div>
</section>

</body>
<script src="login.js" defer></script>
</html>