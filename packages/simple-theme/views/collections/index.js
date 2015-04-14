Template.simpleThemeCollectionsIndex.events({
  'click tr': function(event) {
    if (!$(event.target).is('td')) return;
    var collection = Template.currentData().collection;
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (rowData) {
      if (collection.canShowUpdate()) {
        var path = collection.updatePath(rowData);
        Router.go(path);
      }
    }
  }
});