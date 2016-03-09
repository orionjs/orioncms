/**
 * Sets the default permissions to new users
 */
Meteor.users.after.insert(function (userId, doc) {
  var curUserId = doc._id;

  if (orion.adminExists) {
    // if there is a admin created we will set the default roles.
    var defaultRoles = Options.get('defaultRoles');
    Roles.addUserToRoles(curUserId, defaultRoles);
  } else {
    // If there is no admin, we will add the admin role to this new user.
    Roles.addUserToRoles(curUserId, 'admin');
    // Pass to the client if the admin exists
    orion.adminExists = true;
    Inject.obj('adminExists', { exists: true });
  }
});


/**
 * Pass to the client if there is a admin account
 */
if (Roles._collection) {
  orion.adminExists = Roles._collection.find({ roles: 'admin' }).count() !== 0;
} else {
  orion.adminExists = Meteor.users.find({ roles: 'admin' }).count() !== 0;
}
Inject.obj('adminExists', { exists: !!orion.adminExists });
AccountsTemplates.configure({
  forbidClientAccountCreation: !!orion.adminExists
});
