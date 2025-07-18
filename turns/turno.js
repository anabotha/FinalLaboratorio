
let tiradas = [0, 0];

function tirarDado(jugador){
     const valor = Math.floor(Math.random() * 6) + 1;
     console.log(valor+" valor");
     document.getElementById(`dado${jugador}`).innerText = valor;
     tiradas[jugador - 1] = valor;
          var empate=true;
     if((tiradas[0] !== 0 && tiradas[1] !== 0 )&& empate!=false ){
     deleteCookie("inicia");
     deleteCookie("segundo");

          //document.getElementById("turno-container").style.display=none;
          resu=document.getElementById("resultado");
          var resultado="";
          var botones=document.querySelectorAll(".btn");
          
               if (tiradas[0] > tiradas[1]) {
                    const nombre=getCookie(1).toUpperCase();
                    resultado = "🎉 "+nombre+" COMIENZA!";
                    empate=false;
                    setCookie("inicia",getCookie(1),1); 
                    setCookie("segundo",getCookie(2),1); 
                    setLocal("inicia",getCookie(1));
                    setLocal("segundo",getCookie(2));
               } else if (tiradas[1] > tiradas[0]) {
                    const nombre=getCookie(2).toUpperCase();
                    resultado = "🎉 "+nombre+" COMIENZA!";
                    empate=false;
                    setCookie("inicia",getCookie(2),1);//ver si puede decir el nombre em vez de l jugaodr
                    setCookie("segundo",getCookie(1),1); 
                    setLocal("inicia",getCookie(2));
                    setLocal("segundo",getCookie(1));

               } else {
                    resultado = "🤝 ¡Empate! Vuelvan a tirar.";
                    empate=true;
                    tiradas = [0, 0];
          resu.innerText=resultado;

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
function setLocal(key, value) {
     try {
          localStorage.setItem(key, JSON.stringify(value));
     } catch (e) {
          console.error("Error al guardar en localStorage:", e);
     }
}

function pasarALobby(){
     console.log("turnos");
     window.location.href = "../lobby/settings/settings.php";

}
function setCookie(nombre, valor, dias) {
     const d = new Date();
     d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000)); // días → ms
     const expiracion = "expires=" + d.toUTCString();
     document.cookie = `${nombre}=${valor}; ${expiracion}; path=/`;
}

function getCookie(nombre) { //
     const nombreEQ = nombre + "=";
     const cookies = document.cookie.split(";");

     for (let i = 0; i < cookies.length; i++) {
          let c = cookies[i].trim();
          if (c.indexOf(nombreEQ) === 0) {
               return c.substring(nombreEQ.length);
          }
     }
     return null;
}

function deleteCookie(nombre) { 
     document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
