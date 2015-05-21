orion.collections.onCreated(function() {
  var self = this;
  
  /**
   * Collection permissions
   */
  Roles.registerAction('collections.' + this.name + '.index', true);
  Roles.registerAction('collections.' + this.name + '.insert', true);
  Roles.registerAction('collections.' + this.name + '.update', true);
  Roles.registerAction('collections.' + this.name + '.remove', true);
  Roles.registerAction('collections.' + this.name + '.showCreate', true);
  Roles.registerAction('collections.' + this.name + '.showUpdate', true);
  Roles.registerAction('collections.' + this.name + '.showRemove', true);
  Roles.registerHelper('collections.' + this.name + '.indexFilter', {});

  this.allow({
    insert: function (userId, doc) {
      return Roles.allow(userId, 'collections.' + self.name + '.insert', userId, doc)
    },
    update: function (userId, doc, fields, modifier) {
      return Roles.allow(userId, 'collections.' + self.name + '.update', userId, doc, fields, modifier)
    },
    remove: function (userId, doc) {
      return Roles.allow(userId, 'collections.' + self.name + '.remove', userId, doc)
    }
  });

  this.deny({
    insert: function (userId, doc) {
      return Roles.deny(userId, 'collections.' + self.name + '.insert', userId, doc)
    },
    update: function (userId, doc, fields, modifier) {
      return Roles.deny(userId, 'collections.' + self.name + '.update', userId, doc, fields, modifier)
    },
    remove: function (userId, doc) {
      return Roles.deny(userId, 'collections.' + self.name + '.remove', userId, doc)
    }
  });

  if (Meteor.isClient) {
    this.canIndex = function() {
      return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.index');
    }
    this.canShowCreate = function() {
      return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showCreate');
    }
    this.helpers({
      canShowUpdate: function () {
        return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showUpdate', this);
      },
      canShowRemove: function() {
        return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showRemove', this);
      }
    });
  }
});