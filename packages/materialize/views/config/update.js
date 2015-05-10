Template.orionMaterializeConfigUpdate.helpers({
  getDataForTabs: function () {
    var categories = orion.config.getCategories();
    return categories.map(function (category) {
      return {
        title: category,
        onClick: function() {
          Session.set('configUpdateCurrentCategory', category);
        },
        class: function() {
          return Session.get('configUpdateCurrentCategory') == category ? 'btn-default disabled': 'btn-primary';
        }
      };
    });
  }
});
