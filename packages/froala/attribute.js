orion.attributes.registerAttribute('froala', {
  template: 'orionAttributesFroala',
  previewTemplate: 'orionAttributesFroalaColumn',
  getSchema: function(options) {
    return {
      type: String,
    };
  },

  valueOut: function() {
    return this.find('.editor').editable('getHTML', false, true);
  },
});

Options.init('froala.height');
orion.config.add('FROALA_ACTIVATION_KEY', 'froala', { public: true });
