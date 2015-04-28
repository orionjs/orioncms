Template.orionMaterializeLayout.onRendered(function() {
  $(".button-collapse").sideNav();
})

Template.orionMaterializeTabs.onRendered(function() {
  this.$('ul.tabs').tabs();
})

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