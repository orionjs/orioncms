ReactiveTemplates.onRendered('attribute.image', function () {
  Session.set('uploadProgress' + this.data.name, null);
  Session.set('image_base64' + this.data.name, null);
  Session.set('isUploading' + this.data.name, false);
  Session.set('image' + this.data.name, this.data.value);
});

ReactiveTemplates.helpers('attribute.image', {
  base64: function() {
    return Session.get('image_base64' + this.name);
  },
  uploadingClass: function() {
    return Session.get('isUploading' + this.name) ? 'uploading' : '';
  },
  progress: function() {
    return Session.get('uploadProgress' + this.name);
  },
  image: function() {
    return Session.get('image' + this.name);
  }
});

ReactiveTemplates.events('attribute.image', {
  'click .btn-remove': function(event, template) {
    var file = Session.get('image' + template.data.name);
    if (file && file.fileId) {
      orion.filesystem.remove(file.fileId);
    }
    Session.set('image' + template.data.name, null);
  },
  'change input': function(event, template) {
    var self = this;
    var files = event.currentTarget.files;
    if (files.length != 1) return;

    orion.helpers.getBase64Image(files[0], function(base64) {
      Session.set('image_base64' + self.name, base64);

      var upload = orion.filesystem.upload({
        fileList: files,
        name: files[0].name,
        uploader: 'image-attribute'
      });

      Session.set('isUploading' + self.name, true);
      Session.set('uploadProgress' + self.name, 1);

      Tracker.autorun(function () {
        if (upload.ready()) {
          if (upload.error) {
            Session.set('image' + self.name, null);
            console.log(upload.error);
            alert(upload.error.reason);
          } else {
            var information = orion.helpers.analizeColorFromBase64(base64);
            Session.set('image' + self.name, {
              fileId: upload.fileId,
              url: upload.url,
              info: information
            });
          }
          Session.set('isUploading' + self.name, false);
        }
      });
      Tracker.autorun(function () {
        Session.set('uploadProgress' + self.name, upload.progress());
      });
    })
  }
});