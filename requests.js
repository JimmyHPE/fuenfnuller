function getListe(){
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
        var listeItems = JSON.parse(listeJson.items);
        document.getElementById("name").innerHTML = listeJson.name;
        buildListe(listeJson._id, listeJson.name, listeItems.name, )
        //HTML ELEMENT BAUEN und Item values einfügen
    }
  };

  xhttp.send();
}

function addListenelement(){
  //Diese Funktion wird von einem HTML submit Feld ausgelöst
  //Sie liest ein Input Feld aus und fügt die Infos als HTML input Feld ein (in "value")
  //das Input Feld zum Einfügen wird geleert
}

function removeListenelement(){
  //Neben jedem Listenelement ist ein Mülltonnen-icon
  //Es löscht das List-Item
  //und getted die aktualisierte Liste
}


function checkListenelement(){
  //Diese Funktion wird durch das Abhaken einer Liste ausgelöst

  //Die Liste Inhalte der Liste werden zu einem JSON String zusammengebaut

  //POST Funktion
}

function buildListe(){


}
