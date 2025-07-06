<?php
if (isset($_GET['obj'])) {
     $json_string = $_GET['obj'];
    // Decodificar JSON
     $data = json_decode($json_string);
     $nick = htmlspecialchars($data->nickname);
     $fechaNac = htmlspecialchars($data->fechaNacimiento);
     $email=htmlspecialchars($data->email);

     if(!existeNombre($nick)&&!existeEmail($email)){
          creaUsuario($nick,$fechaNac,$email);
     }else if(!existeNombre($nick)){
          $json_temp = new stdClass(); 

          $json_temp->existe = true;//ya existe ese nombre
          $json_temp->explanation = "ya existia en la bd";
          $json_temp->nuevo=false;
          $json_temp->existeEmail = true;//ya existe ese mail

          echo json_encode($json_temp);
          
     }else {
          $json_temp = new stdClass(); 
          $json_temp->existe = false;//ya existe ese nombre
          $json_temp->explanation = "ya existe este mail en la bd";
          $json_temp->nuevo=false;
          $json_temp->existeEmail = true;//ya existe ese mail

          echo json_encode($json_temp);
     }
}

#chequea si el usuario existe y lo devuelve de lo cntrario, devuelve null

function existeNombre($nick) {
// Conexión segura a la base
$db = new mysqli("localhost", "root", "", "juegodb");
// Manejo de error de conexión
if ($db->connect_error) {
     die("Error de conexión: " . $db->connect_error);
}
$db->set_charset("utf8mb4");

// Limpiar el nickname recibido
$nick = trim($nick); // Quita espacios adelante/atrás
//la query
$result = $db->query("SELECT 1 FROM Usuarios WHERE nickname='$nick' LIMIT 1");
$existe = ($result->num_rows > 0);
return $existe;
}

function existeEmail($email) {
    // Conexión segura a la base
    $db = new mysqli("localhost", "root", "", "juegodb");

    // Manejo de error de conexión
    if ($db->connect_error) {
        die("Error de conexión: " . $db->connect_error);
    }

    $db->set_charset("utf8mb4");

    // Limpiar y validar el email
    $email = trim($email);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false; // No es un email válido
    }

    // Usar consulta preparada para evitar inyección SQL

$result = $db->query("SELECT 1 FROM Usuarios WHERE  email ='$email' LIMIT 1");
$existe = ($result->num_rows > 0);
return $existe;
}

function esMayorDe15($fechaNac) {
$fechaNacimiento = new DateTime($fechaNac);
$hoy = new DateTime();
$edad = $hoy->diff($fechaNacimiento)->y;
     return $edad >= 15;
}

function creaUsuario($nick,$fechaNac,$email){
     $json_temp = new stdClass(); 
if(esMayorDe15($fechaNac)){
$db=new mysqli("localhost","root","","juegodb") or die ("No es posible conectarse al servidor");
$db->set_charset("utf8mb4");
$insert="INSERT INTO Usuarios (
     nickname, fechaNacimiento,
     PartidasJugadas, PartidasGanadas, email
     ) VALUES ('$nick', '$fechaNac',0, 0, '$email'
     );";
$result = $db->query($insert);

     if ($result->affected_rows() > 0) {
     $json_temp->existe = true;
     $json_temp->nuevo=true;
     $json_temp->existeEmail = true;//ya existe ese mail

     } else {
     $json_temp->existe = false;
          $json_temp->menor = false;

     }
}else {
     $json_temp->existe = false;
     $json_temp->menor = true;
          $json_temp->existeEmail = false;//ya existe ese mail

     }
$myJson=json_encode($json_temp);
     echo $myJson;
}

?>