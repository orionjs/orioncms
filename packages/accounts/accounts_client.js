/**
 * Fetch the config at the start of the program
 */

orion.adminExists = Injected && Injected.obj('adminExists') && Injected.obj('adminExists').exists;
AccountsTemplates.configure({
  forbidClientAccountCreation: !!orion.adminExists
});