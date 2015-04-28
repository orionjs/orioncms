Template.orionMaterializeCollectionsUpdate.events({
  'click .save-btn': function () {
    $('#orionMaterializeCollectionsUpdateForm').submit();
  }
});

AutoForm.addHooks('orionMaterializeCollectionsUpdateForm', {
  onSuccess: function() {
    Router.go(this.collection.indexPath());
  }
});