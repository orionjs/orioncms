var getSchema = function(options, hasMany) {
  check(options, {
    titleField: String,
    publicationName: String,
    pluralName: Match.Optional(String),
    singularName: Match.Optional(String),
    collection: Mongo.Collection,
    filter: Match.Optional(Function),
    createFilter: Match.Optional(Function),
    create: Match.Optional(Function),
    aditionalFields: Match.Optional(Array),
    render: Match.Optional({
      item: Function,
      option: Function
    })
  });

  if (!options.filter) {
    options.filter = function(userId) {
      return {};
    };
  }

  if (!options.create) {
    options.create = false;
  }

  if (!options.render) {
    options.render = {
      item: function(item, escape) {
        return '<div>' + escape(item[options.titleField]) + '</div>';
      },
      option: function(item, escape) {
        return '<div>' + escape(item[options.titleField]) + '</div>';
      }
    };
  }

  if (!options.aditionalFields) {
    options.aditionalFields = [];
  }

  if (options.collection.pluralName) {
    options.pluralName = options.collection.pluralName.toLowerCase();
  }

  if (options.collection.singularName) {
    options.singularName = options.collection.singularName.toLowerCase();
  }

  if (!options.pluralName) {
    options.pluralName = i18n('collection.common.defaultPluralName');
  }

  if (!options.singularName) {
    options.singularName = i18n('collection.common.defaultSingularName');
  }

  options.fields = options.aditionalFields;
  options.fields.push(options.titleField);

  if (Meteor.isServer) {
    Meteor.publish(options.publicationName, function () {
      var pubFields = {};
      for (var i = 0; i < options.fields.length; i++) {
        pubFields[options.fields[i]] = 1;
      }
      return options.collection.find(options.filter(this.userId), { fields: pubFields });
    }, { is_auto: true });
    if (!hasMany) {
      Meteor.publish(options.publicationName + '_row', function (id) {
        var pubFields = {};
        for (var i = 0; i < options.fields.length; i++) {
          pubFields[options.fields[i]] = 1;
        }
        var filter = options.filter(this.userId);
        filter._id = id;
        return options.collection.find(filter, { fields: pubFields });
      }, { is_auto: true });
    }
  }

  if (hasMany) {
    return {
      type: [String],
      orion: options
    };
  } else {
    return {
      type: String,
      orion: options
    };
  }
};

orion.attributes.registerAttribute('hasMany', {
  template: 'orionAttributesHasMany',
  previewTemplate: 'orionAttributesHasManyColumn',
  getSchema: function(options) {
    return getSchema(options, true);
  },
  valueOut: function() {
    return this.val();
  }
});

orion.attributes.registerAttribute('hasOne', {
  template: 'orionAttributesHasOne',
  previewTemplate: 'orionAttributesHasOneColumn',
  getSchema: function(options) {
    return getSchema(options, false);
  },
  valueOut: function() {
    return this.val();
  }
});
