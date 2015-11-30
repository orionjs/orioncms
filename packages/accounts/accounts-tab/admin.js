/**
 * Display account settings
 */
ReactiveTemplates.request('accounts.index');
ReactiveTemplates.request('accounts.update');

/**
 * Register the route
 */
RouterLayer.route('/admin/accounts', {
  layout: 'layout',
  template: 'accounts.index',
  name: 'accounts.index',
  reactiveTemplates: true
});
orion.accounts.addProtectedRoute('accounts.index');

/**
 * Register the link
 */
if (Meteor.isClient) {
  Tracker.autorun(function () {
    orion.links.add({
      index: 80,
      identifier: 'accounts-index',
      title: i18n('accounts.index.title'),
      routeName: 'accounts.index',
      activeRouteRegex: 'accounts',
      permission: 'accounts.index'
    });
  });
}

/**
 * Tabular table
 */
var tabularOptions = {
  name: 'AccountsIndex',
  stateSave: true,
  collection: Meteor.users,
  allow: function (userId) {
    return Roles.userHasPermission(userId, 'accounts.index'); // don't allow this person to subscribe to the data
  },
  selector: function(userId) {
    var selectors = Roles.helper(userId, 'accounts.indexFilter');
    return { $or: selectors };
  },
  pub: 'adminAccountsIndexTabular',
  columns: [
    {
      data: 'profile.name',
      title: orion.helpers.getTranslation('accounts.index.tableTitles.name'),
      render: function(val, type, doc) {
        return val ? val : '<span class="grey-text help-block">' + i18n('accounts.index.noName') + '</span>';
      }
    },
    {
      data: 'usedServices',
      title: orion.helpers.getTranslation('accounts.index.tableTitles.services'),
      render: function(val, type, doc) {
        var services = _.without(val, 'email', 'resume');
        if (!services.length) {
          var title = i18n('accounts.index.actions.sendEnrollmentEmail');
          return '<button class="btn btn-danger red btn-xs send-enrollment-email-btn" data-user="' + doc._id + '">' + title + '</button>';
        }
        return services.map(function(service) {
          return '<span class="label label-primary blue">' + service + '</span>';
        }).join('');
      }
    },
    {
      data: 'emails',
      title: orion.helpers.getTranslation('accounts.index.tableTitles.email'),
      render: function(val, type, doc) {
        return val && val[0] && val[0].address;
      }
    },
    {
      data: 'roles',
      title: orion.helpers.getTranslation('accounts.index.tableTitles.roles'),
      render: function(val, type, doc) {
        var roles = Roles._collection ? doc.roles() : val || [];
        return roles.map(function(role) {
          return '<span class="label label-danger red">' + role + '</span>';
        }).join('');
      }
    },
    {
      title: orion.helpers.getTranslation('accounts.index.tableTitles.actions'),
      render: function(val, type, doc) {
        return _.filter(orion.accounts._adminUsersButtons, function(value, key, list){
          if (typeof value.shouldShow != 'function') {
            return true;
          }
          return value.shouldShow(doc);
        }).map(function(button, index) {
          return '<a class="btn btn-default btn-xs waves-effect waves-light light-blue accent-4 user-btn-action" data-button-index="' + index + '" data-user="' + doc._id + '">' + button.title + '</a>';
        }).join('');
      }
    }
  ]
};

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
  orion.accounts.indexTabularTable = new Tabular.Table(tabularOptions);
});

/**
 * Edit user
 */
RouterLayer.route('/admin/accounts/:_id/update', {
  layout: 'layout',
  template: 'accounts.update',
  name: 'accounts.update',
  reactiveTemplates: true
});
orion.accounts.addProtectedRoute('accounts.update');

if (Meteor.isClient) {
  Tracker.autorun(function () {
    orion.accounts.addAdminUsersButton({
      title: i18n('accounts.index.actions.edit'),
      route: 'accounts.update',
      shouldShow: function() {
        return Roles.userHasPermission(Meteor.userId(), 'accounts.update.roles');
      }
    });
  });
}
