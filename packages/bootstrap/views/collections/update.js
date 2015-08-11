Template.orionBootstrapCollectionsUpdate.events({
  'click .save-btn': function () {
    $('#orionBootstrapCollectionsUpdateForm').submit();
  }
});

AutoForm.addHooks('orionBootstrapCollectionsUpdateForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
