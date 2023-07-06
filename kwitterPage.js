const firebaseConfig={
      apiKey: "AIzaSyAky6cO6ZS06gaLC1NliVqTsuBBdU-7rf4",
      authDomain: "kwitter-df354.firebaseapp.com",
      databaseURL: "https://kwitter-df354-default-rtdb.firebaseio.com",
      projectId: "kwitter-df354",
      storageBucket: "kwitter-df354.appspot.com",
      messagingSenderId: "1039905031376",
      appId: "1:1039905031376:web:8e88535339e4e8f09e0ad5"
      };
      
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

function enviar(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            nome: userName,
            msg: msg,
            like: 0
      })
    document.getElementById("msg").value="";
}

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código

//Mostrar informações no Console(inspecionar)
console.log(firebaseMessageId);
console.log(messageData);
//Armazenar as informações das Variaveis
var nome=messageData["nome"];
var like=messageData["like"];
var msg=messageData["msg"];
//Vizualizar as informações na Pagina
NameWithTag = "<h4>" + nome + "<ing class='user_tick' src='tick.png'></h4>";
MessageWithTag = "<h4 class='message_h4'>" + msg + "</h4>";

ButtonWithTag = "<button class='btn btn-primary' id="+ firebaseMessageId + " value="+ like +"onclick='UpdateLike(this.id)'>";
SpanWithTag= "<span class='glyphicon glyphicon-thumbs-up'> like: " + like + "</span></button><hr>";
row = NameWithTag + MessageWithTag + ButtonWithTag + SpanWithTag ;
document.getElementById("output").innerHTML += row;
//Fim do código
      } });  }); }
//função para Atualizar o numero de Likes.
function UpdateLike(messageId){
      console.log(" botão foi pressionado " + messageId);
      buttonId = messageId ;
      likeNumber = document.getElementById(buttonId).value;
      UpdateLike = Number(likeNumber) + 1;
      console.log(UpdateLike);

      firebase.database().ref(roomName).child(messageId).update({
            like: UpdateLike
      });
}

function logout(){
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
       window.location = "index.html";
    }
    getData();