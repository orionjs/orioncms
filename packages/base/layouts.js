/**
 * Handle links. To add tabs to the sidebar
 */
Options.init('links', []);
orion.addLink = function(options) {
  check(options, Match.ObjectIncluding({
    section: String,
    title: String,
    routeName: String,
    activeRouteRegex: Match.Optional(String),
    permission: Match.Optional(String),
  }));
  Options.arrayPush('links', options);
}

/**
 * Requests a layout template
 */
ReactiveTemplates.request('layout');

if (Meteor.isClient) {
  /**
   * Set the helpers to the layout template
   */
  ReactiveTemplates.helpers('layout', {
    /**
     * Return the name of the sidebar template.
     * This is used to set dynamically the sidebar.
     */
    linksTemplate: function() {
      return ReactiveTemplates.get('links');
    }
  });
}

/**
 * Requests a links template
 */
ReactiveTemplates.request('links');

if (Meteor.isClient) {
  /**
   * Set the helpers to the sidebar template
   */
  ReactiveTemplates.helpers('links', {
    /**
     * Return the links for the admin.
     * You can pass a section and it will filter
     */
    links: function(section) {
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
    }
  });
}

