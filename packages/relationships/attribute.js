var getSchema = function(options, hasMany) {
  check(options, Match.ObjectIncluding({
    titleField: Match.OneOf(String, Array),
    publicationName: String,
    customPublication: Match.Optional(Boolean),
    pluralName: Match.Optional(Match.OneOf(String, Function)),
    singularName: Match.Optional(Match.OneOf(String, Function)),
    collection: Mongo.Collection,
    filter: Match.Optional(Function),
    createFilter: Match.Optional(Function),
    create: Match.Optional(Function),
    additionalFields: Match.Optional(Array),
    sortFields: Match.Optional(Match.OneOf(Array, Object)),
    render: Match.Optional({
      item: Function,
      option: Function
    })
  }));

  if (!options.filter) {
    options.filter = function(userId) {
      return {};
    };
  }

  if (!options.create) {
    options.create = false;
  }

  if (_.isArray(options.titleField) && options.titleField.length === 1) {
    options.titleField = options.titleField[0];
  }

  function render_item_default(item, escape) {
    var fieldContent = ""
    if (_.isArray(options.titleField)) {
      _.each(options.titleField, function(field, index) { fieldContent += (index > 0 ? " | " : "") + escape(item[field])});
    }
    else {
      fieldContent = escape(item[options.titleField]);
    }
    return '<div>' + fieldContent + '</div>';
  }

  if (!options.render) {
    options.render = {
      item: function(item, escape) {
        return render_item_default(item, escape);
      },
      option: function(item, escape) {
        return render_item_default(item, escape);
      }
    };
  }

  if (!options.additionalFields) {
    options.additionalFields = [];
  }

  if (!options.pluralName) {
    options.pluralName = i18n('collections.common.defaultPluralName');
  }

  if (!options.singularName) {
    options.singularName = i18n('collections.common.defaultSingularName');
  }

  options.fields = _.union(options.additionalFields, options.titleField);

  if (Meteor.isServer) {
    if (!options.customPublication) {
      Meteor.publish(options.publicationName, function () {
        var pubFields = {};
        for (var i = 0; i < options.fields.length; i++) {
          pubFields[options.fields[i]] = 1;
        }
        return options.collection.find(options.filter(this.userId), { fields: pubFields });
      }, { is_auto: true });
    }
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
