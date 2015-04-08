/**
 * Init the template name variable
 */
orion.admin.requestTemplate('dictionaryUpdate');

/**
 * Register the route 
 */
Router.route('/admin/dictionary', function () {
  this.render(orion.admin.template('dictionaryUpdate'));
}, { name: 'dictionary.update' });

/**
 * Create the template helpers for a dictionary
 */

if (Meteor.isClient) {
  orion.admin.setTemplateHelpers('dictionaryUpdate', {
    getDoc: function() {
      return orion.dictionary.findOne();
    }
  })
}

