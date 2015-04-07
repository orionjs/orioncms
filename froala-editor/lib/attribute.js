orion.attributes.registerAttribute('froala', {
	template: 'orionAttributesFroala',
	columnTemplate: 'orionAttributesFroalaColumn',
	getSchema: function(options) {
		return {
			type: String
		};
	},
	valueOut: function() {
		return this.find('.editor').editable('getHTML', false, true);
	}
});