Options.init('homePath');
Options.init('siteName');
Options.init('materialize.headerColor');

ReactiveTemplates.request('tabs', 'orionMaterializeTabs');

ReactiveTemplates.request('materializeHeader', 'orionMaterializeHeaderContainer');
ReactiveTemplates.request('materializeContent', 'orionMaterializeContentContainer');
ReactiveTemplates.request('materializeButtons', 'orionMaterializeButtonsContainer');

ReactiveTemplates.set('layout', 'orionMaterializeLayout');
ReactiveTemplates.set('outAdminLayout', 'orionMaterializeOutAdminLayout');

ReactiveTemplates.set('login', 'orionMaterializeLogin');
ReactiveTemplates.set('registerWithInvitation', 'orionMaterializeRegisterWithInvitation');

ReactiveTemplates.set('myAccount.index', 'orionMaterializeAccountIndex');
ReactiveTemplates.set('myAccount.password', 'orionMaterializeAccountPassword');
ReactiveTemplates.set('myAccount.profile', 'orionMaterializeAccountProfile');

ReactiveTemplates.set('accounts.index', 'orionMaterializeAccountsIndex');
ReactiveTemplates.set('accounts.update', 'orionMaterializeAccountsUpdate');
ReactiveTemplates.set('accounts.create', 'orionMaterializeAccountsCreate');

ReactiveTemplates.set('configUpdate', 'orionMaterializeConfigUpdate');
ReactiveTemplates.set('dictionaryUpdate', 'orionMaterializeDictionaryUpdate');

// Set the default entity templates
Options.set('collectionsDefaultIndexTemplate', 'orionMaterializeCollectionsIndex');
Options.set('collectionsDefaultCreateTemplate', 'orionMaterializeCollectionsCreate');
Options.set('collectionsDefaultUpdateTemplate', 'orionMaterializeCollectionsUpdate');
Options.set('collectionsDefaultDeleteTemplate', 'orionMaterializeCollectionsDelete');

// Orion attributes replace
ReactiveTemplates.set('attribute.file', 'orionMaterializeFileAttribute');
ReactiveTemplates.set('attribute.hasOne', 'orionMaterializeHasOneAttribute');
ReactiveTemplates.set('attribute.hasMany', 'orionMaterializeHasManyAttribute');
ReactiveTemplates.set('attribute.user', 'orionMaterializeHasOneAttribute');
ReactiveTemplates.set('attribute.users', 'orionMaterializeHasManyAttribute');

// Pages
ReactiveTemplates.set('pages.index', 'orionMaterializePagesIndex');
ReactiveTemplates.set('pages.create', 'orionMaterializePagesCreate');
ReactiveTemplates.set('pages.update', 'orionMaterializePagesUpdate');
ReactiveTemplates.set('pages.delete', 'orionMaterializePagesDelete');

if (Meteor.isClient) {
  AutoForm.setDefaultTemplate('materialize');

  Meteor.startup(function() {
    Session.set('orion_autoformLoading', false);
  });

  AutoForm.addHooks(null, {
    beginSubmit: function() {
      Session.set('orion_autoformLoading', true);
    },

    endSubmit: function() {
      Session.set('orion_autoformLoading', false);
    },
  });

  Template.registerHelper('orion_autoformLoading', function() {
    return Session.get('orion_autoformLoading') ? 'disabled' : '';
  });

  Template.registerHelper('materializeHeader', function() {
    return ReactiveTemplates.get('materializeHeader');
  });

  Template.registerHelper('materializeContent', function() {
    return ReactiveTemplates.get('materializeContent');
  });

  Template.registerHelper('materializeButtons', function() {
    return ReactiveTemplates.get('materializeButtons');
  });
}
