
function befuelleZeile(){
  for (let i = 0; i < 95; i++) {
      let test = Math.floor((Math.random() * 2));

      if (test == 1) {
        var emoji = "&#127867";
      }
      else {
        var emoji = "&#127866";
      }
      document.writeln(emoji);
  }
}
