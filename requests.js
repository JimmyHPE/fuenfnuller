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

        //JSON Objekt in HTML element umwandeln (Die Liste)
    }
  };

  xhttp.send();
}
