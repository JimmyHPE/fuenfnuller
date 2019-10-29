function getListe(){
  //Eingabe aus der suchleiste entgegennehmen
  var slEingabe = document.getElementById('suche').value;
  //url aus id der suchleiste zusammenbauen
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + slEingabe.toString();

  if (document.getElementById(slEingabe) == null) {
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
        console.log(listeJson);
        //HTML ELEMENT BAUEN und Item values einfügen
        buildListe(listeJson._id, listeJson.name, listeJson.items);
    }
  };

  xhttp.send();
  }
  else {
  alert("die Liste ist schon offen!")
}
}

function addListenelement(listId){
  //URL für Request zusammenbauen
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString() + "/items";

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
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString() + "/items/" + itemId.toString();

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
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString() + "/items/" + itemId.toString();

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
        '<li class="itemListe" id="' + itemId + '"><input class="löschenKnopfListe" type="button" value="Löschen" onclick="removeListenelement('
        + "'" + ulList.id + "','" + itemId + "'" + ')"><input class="checkboxListe" type="checkbox" id="'+ testIdCheckbox +'" onclick="checkListenelement('
        + "'" + ulList.id + "','" + itemId + "','" + testIdCheckbox + "'" +')" checked><input class="itemTextfeldListe" type="text" value=' + '"' + itemName + '"'+ '></input></input></input></li>';
        console.log(itemName);
      } else {
        stringsToInsert[i] =
        '<li class="itemListe" id="' + itemId + '"><input class="löschenKnopfListe" type="button" value="Löschen" onclick="removeListenelement('
        + "'" + ulList.id + "','" + itemId + "'" + ')"><input class="checkboxListe" type="checkbox" id="'+ testIdCheckbox +'" onclick="checkListenelement('
        + "'" + ulList.id + "','" + itemId + "','" + testIdCheckbox + "'" +')"><input class="itemTextfeldListe" type="text" value=' + '"' + itemName + '"'+ '></input></input></input></li>';
      }

    }

    //HTML element für Ganze Liste basteln
    var elementeInUl = '<h1 class="h1Liste" id="' + listId + '">' + listName + '</h1><form class="formEinsListe" action="#" method="post"><fieldset class="fieldsetListe">';
    var eingabeEid = ulList.id.toString() + 'eid';

    for (let j = 0; j < stringsToInsert.length; j++){

      //Items dem gesamten String anhängen
      elementeInUl += stringsToInsert[j];

    }
    //Endstück den gesamten String anhängen
    elementeInUl += '</fieldset></form><form class="formZweiListe" action="#" method="post"><input class="hinzufuegenTextfeldListe" type="text" name="Element hinzufügen" value="" placeholder="Item hinzufügen" id="' +
    eingabeEid + '"></input><input class="hinzufuegenKnopfListe" type="button" name="submit" value="Hinzufügen" onclick="addListenelement(' + "'" + listId + "'" + ')"></form>';

    //inner HTML von ul
    console.log(elementeInUl);
    ulList.innerHTML = elementeInUl;

    //ul der Seite anhängen
    document.body.appendChild(ulList);

}

function getListeAktuell(listId){

  //Alte Liste Löschen
  var element = document.getElementById(listId);
  element.parentNode.removeChild(element);

  //url aus id der suchleiste zusammenbauen
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString();

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
