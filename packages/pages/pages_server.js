Meteor.publish('pages', function (arg1, arg2) {
  arg1 = arg1 ? arg1 : {};
  arg2 = arg2 ? arg2 : {};
  return orion.pages.collection.find(arg1, arg2);
});