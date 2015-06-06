orion.helpers.analizeColorFromBase64 = function(base64) {
  var image = new Image;
  image.src = base64;
  var colorInfo = Colibri.extractImageColors(image, 'hex');
  var width = image.naturalWidth;
  var height = image.naturalHeight;

  return {
    width: width,
    height: height,
    backgroundColor: colorInfo.background,
    primaryColor: colorInfo.content[0],
    secondaryColor: colorInfo.content[1] || colorInfo.content[0],
  }
}