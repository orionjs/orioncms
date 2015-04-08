/**
 * Orion Admin
 */
orion.admin = {}

/**
 * Handles admin tabs
 */
orion.options.init('adminTabs')
orion.options.set('adminTabs', []);
orion.admin.addTab = function(options) {
  check(options, {
    section: String,
    routeName: String,
    title: String,
  });

  orion.options.arrayPush('adminTabs', options);
}



