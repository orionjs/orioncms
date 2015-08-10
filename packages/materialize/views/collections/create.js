Template.orionMaterializeCollectionsCreate.events({
  'click .create-btn': function () {
    $('#orionMaterializeCollectionsCreateForm').submit();
  }
});


AutoForm.addHooks('orionMaterializeCollectionsCreateForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
