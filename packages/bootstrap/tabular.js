orion.accounts.tabular = new Tabular.Table({
  name: 'AccountsIndex',
  collection: Meteor.users,
  columns: [
    {
      data: 'profile.name',
      title: i18n('accounts.index.tableTitles.name'),
      render: function(name, type) {
        if (name) {
          return '<b>' + name + '</b>';
        } else {
          return '<b>NA</b>';
        }
      }
    },
    {
      data: 'emails',
      title: i18n('accounts.index.tableTitles.email'),
      render: function(emails) {
        return emails.map(function(email) {
          return email.address;
        }).join(', ');
      }
    },
    {
      title: i18n('accounts.index.tableTitles.enrolled'),
      tmpl: Meteor.isClient && Template[ReactiveTemplates.get('accounts.index.enrolled')]
    },
    {
      data: 'roles()',
      title: i18n('accounts.index.tableTitles.roles'),
      render: function(roles) {
        var labels = roles.map(function(role) {
          return '<span class="label label-danger">' + role + '</span>';
        });
        return labels.join(' ');
      }
    },
    {
      title: i18n('accounts.index.tableTitles.actions'),
      tmpl: Meteor.isClient && Template[ReactiveTemplates.get('accounts.index.buttons')]
    }
  ]
});

orion.collections.onCreated(function() {
  var self = this;
  // if the collection doesn't has the tabular option, nothing to do here!
  if (!_.has(this, 'tabular')) return;

  var tabularOptions = _.extend({
    name: 'tabular_' + this.name,
    collection: this,
    columns: [
      { data: "_id", title: "ID" }
    ],
    selector: function(userId) {
      var selectors = Roles.helper(userId, 'collections.' + self.name + '.indexFilter');
      return { $or: selectors };
    },
    language: {
      search: i18n('tabular.search'),
      info: i18n('tabular.info'),
      infoEmpty: i18n('tabular.infoEmpty'),
      lengthMenu: i18n('tabular.lengthMenu'),
      emptyTable: i18n('tabular.emptyTable'),
      paginate: {
        first: i18n('tabular.paginate.first'),
        previous: i18n('tabular.paginate.previous'),
        next: i18n('tabular.paginate.next'),
        last: i18n('tabular.paginate.last'),
      }
    }
  }, this.tabular);

  Tracker.autorun(function () {
    tabularOptions.columns.map(function (column) {
      if (_.isFunction(column.title)) {
        column.langTitle = column.title;
      }
      if (_.isFunction(column.langTitle)) {
        column.title = column.langTitle();
      }
      return column;
    });
    self.tabularTable = new Tabular.Table(tabularOptions);
  });
});
