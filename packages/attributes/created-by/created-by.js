orion.attributes.registerAttribute('createdBy', {
  previewTemplate: 'createdByPreview',
  getSchema: function(options) {
    return {
      type: String,
      index: 1,
      autoform: {
        omit: true,
      },
      optional: true,
      autoValue: function() {
        if (this.isInsert) {
          return this.userId;
        } else if (this.isUpsert) {
          return { $setOnInsert: this.userId };
        } else {
          this.unset();
        }
      },
    };
  },
});

if (Meteor.isServer) {
  Meteor.publish('userProfileForCreatedByAttributeColumn', function(userId) {
    check(userId, String);
    return Meteor.users.find({ _id: userId }, { fields: { profile: 1 } });
  });
}

if (Meteor.isClient) {
  ReactiveTemplates.onRendered('attributePreview.createdBy', function() {
    this.subscribe('userProfileForCreatedByAttributeColumn', this.data.value);
  });

  ReactiveTemplates.helpers('attributePreview.createdBy', {
    name: function() {
      var user = Meteor.users.findOne(this.value);
      return user && user.profile && user.profile.name;
    },
  });
}
