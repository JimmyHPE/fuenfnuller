const baseUrl = "https://shopping-lists-api.herokuapp.com/api/v1/lists/"; //Wird für jeden Request benötigt
const apiKey = "d8a323f68873a9b1d425c0cf5f9ee733"; //Key für private Anfragen
var repeater; //für das Dropdown Menü
var myVar = setInterval(myTimer, 1000); //Timer für die Audiospur
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
  xhttp.setRequestHeader("Authorization", apiKey);
  xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {

      //Wenn die Anfrage erfolgreich ist
      if(xhttp.readyState == 4 && xhttp.status == 200) {

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
  xhttp.setRequestHeader("Authorization", apiKey);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function() {

      //Wenn die Anfrage erfolgreich ist
      if(xhttp.readyState == 4 && xhttp.status == 200) {

          //neue, aktuelle Liste anfordern
          getListeAktuell(listId);

        }
      };

  xhttp.send();

}

//Diese Funktion wird durch das Abhaken einer Liste ausgelöst
function checkListenelement(listId, itemId, checkboxId){

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

  //Abschicken
  xhttp.send(JSON.stringify(jsonObject));
}

//In dieser Funktion wird ein HTML-Konstrukt dynamisch mit Listendaten gebaut.
function buildListe(listId, listName, listItems){

  //ul-Element erzeugen
  var ulList = document.createElement('ul');

  //ul-Element entsprechende id und Klasse geben
  ulList.id = listId;
  ulList.class = "listeUl";

  //Strings mit HTML Code der Items erzeugen, welche später als innerHTML von der ul gesetzt werden.
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
        '<li class="itemListe" id="' + itemId + '"><input class="checkboxListe" title="Erledigt" type="checkbox" id="'
        + testIdCheckbox +'" onclick="checkListenelement(' + "'" + ulList.id + "','" + itemId + "','" + testIdCheckbox
        + "'" +')" checked></input><input class="itemTextfeldListe" type="text" value=' + '"' + itemName + '"'
        + ' readonly></input><button class="ItemLoeschenKnopf" type="button" value="Item löschen" onclick="removeListenelement('
        + "'" + ulList.id + "','" + itemId + "'" + ')"><img class="garbageIcon" title="Löschen" src="images/delete.png" width="25px" height="25px"></button></li>';
      } else {
        stringsToInsert[i] =
        '<li class="itemListe" id="' + itemId + '"><input class="checkboxListe" title="Nicht erledigt" type="checkbox" id="'
        + testIdCheckbox +'" onclick="checkListenelement(' + "'" + ulList.id + "','" + itemId + "','" + testIdCheckbox + "'"
        +')"></input><input class="itemTextfeldListe" type="text" value=' + '"' + itemName + '"'
        + ' readonly></input><button class="ItemLoeschenKnopf" type="button" value="Item löschen" onclick="removeListenelement('
        + "'" + ulList.id + "','" + itemId + "'"
        + ')"><img class="garbageIcon" title="Löschen" src="images/delete.png" width="25px" height="25px"></button></li>';
      }

    }

    //HTML element für Ganze Liste basteln
    var elementeInUl = '<div class="listDiv"><h1 class="h1Liste" id="' + listId + '">'
                      + listName + '</h1><form class="formEinsListe" action="#" method="post"><fieldset class="fieldsetListe">';
    var eingabeEid = ulList.id.toString() + 'eid';

    //HTML code der einzelnen Items hinzufügen
    for (let j = 0; j < stringsToInsert.length; j++){

      elementeInUl += stringsToInsert[j];
    }

    //Endstück den gesamten String anhängen
    elementeInUl += '</fieldset></form><form class="formZweiListe" id="formZweiListe"><input class="hinzufuegenTextfeldListe" type="text" name="Element hinzufügen" autocomplete="off" placeholder="Neues Item hinzufügen..." id="' +
    eingabeEid + '"></input><button class="addButton" title="Item hinzufügen" id="addItemBtn" type="button" name="submit" onclick="addListenelement(' + "'" + listId + "'" + ')"><img class="addIcon2" src="images/addIcon.png" width="38px" height="38px"></img></button></form></div>';

    //inner HTML von ul
    ulList.innerHTML = elementeInUl;

    //Alte liste entfernen, wenn vorhanden
    for(let i = 0; i < listenInfos.length; i++){

      if (document.getElementById(listenInfos[i]) != null) {

        var element = document.getElementById(listenInfos[i]);
        element.parentNode.removeChild(element);
      }
    }

    //Liste der Seite anhängen
    document.body.appendChild(ulList);

}

//Funktion, um aktualisierte Liste zu erhalten (in etwa nach Item-Löschung)
function getListeAktuell(listId){

  //Liste von der Seite entfernen, falls offen & vorhanden
  for(let i = 0; i<listenInfos.length; i++){

    if (document.getElementById(listenInfos[i]._id) != null) {

      var element = document.getElementById(listenInfos[i]._id);
      element.parentNode.removeChild(element);
    }
  }

  //url für die Anfrage zusammenbauen
  var url = baseUrl + listId.toString();

  //GET Request
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Authorization", apiKey);
  xhttp.setRequestHeader("Accept", "application/json");

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        //JSON Objekt parsen
        var listeJson = JSON.parse(this.responseText);

        //Empfangene Daten mitgeben und Liste bauen
        buildListe(listeJson._id, listeJson.name, listeJson.items);
    }
  };

  xhttp.send();

}

//On hover ausgelöst - frägt live-Daten für das Dropdown-Menü an
function getListenInfos(){

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", baseUrl, true);
  xhttp.setRequestHeader("Authorization", apiKey);

  xhttp.onreadystatechange = function() {

    //wenn request erfolgreich ist
    if (this.readyState == 4 && this.status == 200) {
        //JSON Objekt parsen
        listenInfos = JSON.parse(this.responseText);

        //Dropdown Menü mit empfangenen Daten bauen
        buildListenDropdown(listenInfos);
    }
    };

    xhttp.send();
}

function buildListenDropdown(listenInfos){

  var kompletterString = '';
  var einzufuegendesHtml = [];

  //Wenn keine Liste existiert oder das Backend keine liefert, Dropdown wiefolgt befüllen:
  if (listenInfos.length == 0) {
    kompletterString = '<a class="aListenName">Keine Listen vorhanden</a>'
  }

  //Für jede vorhandene Liste wird mit dessen Daten ein HTML Konstrukt gebaut, welches im Dropdown angezeigt wird.
  for (let i = 0; i < listenInfos.length; i++){

    einzufuegendesHtml[i] = '<a class="aListenName" onclick="getListeAktuell('+ "'" + listenInfos[i]._id + "'" +')">'
                            + listenInfos[i].name +'<button class="ListeLoeschenKnopf" title="Liste löschen" onclick="deleteListe('+
                            "'" + listenInfos[i]._id + "'" + ')"><img class="loeschenBild" src="images/delete.png" width="18px" height="18px"></img></button></a>';
  }

  //HTML aller Listen zusammenfügen
  for (var j = 0; j < einzufuegendesHtml.length; j++) {
    kompletterString += einzufuegendesHtml[j];
  }

  //HTML Konstrukt einfuegen
  document.getElementById('dropdown-content').innerHTML = kompletterString;
}

//Diese Funktion löscht eine Liste unwiederruflich
function deleteListe(listenId){

  //url zusammenbauen
  var url = baseUrl + listenId;

  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader("Authorization", apiKey);
  xhttp.onreadystatechange = function() {

    //Wenn Anfrage erfolgreich ist
    if (this.readyState == 4 && this.status == 200) {

      alert('Diese Liste wurde gelöscht')
      //Alte Liste Löschen, wenn offen
      if (document.getElementById(listenId) != null) {

        var element = document.getElementById(listenId);
        element.parentNode.removeChild(element);
      }
    }
  };
  xhttp.send();
}

//Liste wird durch Eingabefeld erzeugt
function createListe(){

  //Inputfeld nach Listennamen auslesen
  var listName = document.getElementById('add').value.toString();

  var jsonObject = {
    "name" : listName
  }

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", baseUrl, true);
  xhttp.setRequestHeader("Authorization", apiKey);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function() {

      //Wenn Anfrage erfolgreich ist
      if(xhttp.readyState == 4 && xhttp.status == 200) {

          //Bestätigung ausgeben
          alert("Liste erstellt");

          //Inputfeld leeren
          document.getElementById('add').value = '';
        }
      };

  xhttp.send(JSON.stringify(jsonObject));
}

//*Audiofeld Funktion
function myTimer() {
  if (document.getElementById("playAudio") != null) {
    document.getElementById("playAudio").play();
  }
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
