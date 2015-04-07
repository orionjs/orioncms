Template.orionAttributesHasManyColumn.helpers({
	val: function() {
		var count = this.value.length;
		if (!this.schema) {
			return '';
		}
		if (count != 1) {
			return count + ' ' + this.schema.orion.pluralName;
		}
		return count + ' ' + this.schema.orion.singularName;
	}
})

Template.orionAttributesHasMany.onRendered(function() {
	var template = this;
	template.autorun(function() {
		Router.current();
		template.$('select')[0].selectize && template.$('select')[0].selectize.destroy();
	})
	template.autorun(function () {
		var dataContext = Template.currentData();
		var schema = AutoForm.getSchemaForField(dataContext.name)
		var subscription = template.subscribe(schema.orion.publicationName);
		if (subscription.ready()) {
			var filter = schema.orion.filter(Meteor.userId());
			var options = schema.orion.collection.find(filter).map(function(item) {
				var newItem = { _id: item._id };
				for (var i = 0; i < schema.orion.fields.length; i++) {
					var field = schema.orion.fields[i];
					newItem[field] = orion.searchObjectWithDots(item, field, true);
				};
				return newItem;
			});
			initSelect(template, dataContext, schema, options)
		}
	});
});

Template.orionAttributesHasMany.onDestroyed(function() {
	this.$('select')[0].selectize && this.$('select')[0].selectize.destroy();
});

var initSelect = function(template, dataContext, schema, options) {
	template.$('select').selectize({
	    valueField: '_id',
	    labelField: options.titleField,
	    items: dataContext.value,
	    searchField: schema.orion.fields,
	    plugins: ['remove_button'],
	    createFilter: schema.orion.createFilter,
	    create: schema.orion.create,
	    options: options,
	    render: schema.orion.render,
	});
}