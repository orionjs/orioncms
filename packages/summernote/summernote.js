ReactiveTemplates.onRendered('attribute.summernote', function() {
  this.subscribe('summernoteImages');
  Session.set('orionSummernoteIsUploading', false);
  var element = this.$('.summernote');
  element.summernote({
    height: 300,
    onImageUpload: function(files, editor, $editable) {
      var upload = orion.filesystem.upload({
        fileList: files,
        name: files[0].name,
        uploader: 'summernote'
      });
      Session.set('orionSummernoteIsUploading', true);
      Session.set('orionSummernoteProgress', 0);
      Tracker.autorun(function () {
        if (upload.ready()) {
          if (upload.error) {
            console.log(upload.error);
            alert(upload.error.reason);
          } else {
            element.summernote('insertImage', upload.url);
          }
          Session.set('orionSummernoteIsUploading', false);
        }
      });
      Tracker.autorun(function () {
        Session.set('orionSummernoteProgress', upload.progress());
      });
    }
  });
  element.code(this.data.value);
})

ReactiveTemplates.helpers('attribute.summernote', {
  isUploading: function() {
    return Session.get('orionSummernoteIsUploading');
  },
  progress: function() {
    return Session.get('orionSummernoteProgress');
  }
})

ReactiveTemplates.helpers('attributePreview.summernote', {
  preview: function () {
    var value = this.value;
    var tmp = document.createElement("DIV");
    var content = value.replace(/<(?:.|\n)*?>/gm, ' ');
    if(content.length > 50) content = content.substring(0, 47).trim() + '...';
    return content;
  }
});
