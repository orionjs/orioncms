i18n.setDefaultLanguage('en');
i18n.showMissing('[no translation for "<%= label %>" in <%= language %>]');

if (Meteor.isClient) {
  /**
   * Detects and set the language
   */
  detectLanguage = function() {
    var language = window.navigator.userLanguage || window.navigator.language;
    language = language.split('-')[0];
    i18n.setLanguage(language);
    T9n.setLanguage(language);
  };

  /**
   * Detects and set the language on startup
   */
  Meteor.startup(function () {
    detectLanguage();
  });
}
