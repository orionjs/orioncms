Template.registerHelper('isImage', function(fileURL) {
  var url = fileURL.toLowerCase();
  return ((url.indexOf('.png') > 0) ||
      (url.indexOf('.jpg') > 0) ||
      (url.indexOf('.jpeg') > 0) ||
      (url.indexOf('.gif') > 0) ||
      (url.indexOf('.bmp') > 0));
});

Template.registerHelper('iconForFile', function(fileURL) {
  var url = fileURL.toLowerCase();
  if ((url.indexOf('.png') > 0) ||
    (url.indexOf('.jpg') > 0) ||
    (url.indexOf('.jpeg') > 0) ||
    (url.indexOf('.gif') > 0) ||
    (url.indexOf('.bmp') > 0)) {
    return 'fa-file-image-o';
  }
  return 'fa-file-o';
});

Template.registerHelper('filesystemIsUploading', function() {
  return orion.filesystem.isUploading();
});
