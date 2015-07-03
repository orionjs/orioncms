Template.orionMaterializeAccountsIndex.events({
  'click tr': function(event) {
    if (!$(event.target).is('td')) return;
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (rowData) {
      Router.go('accounts.update', rowData);
    }
  }
});
