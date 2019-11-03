var baseUrl = "https://shopping-lists-api.herokuapp.com/api/v1/lists/"; //Wird für jeden Request benötigt
var repeater; //für das Dropdown Menü
var listenInfos;

function addListenelement(listId){
  //URL für Request zusammenbauen
  var url = baseUrl + listId.toString() + "/items";

  //ID von Eingabefeld nach Inhalt abfragen und in JSON packen
  var eingabeString = listId + 'eid';
  var neuesItem = document.getElementById(eingabeString).value.toString();
  var neuesItemJson = {
    "name": neuesItem
  };

  //POST Request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {//Call a function when the state changes.
      if(xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
          //neue, aktuelle Liste anfordern
          getListeAktuell(listId);
        }
      };
  xhttp.send(JSON.stringify(neuesItemJson));

  //das Input Feld zum Einfügen wird geleert
  document.getElementById(eingabeString).value = '';


}

function removeListenelement(listId, itemId){

  //URL bauen
  var url = baseUrl + listId.toString() + "/items/" + itemId.toString();

  //DELETE request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function() {//Call a function when the state changes.
      if(xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
          //neue, aktuelle Liste anfordern
          getListeAktuell(listId);

        }
      };

  xhttp.send();

}

function checkListenelement(listId, itemId, checkboxId){

  //Diese Funktion wird durch das Abhaken einer Liste ausgelöst

  //URL zusammenbauen
  var url = baseUrl + listId.toString() + "/items/" + itemId.toString();

  //Überprüfen, ob die Box abgehakt ist - Status entsprechend in JSON angeben
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

  //PUT request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function() {//Call a function when the state changes.
      if(xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };

  xhttp.send(JSON.stringify(jsonObject));
}

function buildListe(listId, listName, listItems){

  //In dieser Funktion wird ein HTML-Konstrukt dynamisch mit Listendaten gebaut.

  //ul-Element erzeugen
  var ulList = document.createElement('ul');

  //ul-Element entsprechende id und Klasse geben
  ulList.id = listId;
  ulList.class = "listeUl";

  //String mit HTML Code erzeugen, welches später als innerHTML von der ul gesetzt wird.
  var stringsToInsert = [];

    //HTML Elemente für jedes einzelne Item Basteln
    for (let i = 0; i < listItems.length; i++){

      //Item Daten
      var itemBought = listItems[i].bought;
      var itemId = listItems[i]._id;
      var itemName = listItems[i].name;
      var testIdCheckbox = ulList.id.toString() + i.toString();

      //abfragen, ob das Item abgecheckt sein muss oder nicht
      if(itemBought == true){
        stringsToInsert[i] =
        '<li class="itemListe" id="' + itemId + '"><input class="checkboxListe" type="checkbox" id="'+ testIdCheckbox +'" onclick="checkListenelement('
        + "'" + ulList.id + "','" + itemId + "','" + testIdCheckbox + "'" +')" checked></input><input class="itemTextfeldListe" type="text" value=' + '"' + itemName + '"'+ ' readonly></input><button class="ItemLoeschenKnopf" type="button" value="Löschen" onclick="removeListenelement('
        + "'" + ulList.id + "','" + itemId + "'" + ')"><img class="garbageIcon" src="delete.png" width="25px" height="25px"></button></li>';
        console.log(itemName);
      } else {
        stringsToInsert[i] =
        '<li class="itemListe" id="' + itemId + '"><input class="checkboxListe" type="checkbox" id="'+ testIdCheckbox +'" onclick="checkListenelement('
        + "'" + ulList.id + "','" + itemId + "','" + testIdCheckbox + "'" +')"></input><input class="itemTextfeldListe" type="text" value=' + '"' + itemName + '"'+ ' readonly></input><button class="ItemLoeschenKnopf" type="button" value="Löschen" onclick="removeListenelement('
        + "'" + ulList.id + "','" + itemId + "'" + ')"><img class="garbageIcon" src="delete.png" width="25px" height="25px"></button></li>';
      }

    }

    //HTML element für Ganze Liste basteln
    var elementeInUl = '<div class="listDiv"><h1 class="h1Liste" id="' + listId + '">' + listName + '</h1><form class="formEinsListe" action="#" method="post"><fieldset class="fieldsetListe">';
    var eingabeEid = ulList.id.toString() + 'eid';

    for (let j = 0; j < stringsToInsert.length; j++){

      //Items dem gesamten String anhängen
      elementeInUl += stringsToInsert[j];

    }
    //Endstück den gesamten String anhängen
    elementeInUl += '</fieldset></form><form class="formZweiListe" id="formZweiListe"><input class="hinzufuegenTextfeldListe" type="text" name="Element hinzufügen" autocomplete="off" placeholder="Item hinzufügen" id="' +
    eingabeEid + '"></input><button class="addButton" id="addItemBtn" type="button" name="submit" onclick="addListenelement(' + "'" + listId + "'" + ')"><img class="addIcon2" src="addIcon.png" width="38px" height="38px"></img></button><script>document.getElementById("formZweiListe").addEventListener("submit", function(eve) {eve.preventDefault();}, false);var inputZwei = document.getElementById('+ "'" + eingabeEid + "'" +');inputZwei.addEventListener("keyup", function(eventZwei) {if (eventZwei.keyCode === 13)' + '{document.getElementById("addItemBtn").click();}});</script></form></div>';



    
    //inner HTML von ul
    console.log(elementeInUl);
    ulList.innerHTML = elementeInUl;

    //Alte liste entfernen, wenn vorhanden
    for(let i = 0; i<listenInfos.length; i++){
      if (document.getElementById(listenInfos[i]) != null) {
        var element = document.getElementById(listenInfos[i]);
        element.parentNode.removeChild(element);
      }
    }

    //ul der Seite anhängen
    document.body.appendChild(ulList);

}

function getListeAktuell(listId){

  for(let i = 0; i<listenInfos.length; i++){
    if (document.getElementById(listenInfos[i]._id) != null) {
      var element = document.getElementById(listenInfos[i]._id);
      element.parentNode.removeChild(element);
    }
  }

  //url aus id der suchleiste zusammenbauen
  var url = baseUrl + listId.toString();

  //sichergehen, dass die Liste nicht aus unerklärlichen Gründen zwei Mal auf der Seite angezeigt wird
  if (document.getElementById(listId) == null) {

  //GET Request
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Accept", "application/json");

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //JSON Objekt parsen
        console.log(this.responseText);
        var listeJson = JSON.parse(this.responseText);
        console.log(listeJson);
        buildListe(listeJson._id, listeJson.name, listeJson.items);
    }
  };

  xhttp.send();
  }

  else {
  alert("die Liste ist schon offen!")
}

}

function getListenInfos(){
  //triggered on hover
  //GET alle Listen mit Name und id

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", baseUrl, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");

  xhttp.onreadystatechange = function() {

    //wenn request erfolgreich ist
    if (this.readyState == 4 && this.status == 200) {
        //JSON Objekt parsen
        listenInfos = JSON.parse(this.responseText);

        //HTML ELEMENT BAUEN und Item values einfügen
        buildListenDropdown(listenInfos);
    }
    };

    xhttp.send();
  //HTML a element erzeugen und appenden
}

function buildListenDropdown(listenInfos){

  var kompletterString = '';
  var einzufuegendesHtml = [];
  //HTML element BAUEN
  for (let i = 0; i < listenInfos.length; i++){
    listenId = listenInfos[i]._id;
    listenName = listenInfos[i].name;

    einzufuegendesHtml[i] = '<a class="aListenName" onclick="getListeAktuell('+ "'" + listenId + "'" +')">'+ listenName +'</a><button class="ListeLoeschenKnopf" onclick="deleteListe('+"'"+listenId+"'"+')"><img class="loeschenBild" src="delete.png" width="18px" height="18px"></img></button>';
  }

  for (var j = 0; j < einzufuegendesHtml.length; j++) {
    kompletterString += einzufuegendesHtml[j];
  }
  //HTML element einfuegen
  document.getElementById('dropdown-content').innerHTML = kompletterString;
}

function deleteListe(listenId){

  var url = baseUrl + listenId;
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  console.log(url);
  xhttp.onreadystatechange = function() {

    //wenn request erfolgreich ist
    if (this.readyState == 4 && this.status == 200) {

      //Alte Liste Löschen, wenn offen
      if (document.getElementById(listenId) != null) {
        var element = document.getElementById(listenId);
        element.parentNode.removeChild(element);
      }
    }
  }
  xhttp.send();
}

function createListe(){

  var listName = document.getElementById('add').value.toString();

  var jsonObject = {
    "name" : listName
  }

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", baseUrl, true);
  xhttp.setRequestHeader("Authorization", "d8a323f68873a9b1d425c0cf5f9ee733");
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function() {//Call a function when the state changes.
      if(xhttp.readyState == 4 && xhttp.status == 200) {
          alert("Liste erstellt");
          document.getElementById('add').value = '';
        }
      };

  xhttp.send(JSON.stringify(jsonObject));
}

var myVar = setInterval(myTimer, 1000);
 function myTimer() {
 document.getElementById("playAudio").play();
 } 
function audioPlaying() {
var myAudio = document.getElementById('playAudio');

if (myAudio.duration > 0 && !myAudio.paused) {
    clearInterval(myVar);
    document.getElementById("playAudio").pause();

} else {

    document.getElementById("playAudio").play();

}
} 