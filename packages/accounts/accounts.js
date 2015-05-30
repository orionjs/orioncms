orion.accounts = {};

/**
 * Initialize the profile schema option with its default value
 */
Options.init('profileSchema', {
  name: { type: String }
});

/**
 * Updates the profile schema reactively
 */
Tracker.autorun(function () {
  orion.accounts.profileSchema = new SimpleSchema({
    profile: {
      type: new SimpleSchema(Options.get('profileSchema'))
    }
  });
});

/**
 * Initialize accounts options
 * If there is no admin, we allow to create accounts
 */
Options.init('defaultRoles', []);
Options.init('forbidClientAccountCreation', true);

/**
 * We will use listen instead of tracker because on client tracker starts after meteor.startup
 */
Options.listen('forbidClientAccountCreation', function(value) {
  AccountsTemplates.configure({
    forbidClientAccountCreation: orion.adminExists && value,
  });
})

/**
 * Adds the "name" field to the sign up form
 */
AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: 'Name',
    placeholder: 'Your name',
    required: true,
});

EnrolledUsers = new Mongo.Collection("enrolledUsers");
