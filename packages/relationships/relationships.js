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
};

var onRendered = function() {
  var template = this;
  template.autorun(function() {
<<<<<<< d7b5207b4790c1b09545c50e7a26a40156fec7a3
    RouterLayer.isActiveRoute('admin');
    template.$('select')[0].selectize && template.$('select')[0].selectize.destroy();
  })
=======
    Router.current();
    if (template.$('select')[0].selectize !== null) template.$('select')[0].selectize.destroy();
  });
>>>>>>> Linting & Hoisting & package bumped
  template.autorun(function () {
    var dataContext = Template.currentData();
    var schema = AutoForm.getSchemaForField(dataContext.name);
    var subscription = template.subscribe(schema.orion.publicationName);
    if (subscription.ready()) {
      var filter = schema.orion.filter(Meteor.userId());
      var options = schema.orion.collection.find(filter).map(function(item) {
        var newItem = { _id: item._id };
        for (var i = 0; i < schema.orion.fields.length; i++) {
          var field = schema.orion.fields[i];
          newItem[field] = orion.helpers.searchObjectWithDots(item, field, true);
        }
        return newItem;
      });
      initSelect(template, dataContext, schema, options);
    }
  });
};

var onDestroyed = function() {
  if (this.$('select')[0].selectize !== null) this.$('select')[0].selectize.destroy();
};
ReactiveTemplates.onRendered('attribute.hasMany', onRendered);
ReactiveTemplates.onRendered('attribute.hasOne', onRendered);
ReactiveTemplates.onDestroyed('attribute.hasMany', onDestroyed);
ReactiveTemplates.onDestroyed('attribute.hasOne', onDestroyed);

ReactiveTemplates.helpers('attributePreview.hasMany', {
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

ReactiveTemplates.onRendered('attributePreview.hasOne', function() {
  this.subscribe(this.data.schema.orion.publicationName + '_row', this.data.value);
});

ReactiveTemplates.helpers('attributePreview.hasOne', {
  val: function () {
    var item = this.schema && this.schema.orion.collection.findOne(this.value);
    return item && orion.helpers.searchObjectWithDots(item, this.schema.orion.titleField, true);
  }
});
