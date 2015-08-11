Template.orionMaterializeCollectionsUpdate.events({
  'click .save-btn': function () {
    $('#orionMaterializeCollectionsUpdateForm').submit();
  }
});

AutoForm.addHooks('orionMaterializeCollectionsUpdateForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
