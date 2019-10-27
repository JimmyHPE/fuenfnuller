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

        //JSON Objekt in HTML element umwandeln (Die Liste)
    }
  };

>>>>>>> 2d9edae39700581b2eb08e6ddeaa0305c0a37bc6
  xhttp.send();
}
