ReactiveTemplates.onRendered('attribute.images', function () {
  Session.set('images' + this.data.name, this.data.value);
  this.uploads = [];
});

ReactiveTemplates.helpers('attribute.images', {
  images: function() {
    return Session.get('images' + this.name);
  },
  uploads: function() {
    if (!Template.instance().uploadsDep) {
      Template.instance().uploadsDep = new Tracker.Dependency();
    }
    Template.instance().uploadsDep.depend();
    return Template.instance().uploads;
  }
});

ReactiveTemplates.events('attribute.images', {
  'click .delete-btn': function(event, template) {
    if (this && this.fileId) {
      var images = Session.get('images' + template.data.name);
      var image = _.findWhere(images, { fileId: this.fileId });
      var newImages = _.without(images, image);
      Session.set('images' + template.data.name, newImages);
      orion.filesystem.remove(this.fileId);
    }
  },
  'change input': function(event, template) {
    if (orion.filesystem.isUploading()) return;

    var self = this;
    var files = event.currentTarget.files;
    if (files.length != 1) return;

    orion.helpers.getBase64Image(files[0], function(base64) {
      var upload = orion.filesystem.upload({
        fileList: files,
        name: files[0].name,
        uploader: 'image-attribute'
      });
      upload.base64 = base64;
      template.uploads.push(upload);
      template.uploadsDep.changed();

      Tracker.autorun(function () {
        if (upload.ready()) {
          if (upload.error) {
            console.log(upload.error);
            alert(upload.error.reason);
          } else {
            var information = orion.helpers.analizeColorFromBase64(base64);
            Tracker.nonreactive(function() {
              var session = Session.get('images' + self.name) || [];
              session.push({
                fileId: upload.fileId,
                url: upload.url,
                info: information
              });
              Session.set('images' + self.name, session);
            });
          }
          template.uploads = _.without(template.uploads, upload);
          template.uploadsDep.changed();
          event.currentTarget.value = '';
        }
      });
    });
  }
});
