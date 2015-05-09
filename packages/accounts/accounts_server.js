/**
 * Sets the default permissions to new users
 */
Meteor.users.after.insert(function (userId, doc) {
  var curUserId = doc._id;

  if (orion.adminExists) {
    // if there is a admin created we will set the default roles.

    if (Roles._collection.find({ userId: curUserId }).count() === 0) {
      var defaultRoles = Options.get('defaultRoles');
      Roles.addUserToRoles(curUserId, defaultRoles);
    }
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
orion.adminExists = Roles._collection.find({ roles: 'admin' }).count() !== 0;
Inject.obj('adminExists', { exists: orion.adminExists });
AccountsTemplates.configure({
  forbidClientAccountCreation: !!orion.adminExists
});
