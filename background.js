
function befuelleZeile(){
  for (let i = 0; i < 95; i++) {
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
      document.writeln(emoji);
  }
}

