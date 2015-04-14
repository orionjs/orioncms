orion.accounts = {};

orion.roles = Roles;

var defaultSchema = {
  name: {
    type: String
  },
}
orion.options.init('profileSchema', defaultSchema);

Tracker.autorun(function () {
  orion.accounts.profileSchema = new SimpleSchema({
    profile: {
      type: new SimpleSchema(orion.options.get('profileSchema'))
    }
  });
});