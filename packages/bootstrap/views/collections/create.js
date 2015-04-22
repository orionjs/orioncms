Template.orionBootstrapCollectionsCreate.events({
  'click .create-btn': function () {
    $('#orionBootstrapCollectionsCreateForm').submit();
  }
});


AutoForm.addHooks('orionBootstrapCollectionsCreateForm', {
  onSuccess: function() {
    Router.go(this.collection.indexPath());
  }
});