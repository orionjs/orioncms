orion.attributes.registerAttribute('users', {
  template: 'orionAttributesHasMany',
  previewTemplate: 'orionAttributesHasManyColumn',
  getSchema: function(options) {
    options = _.extend(options, {
      titleField: 'profile.name',
      pluralName: i18n('attributes.users.pluralName'),
      singularName: i18n('attributes.users.singularName'),
      collection: Meteor.users,
      additionalFields: ['emails.address', 'roles'],
      render: {
        item: function(item, escape) {
          return '<div class="usersAttribute">' +
            (item['profile.name'] ? '<span class="name">' + escape(item['profile.name']) + '</span>' : '') +
            (item['emails.address'] ? '<span class="email">' + escape(item['emails.address']) + '</span>' : '') +
          '</div>';
        },
        option: function(item, escape) {
          var label = item['profile.name'] || item['emails.address'];
          var caption = item['profile.name'] ? item['emails.address'] : null;
          return '<div class="usersAttribute">' +
            '<span class="name">' + escape(label) + '</span>' +
            (caption ? '<span class="email">' + escape(caption) + '</span>' : '') +
          '</div>';
        }
      },
    });
    return orion.attribute('hasMany', {}, options);
  },
  valueOut: function() {
    return this.val();
  }
});

orion.attributes.registerAttribute('user', {
  template: 'orionAttributesHasOne',
  previewTemplate: 'orionAttributesHasOneColumn',
  getSchema: function(options) {
    options = _.extend(options, {
      titleField: 'profile.name',
      collection: Meteor.users,
      additionalFields: ['emails.address', 'roles'],
      render: {
        item: function(item, escape) {
          return '<div class="usersAttribute">' +
            (item['profile.name'] ? '<span class="name">' + escape(item['profile.name']) + '</span>' : '') +
            (item['emails.address'] ? '<span class="email">' + escape(item['emails.address']) + '</span>' : '') +
          '</div>';
        },
        option: function(item, escape) {
          var label = item['profile.name'] || item['emails.address'];
          var caption = item['profile.name'] ? item['emails.address'] : null;
          return '<div class="usersAttribute">' +
            '<span class="name">' + escape(label) + '</span>' +
            (caption ? '<span class="email">' + escape(caption) + '</span>' : '') +
          '</div>';
        }
      },
    });
    return orion.attribute('hasOne', {}, options);
  },
  valueOut: function() {
    return this.val();
  }
});
