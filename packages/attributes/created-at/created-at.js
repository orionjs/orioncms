orion.attributes.registerAttribute('createdAt', {
  previewTemplate: 'createdAtPreview',
  orderable: true,
  getSchema: function(options) {
    return {
      type: Date,
      index: 1,
      autoform: {
        omit: true
      },
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        } else if (this.isUpsert) {
          return { $setOnInsert: new Date() };
        } else {
          this.unset();
        }
      }
    };
  }
});

if (Meteor.isClient) {
  ReactiveTemplates.helpers('attributePreview.createdAt', {
    date: function() {
      return this.value && moment(this.value).format('LLL');
    }
  });
}
