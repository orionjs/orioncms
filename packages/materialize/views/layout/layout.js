Template.orionMaterializeLayout.onRendered(function() {
  
});

Template.orionMaterializeHeaderContainer.onRendered(function() {
  $('.button-collapse').sideNav();
  $('.dropdown-button').dropdown({
    constrain_width: true
  });
})

Template.orionMaterializeHeaderContainer.events({
  'click .logout': function() {
    Meteor.logout();
  }
});

Template.orionMaterializeTabs.onRendered(function() {
  this.$('ul.tabs').tabs();
});

Template.orionMaterializeTabs.helpers({
  items: function () {
    return this;
  }
});

Template.orionMaterializeTabs.events({
  'click a': function () {
    this.onClick();
  }
});
