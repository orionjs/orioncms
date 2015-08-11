AutoForm.addHooks('updateProfileForm', {
  onSuccess: function() {
    RouterLayer.go('myAccount.index');
  }
});
