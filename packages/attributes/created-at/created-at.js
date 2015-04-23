orion.attributes.registerAttribute('createdAt', {
  columnTemplate: 'createdAtColumn',
  getSchema: function(options) {
    return {
      type: Date,
      autoform: {
        omit: true
      },
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }
    };
  }
});

if (Meteor.isClient) {
  ReactiveTemplates.helpers('attributeColumn.createdBy', {
    date: function() {
      return this.value;
    }
  });
}