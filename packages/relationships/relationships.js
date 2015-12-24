var onCreated = function() {
  var self = this;

  self.selectInput = new ReactiveVar(null);
  self.observer = new ReactiveVar(null);

  self.autorun(function() {
    var dataContext = Template.currentData();
    var schema = AutoForm.getSchemaForField(dataContext.name);
    self.subscribe(schema.orion.publicationName);
  });

  self.autorun(function() {
    var dataContext = Template.currentData();
    var instance = Template.instance();
    if (!instance.selectInput.get()) return;
    var schema = AutoForm.getSchemaForField(dataContext.name);
    var filter = schema.orion.filter(Meteor.userId());
    var transform = function(item) {
      var newItem = { _id: item._id };
      for (var i = 0; i < schema.orion.fields.length; i++) {
        var field = schema.orion.fields[i];
        newItem[field] = orion.helpers.searchObjectWithDots(item, field, true);
      }

      return newItem;
    };

    var items = _.clone(instance.selectInput.get().items);
    instance.selectInput.get().clearOptions();

    var observer = schema.orion.collection.find(filter).observe({
      added: function(newItem) {
        var elem = instance.selectInput.get().getItem(newItem._id);
        if (elem && elem[0]) {
          instance.selectInput.get().updateOption(newItem._id, transform(newItem));
        } else {
          instance.selectInput.get().addOption(transform(newItem));
        }

        if (_.contains(items, newItem._id)) {
          instance.selectInput.get().addItem(newItem._id, true);
        }
      },

      changed: function(newItem, oldItem) {
        instance.selectInput.get().updateOption(oldItem._id, transform(newItem));
      },

      removed: function(item) {
        var items = _.isArray(dataContext.value) ? dataContext.value : [dataContext.value];
        if (!_.contains(items, item._id)) {
          instance.selectInput.get().removeOption(item._id);
        }
      },
    });

    instance.observer.set(observer);
  });
};

var onRendered = function() {
  var dataContext = Template.currentData();
  var schema = AutoForm.getSchemaForField(dataContext.name);
  var self = this;
  var items = _.isArray(dataContext.value) ? dataContext.value : [dataContext.value];
  var labelField = _.isArray(schema.orion.titleField) ? schema.orion.titleField[0] : schema.orion.titleField;
  var defaultOptions = [];
  _.each(items, function(itemId) {
    var newItem = { _id: itemId };
    newItem[labelField] = 'Loading...';
    defaultOptions.push(newItem);
  });

  var element = this.$('select').selectize({
    valueField: '_id',
    labelField: labelField,
    items: items,
    searchField: schema.orion.fields,
    sortField: _.union(
      (_.isArray(schema.orion.sortFields) ?
          _.map(schema.orion.sortFields, function(sort_field) { return { field: sort_field, direction: 'asc' }; }) :

          _.map(schema.orion.sortFields, function(sort_order, sort_field) { return { field: sort_field, direction: sort_order }; })),

      [{ field: '$score' }]
    ),
    plugins: ['remove_button'],
    createFilter: schema.orion.createFilter,
    create: schema.orion.create && function(input, callback) {
      schema.orion.create(input, function(value) {
        var select = self.selectInput.get();
        if (select.settings.mode == 'multi') {
          select.setTextboxValue('');
          select.addItem(value);
        } else {
          select.setValue(value);
        }

        callback(value);
      });
    },

    options: defaultOptions,
    render: schema.orion.render,
  });
  Template.instance().selectInput.set(element[0].selectize);
};

var onDestroyed = function() {
  if (this.selectInput.get()) {
    this.selectInput.get().destroy();
  }

  if (this.observer.get()) {
    this.observer.get().stop();
  }
};

ReactiveTemplates.onRendered('attribute.hasMany', onCreated);
ReactiveTemplates.onRendered('attribute.hasOne', onCreated);
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
  },
});

ReactiveTemplates.onCreated('attributePreview.hasOne', function() {
  var self = this;
  self.autorun(function() {
    var dataContext = Template.currentData();
    self.subscribe(dataContext.schema.orion.publicationName + '_row', dataContext.value);
  });
});

ReactiveTemplates.helpers('attributePreview.hasOne', {
  val: function() {
    var item = this.schema && this.schema.orion.collection.findOne(this.value);
    if (item) {
      if (_.isArray(this.schema.orion.titleField)) {
        return this.schema.orion.titleField.map((field) => {
          return orion.helpers.searchObjectWithDots(item, field, true);
        }).join(' | ');
      } else {
        return orion.helpers.searchObjectWithDots(item, this.schema.orion.titleField, true);
      }
    }
  },
});
