
let jugadores=["",""];
window.onload = function () {
     console.log("getters");
     deleteAllCookies();
     document.getElementById("inicio1").addEventListener("click", function (e) {
          e.preventDefault();
          buscaNombre(document.getElementById("usuario1").value,1,document.getElementById("password1").value);
     });
     document.getElementById("inicio2").addEventListener("click", function (e) {
          e.preventDefault();
          buscaNombre(document.getElementById("usuario2").value,2,document.getElementById("password2").value);

     });
}

function buscaNombre(usuario, jugador,contraseña) {
     console.log(usuario, jugador);

     let xhr = new XMLHttpRequest();

     xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
               let respuesta =JSON.parse(xhr.responseText);
               console.log(respuesta);
               gestionarRtas(respuesta); 
          }
     };

     console.log("usuario: " + usuario);
     xhr.open("GET", "buscaUsuario.php?nick=" + encodeURIComponent(usuario) + "&jugador=" + encodeURIComponent(jugador)+"&contraseña="+ encodeURIComponent(contraseña), true);
     xhr.send();
}

function finLogueo(){
     j1=getCookie('1');
     j2=getCookie('2');
     console.log(j1,j2);
if(j1&&j2){

const mensaje=document.getElementById("logueado1");
mensaje.style.display='none';
const mensaje2=document.getElementById("logueado2");
mensaje2.style.display='none';
     //pase a otra vista
     const btnLobby = document.createElement("button");
     btnLobby.textContent = "IR A LOBBY";
     btnLobby.id = "btnLobby";
     btnLobby.className="btnLobby";
     const body = document.getElementById("body");
     body.appendChild(btnLobby);
     btnLobby.addEventListener("click",irTurnos);//direcciona
     setTimeout(() => {
irTurnos();
}, 1000); 

}
}

function gestionarRtas(rta){
     let nroJug = rta.nroJug; 
     if(rta.existe && rta.enUso){
limpiarCampos(nroJug);
const p=document.getElementById("info"+nroJug);
          p.innerText="no podes jugar contra vos mismo";

}else if(rta.existe && !rta.enUso){
     if(rta.contra){
          const p=document.getElementById("info"+nroJug);
          p.innerText="";
          //setCookie(nroJug,rta.nickname,1);
          if(nroJug==1){
               index=0;
          }else{
               index=1;
          }
          jugadores[index]=rta.nickname;
          const ingreso=document.getElementById("ingresoData"+nroJug);
          ingreso.style.display ='none'; 
          const mensaje=document.getElementById("logueado"+nroJug);
          mensaje.style.display='flex';
          finLogueo();
     }else{
          limpiarCampos(nroJug);
          const p=document.getElementById("info"+nroJug);
          p.innerText="Contraseña incorrecta";
     }
}
     else if(!rta.existe){
          limpiarCampos(nroJug);
     const p=document.getElementById("info"+nroJug);
          p.innerText=" No tenes usuario? Registrate!";
}
}

function irTurnos(){//direcciona a la siguiente vista
     //window.location.href = "../lobby/lobby.php";
//window.location.href = "../lobby/lobby.php?refrescar=" + new Date().getTime();

     const req = new XMLHttpRequest()
     req.open('POST','../lobby/lobby.php',true)
     req.onreadystatechange = ()=>{
          if(req.readyState ==4 && req.status == 200){
               setTimeout(()=>{
                    window.location.href = "../lobby/lobby.php";
               },500)
          }
     }
     req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     console.log("Array de iraturnos"+jugadores[0]+" "+jugadores[1]);
     req.send(`1=${jugadores[0]}&2=${jugadores[1]}`)
     //etCookie("settings", JSON.stringify(settings),1);
     //setLocal("settings", JSON.stringify(settings));

}

function limpiarCampos(jugador) {
// Determinar los IDs según el jugador
const usuario = document.getElementById("usuario" + jugador);
const password = document.getElementById("password" + jugador);
const info = document.getElementById("info" + jugador);

if (usuario) usuario.value = "";
if (password) password.value = "";
if (info) info.textContent = "";
}
function irARanking(){
     window.location.href="../ranking/ranking.php"
}