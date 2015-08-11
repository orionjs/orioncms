Template.orionBootstrapCollectionsCreate.events({
  'click .create-btn': function () {
    $('#orionBootstrapCollectionsCreateForm').submit();
  }
});


AutoForm.addHooks('orionBootstrapCollectionsCreateForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
