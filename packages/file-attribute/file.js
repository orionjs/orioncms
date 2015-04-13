orion.templates.setEvents('attribute.file', {
  'click .btn-remove': function(event, template) {
    try {
      orion.filesystem.remove(this.fileId);
    } catch (e) {
      console.log(e, 'error removing image')
    }
    Session.set('file' + template.data.name, null);
  },
  'change input': function(event, template) {
    var self = this;
    var files = event.target.files;
    if (files.length < 0) return;

    var upload = orion.filesystem.upload({
      fileList: files,
      name: files[0].name,
    });

    Session.set('isUploading' + self.name, true);
    Session.set('uploadProgress' + self.name, 0);

    Tracker.autorun(function () {
      if (upload.ready()) {
        if (upload.error) {
          Session.set('file' + self.name, null);
          console.log(upload.error);
          alert(upload.error.reason);
        } else {
          Session.set('file' + self.name, {
            //fileId: upload._id,
            url: upload.url
          });
        }
        Session.set('isUploading' + self.name, false);
      }
    });
    Tracker.autorun(function () {
      Session.set('uploadProgress' + self.name, upload.progress());
    });
  }
});

orion.templates.setHelpers('attribute.file', {
  progress: function () {
    return Session.get('uploadProgress' + this.name);
  },
  isUploading: function() {
    return Session.get('isUploading' + this.name);
  },
  file: function() {
    return Session.get('file' + this.name);
  }
});

orion.templates.setOnRendered('attribute.file', function () {
  Session.set('uploadProgress' + this.data.name, null);
  Session.set('isUploading' + this.data.name, false);
  console.log(this.data);
  Session.set('file' + this.data.name, this.data.value);
});
