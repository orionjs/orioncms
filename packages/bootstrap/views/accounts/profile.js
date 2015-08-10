AutoForm.addHooks('updateMyProfileForm', {
  onSuccess: function() {
    RouterLayer.go('myAccount.index');
  }
});
