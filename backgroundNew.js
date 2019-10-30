//div inner HTML setzen
function getBackground(){

var zeileString = '';
var gesamtHtml = '';
var arrayAnZeilen = [];
for(var j = 0; j < 70; j++){
  let zufallsId = Math.floor((Math.random()*5))

    for (var i = 0; i < 80; i++) {

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
    gesamtHtml += '<p id="z' + zufallsId + '">'+zeileString+'</p>';
}

document.getElementById('hintergrund').innerHTML = gesamtHtml;
}
//for schleife mit anzahl an ps
  //erzeugt ps mit zufälliger Id
