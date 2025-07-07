
let tiradas = [0, 0];

function tirarDado(jugador){
     const valor = Math.floor(Math.random() * 6) + 1;
     console.log(valor+" valor");
     document.getElementById(`dado${jugador}`).innerText = valor;
     tiradas[jugador - 1] = valor;
          var empate=true;
     if((tiradas[0] !== 0 && tiradas[1] !== 0 )&& empate!=false ){
          //document.getElementById("turno-container").style.display=none;
          resu=document.getElementById("resultado");
          var resultado="";
          var botones=document.querySelectorAll(".btn");
          
               if (tiradas[0] > tiradas[1]) {
               resultado = "🎉 ¡JUGADOR 1 comienza!";
                    empate=false;
               } else if (tiradas[1] > tiradas[0]) {
                    resultado = "🎉 ¡JUGADOR 2 comienza!";
                    empate=false;
               } else {
                    resultado = "🤝 ¡Empate! Vuelvan a tirar.";
                    empate=true;
                    tiradas = [0, 0];
               }
     }
     if(empate==false){
          botones.forEach(b => b.style.display = "none");
          resu.innerText=resultado;
          btn=document.createElement("button");
          btn.innerHTML="SEGUIR";
          btn.className="btnResultado";
          resu.appendChild(btn);
          btn.addEventListener("click",pasarALobby);
     }
}


function pasarALobby(){
     console.log("turnos");
     window.location.href = "..//game/game.php"



}