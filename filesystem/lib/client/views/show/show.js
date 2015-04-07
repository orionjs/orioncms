Template.adminFilesShow.helpers({
	breadcrumb: function () {
		var path = Router.current().data().file.folder;
		if (!path) { return [] }
		var folders = path.split('/');
		var accumulation = [];
		return folders.map(function(item, index) {
			var item = {name: item};
			item.index = index;
			accumulation.push(item.name);
			item.query = 'path=' + accumulation.join('/');
			item.isLast = index == folders.length -1;
			return item;
		})
	}
});