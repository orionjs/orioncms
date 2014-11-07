cms.imageAttribute = new SimpleSchema({
	link: {
		type: String,
		label: "Image",
		autoform: {
			type: 'cmsImage'
		}
	}
});

cms.imageIndexTableAttribute = function(key, label) {
	return {
		key: key, 
		label: label,
		fn: function (value) {
			if (value) {
				return new Spacebars.SafeString('<img src="' + value.link + '" class="data-table-image">');
			}
		}
	}
}