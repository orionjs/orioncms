orion.templates = {};

/**
 * We will save all the templates that any component need
 */
orion.templates.request = function(name, defaultTemplate) {
  check(name, String);
  check(defaultTemplate, Match.Optional(String));
  orion.options.init('template.' + name, defaultTemplate);
}

/**
 * Reactively returns the name of the template
 */
orion.templates.get = function(name) {
  return orion.options.get('template.' + name);
}

/**
 * Assings a template to a template request
 */
orion.templates.set = function(requestedName, templateName) {
  return orion.options.set('template.' + requestedName, templateName);
}

if (Meteor.isClient) {

  /**
   * Set helpers to a template that maybe it doensn't exists yet
   */
  orion.templates.setHelpers = function(templateName, helpers) {
    Tracker.autorun(function () {
      var template = orion.templates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].helpers(helpers);
      }
    });
  }

  /**
   * Set events to a template that maybe it doensn't exists yet
   */
  orion.templates.setEvents = function(templateName, events) {
    Tracker.autorun(function () {
      var template = orion.templates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].events(events);
      }
    });
  }

  /**
   * Set onRendered to a template that maybe it doensn't exists yet
   */
  orion.templates.setOnRendered = function(templateName, onRendered) {
    Tracker.autorun(function () {
      var template = orion.templates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onRendered(onRendered);
      }
    });
  }

  /**
   * Set onCreated to a template that maybe it doensn't exists yet
   */
  orion.templates.setOnCreated = function(templateName, onCreated) {
    Tracker.autorun(function () {
      var template = orion.templates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onCreated(onCreated);
      }
    });
  }

  /**
   * Set onDestroyed to a template that maybe it doensn't exists yet
   */
  orion.templates.setOnDestroyed = function(templateName, onDestroyed) {
    Tracker.autorun(function () {
      var template = orion.templates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onDestroyed(onDestroyed);
      }
    });
  }
}