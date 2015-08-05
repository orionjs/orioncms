Template.orionBootstrapLayout.events({
  'click .orion-bootstrap-admin.toggled': function() {
    if ($(window).width() < 768) {
      $(".orion-bootstrap-admin").removeClass("toggled");
      $("html,body").removeClass("no-overflow");
    }
  },
  'click .menu-toggle': function () {
    $(".orion-bootstrap-admin").toggleClass("toggled");
    $("html,body").toggleClass("no-overflow");
  }
});

Template.orionBootstrapHeader.events({
  'click .logout': function() {
    Meteor.logout();
  }
});

Template.orionBootstrapTabs.helpers({
  items: function () {
    return this;
  }
});

Template.orionBootstrapTabs.events({
  'click a': function () {
    this.onClick();
  }
});
