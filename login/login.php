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
     <script src="login.js" defer></script>
</head>
<body>
     <section class="logins">
     <div class="login-box">
     <div class="crown">👑</div>
     <h2>PLAYER ONE</h2>
     <div class="ingresoData">
     <p>¿Listo para dominar?</p>
     <form action="juego.php" method="post">
          <input type="text" id="usuario1" name="usuario1" placeholder="Nombre de usuario" required>
          <input type="password" name="password1" placeholder="Contraseña" required>
          <button id="inicio1" type="submit">ENTRAR AL JUEGO</button>
     </form>
     <a href="registro.html">¿No tenés cuenta? Registrate</a>
</div>
     <p class="logueado" > ✅ Ya casi estamos! Espera que tu compañero ingrese</p>

     <p name="info" ></p>
     </div>

     <div class="login-box">
     <div class="crown">👑</div>
     <h2>PLAYER TWO</h2>
     <div class="ingresoData">
     <p>¿Listo para dominar?</p>
     <form action="juego.php" method="post">
          <input type="text" id="usuario2 "name="usuario2" placeholder="Nombre de usuario" required>
          <input type="password" name="password2" placeholder="Contraseña" required>
          <button id="inicio2" type="submit">ENTRAR AL JUEGO</button>
     </form>
     <a href="registro.html">¿No tenés cuenta? Registrate</a>
</div>
     <p name="info" ></p>
     <p class="logueado" > ✅ Ya casi estamos! Espera que tu compañero ingrese</p>

     </div>
</section>

<div class="register-box">
     <div class="emoji">📝</div>
     <h2>REGISTRATE</h2>
     <p>¡Unite a la partida!</p>
     <form action="procesar_registro.php" method="post">
          <input type="text" name="usuario" placeholder="Nombre de usuario" required>
          <input type="password" name="password" placeholder="Contraseña" required>
          <input type="date" name="fecha_nacimiento" required>
          <input type="email" name="email" placeholder="Correo electrónico" required>
          <button id="registreUsuario" type="submit">REGISTRARME ✅</button>
     </form>
     <a href="login.html">¿Ya tenés cuenta? Iniciá sesión</a>
     <p class="logueado" > ✅ Ya casi estamos! Espera que tu compañero ingrese</p>
     
</div>
</body>
</html>