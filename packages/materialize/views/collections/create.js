Template.orionMaterializeCollectionsCreate.events({
  'click .create-btn': function () {
    $('#orionMaterializeCollectionsCreateForm').submit();
  }
});


AutoForm.addHooks('orionMaterializeCollectionsCreateForm', {
  onSuccess: function() {
    Router.go(this.collection.indexPath());
  }
});