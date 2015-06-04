orion.helpers.analizeColorFromBase64 = function(base64) {
  var image = new Image;
  image.src = base64;
  var colorThief = new ColorThief();
  var primaryColor = colorThief.getColor(image);
  var pallete = colorThief.getPalette(image, 3);
  var width = image.naturalWidth;
  var height = image.naturalHeight;

  return {
    width: width,
    height: height,
    primaryColor: {
      r: primaryColor[0],
      g: primaryColor[1],
      b: primaryColor[2]
    },
    pallete: pallete.map(function(color) {
      return {
        r: color[0],
        g: color[1],
        b: color[2]
      }
    })
  }
}