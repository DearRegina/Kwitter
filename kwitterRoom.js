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

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;

 firebase.database().ref("/").child(roomName).update({
 purpose : "adicionar nome da sala"
 });

 localStorage.setItem("roomName", roomName);

 window.location = "kwitter_page.html";
}
function getData() { firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout(){
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
   window.location = "index.html";
}