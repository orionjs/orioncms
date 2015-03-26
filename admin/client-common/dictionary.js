/**
 * adminDictionaryUpdate
 */
orion.admin.dictionaryUpdateHelpers = {
	getDoc: function() {
		return orion.dictionary.collection.findOne();
	},
	allCategories: function() {
		return _.keys(orion.dictionary.categories);
	},
	isActiveCategory: function() {
		return this == Router.current().data().category ? 'label-primary' : 'label-default';
	},
	getPermission: function() {
		return 'dictionary.' + this;
	},
	getDocOnLanguage: function() {
		var currentLanguage = orion.languages.getCurrentLanguage()
		var dict = orion.dictionary.collection.findOne()
		return (dict._languages && currentLanguage && dict._languages[currentLanguage.identifier]) || {};
	},
	getLanguageSchema: function() {
		return orion.dictionary.collection.simpleSchema();
	}
}

var prependKeys = function(object, prefix) {
	if (!object) return null;

	var keys = Object.keys(object),
        keysLen = keys.length;

    for(var i=0; i<keysLen ;i++){
        object[prefix+keys[i]] = object[keys[i]];
        delete object[keys[i]];
    }

    return object;
}

AutoForm.hooks({
	updateDictionaryFormOnLanguage: {
		onSubmit: function (doc, docUpdate) {
			var currentLanguage = orion.languages.getCurrentLanguage()
			var dict = orion.dictionary.collection.findOne()
			if (!currentLanguage) return false;

			var set = prependKeys(docUpdate['$set'], '_languages.' + currentLanguage.identifier + '.');
			var unset = prependKeys(docUpdate['$unset'], '_languages.' + currentLanguage.identifier + '.');
			var operator = {};
			if (set) {
				operator['$set'] = set;
			}
			if (unset) {
				operator['$unset'] = unset;
			}
			
			orion.dictionary.collection.update(dict._id, operator);
			this.done();
			return false;
		}
	}
});