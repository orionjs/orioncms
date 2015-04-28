AutoForm.addHooks('updateProfileForm', {
  onSuccess: function() {
    Router.go('myAccount.index');
  }
});