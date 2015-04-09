orion.collections.onCreated(function() {
  var self = this;
  // if the collection doesn't has the tabular option, nothing to do here!
  if (!_.has(this, 'tabular')) return;

  var tabularOptions = _.extend({
    name: 'tabular_' + this.name,
    collection: this,
    columns: [
      { data: "_id", title: "ID" }
    ]
  }, this.tabular);

  this.tabularTable = new Tabular.Table(tabularOptions);
});