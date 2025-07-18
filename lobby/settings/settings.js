window.onload = function () {
     settings = {
          cartas: "8",
          tipo: "argentina",
          tiempo: "5 min"
     }
     document.getElementById("btnIniciar").addEventListener("click", dirigir);
}

function selectOption(element, categoria, texto) {
     const box = document.getElementById(`${categoria}-box`);
     const opciones = box.querySelectorAll(".option");

     // Quita la clase 'selected' de todos
     opciones.forEach(opt => opt.classList.remove("selected"));

     // Agrega la clase 'selected' al clickeado
     element.classList.add("selected");

     console.log(element);
     // Actualiza el resumen
     var resumen = {
          cartas: document.getElementById("resumen-cartas"),
          tipo: document.getElementById("resumen-tipo"),
          tiempo: document.getElementById("resumen-tiempo")
     };

     switch (categoria) {
          case "tiempo":
               switch (texto) {
                    case "0":
                         resumen[categoria].innerText = "sin limite";
                         break;
                    case "5":
                         resumen[categoria].innerText = "5 min";
                         break;
                    case "10":
                         resumen[categoria].innerText = "10 min";
                         break;
                    case "20":
                         resumen[categoria].innerText = "20 min";
                         break;
                    default:
                         resumen[categoria].innerText = texto;
               }
               break;
          default:
               resumen[categoria].innerText = texto;
     }

     settings[categoria] = texto;
}

function dirigir() {
     const { cartas, tipo, tiempo } = settings;

     const req = new XMLHttpRequest()
     req.open('POST', '../../game/game.php', true)
     req.onreadystatechange = () => {
          if (req.readyState == 4 && req.status == 200) {
               setTimeout(() => {
                    window.location.href = "../../game/game.php";
               }, 500)
          }
     }
     req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
     req.send(`carta=${cartas}&tipo=${tipo}&tiempo=${tiempo}`)
}