Template.orionMaterializeSidebar.onRendered(function() {
  this.autorun(function() {
    var depend = orion.links._collection.find().fetch();
    $('.materialize-sidebar .collapsible').collapsible();
  })
})
