var initSelect = function(template, dataContext, schema, options) {
  template.$('select').selectize({
      valueField: '_id',
      labelField: options.titleField,
      items: _.isArray(dataContext.value) ? dataContext.value : [dataContext.value],
      searchField: schema.orion.fields,
      plugins: ['remove_button'],
      createFilter: schema.orion.createFilter,
      create: schema.orion.create,
      options: options,
      render: schema.orion.render,
  });
}

var onRendered = function() {
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
          newItem[field] = orion.helpers.searchObjectWithDots(item, field, true);
        };
        return newItem;
      });
      initSelect(template, dataContext, schema, options)
    }
  });
}

var onDestroyed = function() {
  this.$('select')[0].selectize && this.$('select')[0].selectize.destroy();
}
orion.templates.setOnRendered('attribute.hasMany', onRendered)
orion.templates.setOnRendered('attribute.hasOne', onRendered)
orion.templates.setOnDestroyed('attribute.hasMany', onDestroyed)
orion.templates.setOnDestroyed('attribute.hasOne', onDestroyed)

orion.templates.setHelpers('attributeColumn.hasMany', {
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
});

orion.templates.setOnRendered('attributeColumn.hasOne', function() {
  this.subscribe(this.data.schema.orion.publicationName + '_row', this.data.value);
});

orion.templates.setHelpers('attributeColumn.hasOne', {
  val: function () {
    var entity = Router.current().data().entity;
    var item = this.schema && this.schema.orion.collection.findOne(this.value);
    return item && orion.helpers.searchObjectWithDots(item, this.schema.orion.titleField, true);
  }
});
