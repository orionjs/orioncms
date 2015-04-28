Template.orionBootstrapCollectionsUpdate.events({
  'click .save-btn': function () {
    $('#orionBootstrapCollectionsUpdateForm').submit();
  }
});

AutoForm.addHooks('orionBootstrapCollectionsUpdateForm', {
  onSuccess: function() {
    Router.go(this.collection.indexPath());
  }
});