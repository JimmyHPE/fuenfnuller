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
  //var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/5db42c8ab29b350017f9d4fb/items";
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString() + "/items";
  var eingabeString = listId + 'eid'
  console.log(eingabeString);
  console.log(document.getElementById(eingabeString));
  var neuesItem = document.getElementById(eingabeString).value.toString();
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
  document.getElementById(eingabeString).value = '';

  getListeAktuell(listId);

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

  getListeAktuell(listId);
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
  var ulList = document.createElement('ul');
  ulList.id = listId;
  ulList.class = "listeUl";
  var stringsToInsert = [];
    //HTML elemente für jedes einzelne Item Basteln
    for (let i = 0; i < listItems.length; i++){
      var itemBought = listItems[i].bought;
      var itemId = listItems[i]._id;
      var itemName = listItems[i].name;
      var testIdCheckbox = ulList.id.toString() + i.toString();

      if(itemBought == true){
        stringsToInsert[i] =
        '<li class="item" id="' + itemId + '"><input type="button" value="Löschen" onclick="removeListenelement('
        + "'" + ulList.id + "','" + itemId + "'" + ')"><input type="checkbox" id="'+ testIdCheckbox +'" onclick="checkListenelement('
        + "'" + ulList.id + "','" + itemId + "','" + testIdCheckbox + "'" +')" checked><input type="text" value=' + '"' + itemName + '"'+ '></input></input></input></li>';
        console.log(itemName);
      } else {
        stringsToInsert[i] =
        '<li class="item" id="' + itemId + '"><input type="button" value="Löschen" onclick="removeListenelement('
        + "'" + ulList.id + "','" + itemId + "'" + ')"><input type="checkbox" id="'+ testIdCheckbox +'" onclick="checkListenelement('
        + "'" + ulList.id + "','" + itemId + "','" + testIdCheckbox + "'" +')"><input type="text" value=' + '"' + itemName + '"'+ '></input></input></input></li>';
      }

    }
    //HTML element für Ganze Liste basteln
    var elementeInUl = '<h1 id="' + listName + '"></h1><form action="#" method="post"><fieldset>';
    var eingabeEid = ulList.id.toString() + 'eid';
    for (let j = 0; j < stringsToInsert.length; j++){
      //list Items rein ballern
      elementeInUl += stringsToInsert[j];

    }
    //ende rein ballern
    elementeInUl += '</fieldset></form><form action="#" method="post"><input type="text" name="Element hinzufügen" value="" placeholder="Item hinzufügen" id="' +
    eingabeEid + '"></input><input type="button" name="submit" value="Hinzufügen" onclick="addListenelement(' + "'" + listId + "'" + ')"></form>';

    //inner HTML von ul
    console.log(elementeInUl);
    ulList.innerHTML = elementeInUl;
    //ul appenden
    document.body.appendChild(ulList);

}

function getListeAktuell(listId){
  //Alte Liste Löschen
  var element = document.getElementById(listId);
  element.parentNode.removeChild(element);
  //url aus id der suchleiste zusammenbauen
  var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listId.toString();

  if (document.getElementById(listId) == null) {
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
