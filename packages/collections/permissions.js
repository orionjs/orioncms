orion.collections.onCreated(function() {
  var self = this;
  
  /**
   * Collection permissions
   */
  Roles.registerAction('collection.' + this.name + '.index', true);
  Roles.registerAction('collection.' + this.name + '.insert', true);
  Roles.registerAction('collection.' + this.name + '.update', true);
  Roles.registerAction('collection.' + this.name + '.remove', true);
  Roles.registerAction('collection.' + this.name + '.showCreate', true);
  Roles.registerAction('collection.' + this.name + '.showUpdate', true);
  Roles.registerAction('collection.' + this.name + '.showRemove', true);

  this.allow({
    insert: function (userId, doc) {
      return Roles.allow(userId, 'collection.' + self.name + '.insert', userId, doc)
    },
    update: function (userId, doc, fields, modifier) {
      return Roles.allow(userId, 'collection.' + self.name + '.update', userId, doc, fields, modifier)
    },
    remove: function (userId, doc) {
      return Roles.allow(userId, 'collection.' + self.name + '.remove', userId, doc)
    }
  });

  this.deny({
    insert: function (userId, doc) {
      return Roles.deny(userId, 'collection.' + self.name + '.insert', userId, doc)
    },
    update: function (userId, doc, fields, modifier) {
      return Roles.deny(userId, 'collection.' + self.name + '.update', userId, doc, fields, modifier)
    },
    remove: function (userId, doc) {
      return Roles.deny(userId, 'collection.' + self.name + '.remove', userId, doc)
    }
  });

  if (Meteor.isClient) {
    this.canIndex = function() {
      return Roles.userHasPermission(Meteor.userId(), 'collection.' + self.name + '.index');
    }
    this.canShowCreate = function() {
      return Roles.userHasPermission(Meteor.userId(), 'collection.' + self.name + '.showCreate');
    }
    this.helpers({
      canShowUpdate: function () {
        return Roles.userHasPermission(Meteor.userId(), 'collection.' + self.name + '.showUpdate', this);
      },
      canShowRemove: function() {
        return Roles.userHasPermission(Meteor.userId(), 'collection.' + self.name + '.showRemove', this);
      }
    });
  }
});