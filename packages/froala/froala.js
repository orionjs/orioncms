ReactiveTemplates.onRendered('attribute.froala', function() {
  var name = this.data.name;
  var parent = $('[data-schema-key="' + name + '"]');

  // Find the element
  var element = parent.find('.editor');

  // initialize froala
  element.editable({
    inlineMode: false,
    placeholder: '',
    minHeight: Options.get('froala.height', 400),  // setting a default height
    key: orion.config.get('FROALA_ACTIVATION_KEY') // set license key if exists
  });

  // set the current value of the attribute
  element.editable('setHTML', this.data.value, true);

  // Handle image uploads
  element.on('editable.beforeImageUpload', function(e, editor, files) {
    var upload = orion.filesystem.upload({
      fileList: files,
      name: files[0].name,
      uploader: 'froala',
    });
    Tracker.autorun(function() {
      if (upload.ready()) {
        if (upload.error) {
          console.log(upload.error, 'error uploading file');
        } else {
          element.editable('insertHTML', "<img class='fr-fin' data-file-id='" + upload.fileId + "' src='" + upload.url + "'>", true);
        }

        element.editable('hidePopups');
      }
    });

    return false;
  });

  // Handle image deletes
  // If its uploaded through filesystem, it deletes the image and prevent the server call to delete
  element.on('editable.beforeRemoveImage', function(e, editor, img) {
    var imgId = img.attr('data-file-id');
    if (!imgId) {
      return;
    }

    orion.filesystem.remove(imgId);
  });
});

ReactiveTemplates.helpers('attributePreview.froala', {
  preview: function() {
    var value = this.value;
    var tmp = document.createElement('DIV');
    var content = value.replace(/<(?:.|\n)*?>/gm, ' ');
    if (content.length > 50) content = content.substring(0, 47).trim() + '...';
    return content;
  },
});
