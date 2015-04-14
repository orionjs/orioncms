AutoForm.addHooks('updateProfileForm', {
  onSuccess: function() {
    Router.go('account.index');
  }
});