Template.orionMaterializeCollectionsUpdate.events({
  'click .save-btn': function () {
    $('#orionMaterializeCollectionsUpdateForm').submit();
  }
});

AutoForm.addHooks('orionMaterializeCollectionsUpdateForm', {
  onSuccess: function() {
    let collection = this.collection;
    Meteor.defer(function() {
      RouterLayer.go(collection.indexPath());
    });
  }
});
