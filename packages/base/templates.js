/**
 * We will save all the templates that any component need
 */
orion.admin.requestTemplate = function(name) {
  check(name, String);
  orion.options.init('template.' + name);
}

/**
 * Reactively returns the name of the template
 */
orion.admin.template = function(name) {
  return orion.options.get('template.' + name);
}

/**
 * Assings a template to a template request
 */
orion.admin.setTemplate = function(requestedName, templateName) {
  return orion.options.set('template.' + requestedName, templateName);
}

if (Meteor.isClient) {

  /**
   * Set helpers to a template that maybe it doensn't exists yet
   */
  orion.admin.setTemplateHelpers = function(templateName, helpers) {
    Tracker.autorun(function () {
      var template = orion.admin.template(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].helpers(helpers);
      }
    });
  }

  /**
   * Set events to a template that maybe it doensn't exists yet
   */
  orion.admin.setTemplateEvents = function(templateName, events) {
    Tracker.autorun(function () {
      var template = orion.admin.template(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].events(events);
      }
    });
  }

  /**
   * Set onRendered to a template that maybe it doensn't exists yet
   */
  orion.admin.setTemplateOnRendered = function(templateName, onRendered) {
    Tracker.autorun(function () {
      var template = orion.admin.template(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onRendered(onRendered);
      }
    });
  }

  /**
   * Set onCreated to a template that maybe it doensn't exists yet
   */
  orion.admin.setTemplateOnCreated = function(templateName, onCreated) {
    Tracker.autorun(function () {
      var template = orion.admin.template(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onCreated(onCreated);
      }
    });
  }

  /**
   * Set onDestroyed to a template that maybe it doensn't exists yet
   */
  orion.admin.setTemplateOnDestroyed = function(templateName, onDestroyed) {
    Tracker.autorun(function () {
      var template = orion.admin.template(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onDestroyed(onDestroyed);
      }
    });
  }
}