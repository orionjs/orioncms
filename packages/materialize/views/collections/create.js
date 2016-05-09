Template.orionMaterializeCollectionsCreate.events({
  'click .create-btn': function () {
    $('#orionMaterializeCollectionsCreateForm').submit();
  }
});


AutoForm.addHooks('orionMaterializeCollectionsCreateForm', {
  onSuccess: function() {
    let collection = this.collection;
    Meteor.defer(function() {
      RouterLayer.go(collection.indexPath());
    });
  }
});
