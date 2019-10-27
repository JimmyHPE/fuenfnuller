function getListe(){
<<<<<<< HEAD
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/api/v1/lists/5db42c8ab29b350017f9d4fb");
  xhttp.setRequestHeader(Host, 'https://shopping-lists-api.herokuapp.com/'');
  xhttp.setRequestHeader(Authorization, "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "filename", true);
=======
  //Eingabe aus der suchleiste entgegennehmen
  var slEingabe = document.getElementById('suche').value;
  //url aus id der suchleiste zusammenbauen
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + slEingabe.toString();

  //http Request
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Accept", "application/json");

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //JSON Objekt parsen
        console.log(this.responseText);
        var listeJson = JSON.parse(this.responseText);

        //HTML ELEMENT BAUEN und Item values einfügen
    }
  };

>>>>>>> 2d9edae39700581b2eb08e6ddeaa0305c0a37bc6
  xhttp.send();
}

function addListenelement(listId){

  //var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/5db42c8ab29b350017f9d4fb/items";
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString() + "/items";

  var neuesItem = document.getElementById('addElement').value.toString();
  var neuesItemJson = {
    "name": neuesItem
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {//Call a function when the state changes.
      if(xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);

          //liste neu builden
        }
      };
  xhttp.send(JSON.stringify(neuesItemJson));
  //das Input Feld zum Einfügen wird geleert
  document.getElementById('addElement').value = '';

}

function removeListenelement(listId, itemId){
  //Neben jedem Listenelement ist ein Mülltonnen-icon
  //Es löscht das List-Item
  //und getted die aktualisierte Liste
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString() + "/items/" + itemId.toString();
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function() {//Call a function when the state changes.
      if(xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);

          //liste neu builden
        }
      };

  xhttp.send();
}


function checkListenelement(listId, itemId, checkboxId){
  //Diese Funktion wird durch das Abhaken einer Liste ausgelöst
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString() + "/items/" + itemId.toString();
  var status;
  if (document.getElementById(checkboxId).checked == true){
    status =  true;
  }
  else {
    status =  false;
  }
  var jsonObject = {
    "bought" : status
  }
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function() {//Call a function when the state changes.
      if(xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);

          //liste neu builden
        }
      };

  xhttp.send(JSON.stringify(jsonObject));
  //Die Liste Inhalte der Liste werden zu einem JSON String zusammengebaut

  //POST Funktion
}

function buildListe(listId, listName, listItems){

  for (let i = 0; i < listItems.length; i++){

  }

}
