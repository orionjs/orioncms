Template.orionBootstrapDictionaryUpdate.helpers({
  getDataForTabs: function () {
    var categories = orion.dictionary.availableCategories();
    return categories.map(function (category) {
      return {
        title: category,
        onClick: function() {
          Session.set('dictionaryUpdateCurrentCategory', category);
        },
        class: function() {
          return Session.get('dictionaryUpdateCurrentCategory') == category ? 'btn-default disabled': 'btn-primary';
        }
      }
    });
  }
});