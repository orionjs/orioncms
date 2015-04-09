orion.attributes.registerAttribute('summernote', {
  template: 'orionAttributesSummernote',
  columnTemplate: 'orionAttributesSummernoteColumn',
  getSchema: function(options) {
    return {
      type: String
    };
  },
  valueOut: function() {
    return this.find('.summernote').code();
  }
});

