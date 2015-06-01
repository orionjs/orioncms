AutoForm.addHooks(null, {
  before: {
    insert: function(doc) {
      console.log(doc);
      this.result(false);
    },
    update: function(doc) {
      console.log(doc);
      this.result(false);
    }
  }
});

ReactiveTemplates.onRendered('attribute.image', function() {
  var self = this;
  Session.set('currentFile' + self.data.name, null);

  var options = AutoForm.getSchemaForField(this.data.name).orion.options

  self.autorun(function() {
    if (!Session.get('currentFile' + self.data.name)) {
      return;
    }

    Tracker.afterFlush(function () {
      self.$('img').cropper(options.cropper);
    });
  })
})

ReactiveTemplates.helpers('attribute.image', {
  currentFile: function() {
    return Session.get('currentFile' + this.name);
  }
});

ReactiveTemplates.events('attribute.image', {
  'change input': function(event, template) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var FR = new FileReader();
      FR.onload = function(e) {
        Session.set('currentFile' + self.name, e.target.result);
      };
      FR.readAsDataURL(event.target.files[0]);
    }
  }
});