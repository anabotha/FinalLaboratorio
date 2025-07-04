
let tiradas = [0, 0];

function tirarDado(jugador){
     const valor = Math.floor(Math.random() * 6) + 1;
     console.log(valor+" valor");
     document.getElementById(`dado${jugador}`).innerText = valor;
     tiradas[jugador - 1] = valor;
     if(tiradas[0] !== 0 && tiradas[1] !== 0){
          //document.getElementById("turno-container").style.display=none;
          resu=document.getElementById("resultado");
          var resultado="";
          if (tiradas[0] > tiradas[1]) {
          resultado = "🎉 ¡JUGADOR 1 comienza!";
          } else if (tiradas[1] > tiradas[0]) {
               resultado = "🎉 ¡JUGADOR 2 comienza!";
          } else {
               resultado = "🤝 ¡Empate! Vuelvan a tirar.";
          }

          resu.innerText=resultado;
          btn=document.createElement("button");
          btn.innerHTML="seguir";
          btn.classList.add("btn");
          resu.appendChild(btn);
          btn.addEventListener("click",pasarATurnos);
     }
}


function pasarATurnos(){
     console.log("turnos");
}