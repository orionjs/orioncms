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
    validateOnClient: Match.Optional(Boolean),
    validateOnServer: Match.Optional(Boolean),
    dontValidate: Match.Optional(Boolean),
    render: Match.Optional({
      item: Function,
      option: Function,
    }),
  }));

  if (!_.has(options, 'validateOnClient')) {
    options.validateOnClient = true;
  }

  if (!_.has(options, 'validateOnServer')) {
    options.validateOnServer = true;
  }

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
    var fieldContent = '';
    if (_.isArray(options.titleField)) {
      _.each(options.titleField, function(field, index) { fieldContent += (index > 0 ? ' | ' : '') + escape(item[field]); });
    } else {
      fieldContent = escape(item[options.titleField]);
    }

    return '<div>' + fieldContent + '</div>';
  }

  if (!options.render) {
    options.render = {
      item: render_item_default,
      option: render_item_default,
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
      Meteor.publish(options.publicationName, function() {
        var pubFields = {};
        for (var i = 0; i < options.fields.length; i++) {
          pubFields[options.fields[i]] = 1;
        }

        return options.collection.find(options.filter(this.userId), { fields: pubFields });
      });
    }

    if (!hasMany) {
      Meteor.publish(options.publicationName + '_row', function(id) {
        var pubFields = {};
        for (var i = 0; i < options.fields.length; i++) {
          pubFields[options.fields[i]] = 1;
        }

        var filter = options.filter(this.userId);
        filter._id = id;
        return options.collection.find(filter, { fields: pubFields });
      });
    }
  }

  if (options.dontValidate && hasMany) {
    return {
      type: [String],
      orion: options,
    };
  } else if (options.dontValidate && !hasMany) {
    return {
      type: String,
      orion: options,
    };
  } else if (hasMany) {
    return {
      type: [String],
      orion: options,
      custom: function() {
        if (Meteor.isClient && !options.validateOnClient) {
          return;
        }

        if (Meteor.isServer && !options.validateOnServer) {
          return;
        }

        if (this.isSet && _.isArray(this.value) && this.value) {
          var count = options.collection.find({ $and: [{ _id: { $in: this.value } }, options.filter(this.userId)] }).count();
          if (count != this.value.length) {
            return 'notAllowed';
          }
        }
      },
    };
  } else {
    return {
      type: String,
      orion: options,
      custom: function() {
        if (Meteor.isClient && !options.validateOnClient) {
          return;
        }

        if (Meteor.isServer && !options.validateOnServer) {
          return;
        }

        if (this.isSet && _.isString(this.value) && this.value) {
          var count = options.collection.find({ $and: [{ _id: this.value }, options.filter(this.userId)] }).count();
          if (count != 1) {
            return 'notAllowed';
          }
        }
      },
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
  },
});

orion.attributes.registerAttribute('hasOne', {
  template: 'orionAttributesHasOne',
  previewTemplate: 'orionAttributesHasOneColumn',
  getSchema: function(options) {
    return getSchema(options, false);
  },

  valueOut: function() {
    return this.val();
  },
});
