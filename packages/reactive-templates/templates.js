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
  this._deps[name] = new Tracker.Dependency;
  this._templates[name] = defaultTemplate;
}

/**
 * Reactively returns the name of the template
 */
ReactiveTemplates.get = function(name) {
  if (!_.has(this._deps, name)) throw 'Template "' + name + '" is not requested';
  this._deps[name].depend();
  return this._templates[name];
}

/**
 * Assings a template to a template request
 */
ReactiveTemplates.set = function(requestedName, templateName) {
  if (!_.has(this._deps, requestedName)) throw 'Template "' + requestedName + '" is not requested';
  this._templates[requestedName] = templateName;
  this._deps[requestedName].changed();
}

if (Meteor.isClient) {

  /**
   * Set helpers to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setHelpers = function(templateName, helpers) {
    var self = this;
    Tracker.autorun(function () {
      var template = self.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].helpers(helpers);
      }
    });
  }

  /**
   * Set events to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setEvents = function(templateName, events) {
    var self = this;
    Tracker.autorun(function () {
      var template = self.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].events(events);
      }
    });
  }

  /**
   * Set onRendered to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setOnRendered = function(templateName, onRendered) {
    var self = this;
    Tracker.autorun(function () {
      var template = self.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onRendered(onRendered);
      }
    });
  }

  /**
   * Set onCreated to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setOnCreated = function(templateName, onCreated) {
    var self = this;
    Tracker.autorun(function () {
      var template = self.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onCreated(onCreated);
      }
    });
  }

  /**
   * Set onDestroyed to a template that maybe it doensn't exists yet
   */
  ReactiveTemplates.setOnDestroyed = function(templateName, onDestroyed) {
    var self = this;
    Tracker.autorun(function () {
      var template = self.get(templateName);
      if (Blaze.isTemplate(Template[template])) {
        Template[template].onDestroyed(onDestroyed);
      }
    });
  }
}