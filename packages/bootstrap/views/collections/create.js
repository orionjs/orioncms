Template.simpleThemeCollectionsCreate.events({
  'click .create-btn': function () {
    $('#simpleThemeCollectionsCreateForm').submit();
  }
});


AutoForm.addHooks('simpleThemeCollectionsCreateForm', {
  onSuccess: function() {
    Router.go(this.collection.indexPath());
  }
});