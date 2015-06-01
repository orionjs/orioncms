AutoForm.addHooks('updateMyProfileForm', {
  onSuccess: function() {
    Router.go('myAccount.index');
  }
});