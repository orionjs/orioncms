/**
 * Handle links. To add tabs to the sidebar
 */
orion.options.init('links', []);
orion.addLink = function(options) {
  check(options, {
    section: String,
    title: String,
    routeName: String,
    activeRouteRegex: Match.Optional(String),
  });
  orion.options.arrayPush('links', options);
}

/**
 * Requests a layout template
 */
orion.templates.request('layout');

if (Meteor.isClient) {
  /**
   * Set the helpers to the layout template
   */
  orion.templates.setHelpers('layout', {
    /**
     * Return the name of the sidebar template.
     * This is used to set dynamically the sidebar.
     */
    linksTemplate: function() {
      return orion.templates.get('links');
    }
  });
}

/**
 * Requests a links template
 */
orion.templates.request('links');

if (Meteor.isClient) {
  /**
   * Set the helpers to the sidebar template
   */
  orion.templates.setHelpers('links', {
    /**
     * Return the links for the admin.
     * You can pass a section and it will filter
     */
    links: function(section) {
      var links = orion.options.get('links');
      if (section) {
        links = _.where(links, { section: section });
      }
      return links;
    }
  });
}

