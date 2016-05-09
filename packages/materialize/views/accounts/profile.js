AutoForm.addHooks('updateProfileForm', {
  onSuccess: function() {
    let collection = this.collection;
    Meteor.defer(function() {
      RouterLayer.go(collection.indexPath());
    });
  }
});
