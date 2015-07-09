Template.orionBootstrapSidebar.onRendered(function() {
  this.autorun(function() {
    var depend = orion.links._collection.find().fetch();
    $('.orion-links a[data-toggle="collapse"]').collapse()
  })
})
