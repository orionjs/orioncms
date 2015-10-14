orion.collections.onCreated(function() {
  var self = this;

  var allow = !this.dontAllowByDefault;

  /**
   * Collection permissions
   */
  Roles.registerAction('collections.' + this.name + '.index', allow);
  Roles.registerAction('collections.' + this.name + '.showCreate', allow);
  Roles.registerAction('collections.' + this.name + '.showUpdate', allow);
  Roles.registerAction('collections.' + this.name + '.showRemove', allow);
  Roles.registerHelper('collections.' + this.name + '.indexFilter', allow && {});

  this.attachRoles('collections.' + this.name);

  if (Meteor.isClient) {
    this.canIndex = function() {
      return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.index');
    };
    this.canShowCreate = function() {
      return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showCreate');
    };
    this.getHiddenFields = function() {
      var docId = RouterLayer.getParam('_id');
      return _.union.apply(this, Roles.helper(Meteor.userId(), 'collections.' + self.name + '.forbiddenFields', docId));
    };
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
