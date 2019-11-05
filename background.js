/*Ein Div, welcher als Hintergrund agieren soll, ist als div bereits im HTML vorhanden.
  Diesen gilt es mit vielen zufälligen Emojis zu befüllen, wobei jede Zeile einzeln
  animiert wird. */
function getBackground(){

var gesamtHtml = '';
var arrayAnZeilen = [];

//119 Zeilen
for (let j = 0; j < 119; j++){

  let zeileString = '';

  //Zufällige Id (für CSS) bestimmen. Es gibt 5 verschiedene Ids, welche die Geschwindigkeit der Animation bestimmen
  let zufallsId = Math.floor((Math.random()*5))

    //eine Zeile mit 270 Emojis befüllen
    for (let i = 0; i < 270; i++) {

      //Zufallszahl um Emoji zu bestimmen
      let test = Math.floor((Math.random() * 5));

      if (test == 0) {
        var emoji = "&#127867";
      }
      else if (test == 1) {
        var emoji = "&#127865";
      }
      else if (test == 2) {
        var emoji = "&#127864";
      }
      else if (test == 3) {
        var emoji = "&#127863";
      }
      else {
        var emoji = "&#127866";
      }

      //emoji einer Zeile hinzufügen
      zeileString += emoji;
    }

    //String(HTML Code) aus Zeilen bauen
    gesamtHtml += '<p id="z' + zufallsId + '">'+zeileString+'</p>';
}

//gebauter String wird in dem Div eingefügt
document.getElementById('hintergrund').innerHTML = gesamtHtml;
}
