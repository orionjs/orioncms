Template.simpleThemeLayout.events({
  'click .simple-theme-admin.toggled': function() {
    $(".simple-theme-admin").removeClass("toggled");
    $("html,body").removeClass("no-overflow");
  },
  'click .menu-toggle': function () {
    $(".simple-theme-admin").toggleClass("toggled");
    $("html,body").toggleClass("no-overflow");
  }
});