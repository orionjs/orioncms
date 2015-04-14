orion.collections.onCreated(function() {
  var self = this;
  
  /**
   * Collection permissions
   */
  orion.roles.registerAction('collection.' + this.name + '.index', true);
  orion.roles.registerAction('collection.' + this.name + '.insert', true);
  orion.roles.registerAction('collection.' + this.name + '.update', true);
  orion.roles.registerAction('collection.' + this.name + '.remove', true);
  orion.roles.registerAction('collection.' + this.name + '.showCreate', true);
  orion.roles.registerAction('collection.' + this.name + '.showUpdate', true);
  orion.roles.registerAction('collection.' + this.name + '.showRemove', true);

  this.allow({
    insert: function (userId, doc) {
      return orion.roles.allow(userId, 'collection.' + self.name + '.insert', userId, doc)
    },
    update: function (userId, doc, fields, modifier) {
      return orion.roles.allow(userId, 'collection.' + self.name + '.update', userId, doc, fields, modifier)
    },
    remove: function (userId, doc) {
      return orion.roles.allow(userId, 'collection.' + self.name + '.remove', userId, doc)
    }
  });

  this.deny({
    insert: function (userId, doc) {
      return orion.roles.deny(userId, 'collection.' + self.name + '.insert', userId, doc)
    },
    update: function (userId, doc, fields, modifier) {
      return orion.roles.deny(userId, 'collection.' + self.name + '.update', userId, doc, fields, modifier)
    },
    remove: function (userId, doc) {
      return orion.roles.deny(userId, 'collection.' + self.name + '.remove', userId, doc)
    }
  });

  if (Meteor.isClient) {
    this.canIndex = function() {
      return orion.roles.userHasPermission(Meteor.userId(), 'collection.' + self.name + '.index');
    }
    this.canShowCreate = function() {
      return orion.roles.userHasPermission(Meteor.userId(), 'collection.' + self.name + '.showCreate');
    }
    this.canShowUpdate = function() {
      return orion.roles.userHasPermission(Meteor.userId(), 'collection.' + self.name + '.showUpdate');
    }
    this.canShowRemove = function() {
      return orion.roles.userHasPermission(Meteor.userId(), 'collection.' + self.name + '.showRemove');
    }
  }
});