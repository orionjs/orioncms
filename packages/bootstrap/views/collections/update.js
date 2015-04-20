Template.simpleThemeCollectionsUpdate.events({
  'click .save-btn': function () {
    $('#simpleThemeCollectionsUpdateForm').submit();
  }
});

AutoForm.addHooks('simpleThemeCollectionsUpdateForm', {
  onSuccess: function() {
    Router.go(this.collection.indexPath());
  }
});