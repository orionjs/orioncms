ReactiveTemplates.events('attribute.file', {
  'click .btn-remove': function(event, template) {
    var file = Session.get('file' + template.data.name);
    if (file && file.fileId) {
      orion.filesystem.remove(file.fileId);
    }
    Session.set('file' + template.data.name, null);
  },
  'change input': function(event, template) {
    if (orion.filesystem.isUploading()) return;

    var self = this;
    var files = event.currentTarget.files;
    if (files.length != 1) return;

    var upload = orion.filesystem.upload({
      fileList: files,
      name: files[0].name,
      uploader: 'file-attribute'
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
            fileId: upload.fileId,
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

ReactiveTemplates.helpers('attribute.file', {
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

ReactiveTemplates.onRendered('attribute.file', function () {
  Session.set('uploadProgress' + this.data.name, null);
  Session.set('isUploading' + this.data.name, false);
  Session.set('file' + this.data.name, this.data.value);
});
