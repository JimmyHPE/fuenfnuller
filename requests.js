function getListe(){
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
  xhttp.send();
}
