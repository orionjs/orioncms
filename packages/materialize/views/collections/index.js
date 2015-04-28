Template.orionMaterializeCollectionsIndex.events({
  'click tr': function(event) {
    if (!$(event.target).is('td')) return;
    var collection = Template.currentData().collection;
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (rowData) {
      if (rowData.canShowUpdate()) {
        var path = collection.updatePath(rowData);
        Router.go(path);
      }
    }
  }
});

Template.orionMaterializeCollectionsIndex.onRendered(function() {
  this.autorun(function () {
    Template.currentData();
    Session.set('orionMaterializeCollectionsIndex_showTable', false);
    Meteor.defer(function () {
      Session.set('orionMaterializeCollectionsIndex_showTable', true);
    });
  });
})

Template.orionMaterializeCollectionsIndex.helpers({
  showTable: function () {
    return Session.get('orionMaterializeCollectionsIndex_showTable');
  }
});