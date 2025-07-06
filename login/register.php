<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <script src="register.js" defer></script>
          <link rel="stylesheet" href="./register.css">


</head>
<body>
     
<div class="register-box">
     <div class="emoji">📝</div>
     <h2>REGISTRATE</h2>
     <p>¡Unite a la partida!</p>
     <form action="login.php" method="post">
          <input id="usuario" type="text" name="usuario" placeholder="Nombre de usuario" required>
          <input id="password" type="password" name="password" placeholder="Contraseña" required>
          <input id="fecha_nacimiento" type="date" name="fecha_nacimiento" required>
          <input id="email" type="email" name="email" placeholder="Correo electrónico" required>
          <button id="registreUsuario" type="submit">REGISTRARME ✅</button>
     </form>
     <a href="login.php">¿Ya tenés cuenta? Iniciá sesión</a>
     
     
</div>
</body>
</html>