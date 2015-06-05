/**
 * Requests a layout template
 */
ReactiveTemplates.request('layout');

/**
 * Requests a layout for auth
 */
ReactiveTemplates.request('outAdminLayout');

/**
 * Handle links. To add tabs to the sidebar
 */
if (Meteor.isClient) {
  Options.init('links', []);

  orion.addLink = function(options) {
    var currentLinks;

    Tracker.nonreactive(function () {
      currentLinks = Options.get('links');
      var currentLink = _.findWhere(currentLinks, { routeName: options.routeName });
      if (currentLink) {
        currentLinks = _.without(currentLinks, currentLink);
      }
    });
    
    check(options, Match.ObjectIncluding({
      section: String,
      title: Match.OneOf(String, Function),
      routeName: String,
      activeRouteRegex: Match.Optional(String),
      permission: Match.Optional(String),
    }));
    currentLinks.push(options);
    Options.set('links', currentLinks);
  };
}

if (Meteor.isClient) {
  /**
   * Set the helpers to the sidebar template for links
   */
  Template.registerHelper('adminLinks', function(section) {
    var links = Options.get('links');
    if (section) {
      links = _.where(links, { section: section });
    }
    _.each(links, function(value, key, list){
      if (value.permission) {
        if (!Roles.userHasPermission(Meteor.userId(), value.permission)) {
          delete list[key];
        }
      }
    });
    return links;
  });

/**
* Set the helpers to the sidebar template for sections.
* This effectively makes admin sidebar dynamic. Now you can pass any section.
*/
  Template.registerHelper('adminSections', function() {
    var links = Options.get('links');
      sections = _(links).chain().flatten().pluck('section').unique().value().sort();
      console.log(sections);
    return sections;
  });

};
