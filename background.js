//div inner HTML setzen
function getBackground(){

var gesamtHtml = '';
var arrayAnZeilen = [];

//Schleifenfurchläufe für die Zeile
for(let j = 0; j < 45; j++){

  let zeileString = '';
  //Zufällige Id (für CSS) bestimmen. Es gibt 5 verschiedene Ids, welche die Geschwindigkeit der Animation bestimmen
  let zufallsId = Math.floor((Math.random()*5))

    //eine Zeile mit Emojis befüllen
    for (let i = 0; i < 280; i++) {

      let test = Math.floor((Math.random() * 5));
      var emoji;
      if (test == 0) {
        emoji = "&#127867";
      }
      else if (test == 1) {
        emoji = "&#127865";
      }
      else if (test == 2) {
        emoji = "&#127864";
      }
      else if (test == 3) {
        emoji = "&#127863";
      }
      else {
        emoji = "&#127866";
      }
      zeileString += emoji;
    }

    //String(HTML Code) aus Zeilen bauen
    gesamtHtml += '<p id="z' + zufallsId + '">'+zeileString+'</p>';
}

//HTML in die Seite einbringen
document.getElementById('hintergrund').innerHTML = gesamtHtml;
}
