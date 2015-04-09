ReactiveTemplates = {
  _templates: {},
  _deps: {},
};

/**
 * We will save all the templates that any component need
 */
ReactiveTemplates.request = function(name, defaultTemplate) {
  check(name, String);
  check(defaultTemplate, Match.Optional(String));
  ReactiveTemplates._deps[name] = new Tracker.Dependency;
  ReactiveTemplates._templates[name] = defaultTemplate;
}

/**
 * Reactively returns the name of the template
 */
ReactiveTemplates.get = function(name) {
  if (!_.has(ReactiveTemplates._deps, name)) throw 'Template "' + name + '" is not requested';
  ReactiveTemplates._deps[name].depend();
  return ReactiveTemplates._templates[name];
}

/**
 * Assings a template to a template request
 */
ReactiveTemplates.set = function(requestedName, templateName) {
  if (!_.has(ReactiveTemplates._deps, requestedName)) throw 'Template "' + requestedName + '" is not requested';
  ReactiveTemplates._templates[requestedName] = templateName;
  ReactiveTemplates._deps[requestedName].changed();
}

if (Meteor.isClient) {

  /**
   * Set helpers to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setHelpers = function(templateName, helpers) {
    Tracker.autorun(function () {
      var template = ReactiveTemplates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].helpers(helpers);
      }
    });
  }

  /**
   * Set events to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setEvents = function(templateName, events) {
    Tracker.autorun(function () {
      var template = ReactiveTemplates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].events(events);
      }
    });
  }

  /**
   * Set onRendered to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setOnRendered = function(templateName, onRendered) {
    Tracker.autorun(function () {
      var template = ReactiveTemplates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onRendered(onRendered);
      }
    });
  }

  /**
   * Set onCreated to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setOnCreated = function(templateName, onCreated) {
    Tracker.autorun(function () {
      var template = ReactiveTemplates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onCreated(onCreated);
      }
    });
  }

  /**
   * Set onDestroyed to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setOnDestroyed = function(templateName, onDestroyed) {
    Tracker.autorun(function () {
      var template = ReactiveTemplates.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onDestroyed(onDestroyed);
      }
    });
  }
}