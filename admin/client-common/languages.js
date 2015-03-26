/**
 * Languages Events
 */
orion.admin.languagesEvents = {
	'click [language-set-default]': function() {
		orion.languages.setCurrentLanguage();
	},
	'click [language-set]': function(event, template) {
		var identifier = $(event.currentTarget).attr('language-set');
		orion.languages.setCurrentLanguage(identifier);
	}
}