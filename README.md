# Final Laboratorio
Se propone desarrollar una aplicación web que permita a dos jugadores, en el menor número de intentos o tiempo posible, puedan igualar pares de una serie de n cartas que tengan el mismo valor, figura o motivo. La cantidad de cartas varía de acuerdo al nivel de dificultad del juego. los usuarios deben estar registrados en la aplicación e iniciar sesion en la aplicación del juego. Para el registro se debe solicitar nombre de usuario (no puede repetirse), contraseña, direccion de correo electronico y la fecha de nacimiento (debe ser mayor de 15 años).
Cuando los usuarios iniciaron sesion, la aplicación debe darle un mensjae de bienvenida en el que se incluira la fecha de la última partida entre ellos y quien fue el ganador. Si es la primera vez que juegan juntos, entonces se debe mostrar la cantidad de partidas ganadas, por cada uno de ellos, con otros jugadores.
El orden del turno de los jugadores, una vez que se hayan logueado y antes de comenzar la partida, se debe sortear. Para esto se puede utilizar como recurso un dado, el que saque el numero mayor, configurará las caracteristicas de la partida y comenzará primero.

**REQUISITOS A CUMPLIR:**

**Autenticación**

* Registro de usuarios (nombre de usuario único, contraseña, email y país).

* El usuario debe ser mayor de 15 años

* Inicio de sesión con validación de credenciales.

* Mensaje de bienvenida con historial entre los dos jugadores.

**Pre-Partida**

* Sorteo de turno con dado.

* El jugador con el número mayor configura:

  +  Cantidad de cartas (8, 16 o 32).

   + Tipo de cartas (mínimo 3 opciones).

   + Tiempo máximo (7, 15, 25 min o sin límite).


**Dinámica del Juego**

* Mostrar tablero con todas las cartas boca abajo.

* Visualización: Número de partida, aciertos, intentos, reloj, historial.

* Al seleccionar 2 cartas:

   - Si coinciden: quedan descubiertas.

   - Si no: se ocultan de nuevo.

* Turnos alternados; si se acierta se repite el turno.

* Límites de intentos según la dificultad (20/40/64)

**Consideraciones de Desarrollo**

- [ ] Buenas Prácticas: La aplicación sigue las buenas prácticas aprendidas en clase, utilizando estándares y lenguajes (HTML5, CSS, JavaScript, PHP, AJAX).

- [ ] Estructura de Archivos: Se implementan estructuras de archivos apropiadas.

- [ ] Paradigma Orientado a Objetos: El desarrollo sigue el paradigma orientado a objetos.

- [ ] Uso de Frameworks (Opcional): Si se utilizan frameworks, estos se basan en los lenguajes de programación cubiertos en la materia.

 - [ ] Resolución de Ambigüedades: Cualquier ambigüedad encontrada durante el desarrollo se aborda y resuelve claramente.

**Entregables**

- [ ] Código Fuente: Se incluye todo el código fuente de la aplicación.

- [ ] Manual de Usuario: Se proporciona un manual de usuario completo, incluyendo capturas de pantalla de la aplicación desarrollada.

- [ ] Guía de Instalación de Frameworks (si aplica): Si se utilizaron frameworks, se incluye una guía para instalar la aplicación desarrollada.

- [ ] Detalle de Páginas Principales: Se proporciona una lista detallada de las páginas web principales, incluyendo la función de cada una dentro de la aplicación.

- [ ] Resumen de Actividades: Se incluye un resumen de las actividades realizadas durante el desarrollo de la aplicación web.

- [ ] Script SQL de Base de Datos (si aplica): Si se utiliza una base de datos, se proporciona un script SQL que contiene todas las consultas para crear la base de datos y las tablas.

# Fecha de entrega: 
Sabado 26 de julio hasta las 15:00.
