Template.adminFilesIndex.helpers({
	files: function () {
		var folder = Router.current().params.query.path ? Router.current().params.query.path : null;
		return orion.filesystem.files.collection.find({folder: folder});
	},
	folders: function() {
		var folder = Router.current().params.query.path ? Router.current().params.query.path : '';
		var patern = new RegExp(folder + '.+', 'i');
		var folders = [];
		orion.filesystem.files.collection.find({folder: patern}).fetch().map(function (file) {
			var label = file.folder;
			var path = "";
			if (folder) {
				path = folder + "/";
				label = label.replace(folder + "/", "");
			}
			label = label.split('/')[0];
			if (!_.findWhere(folders, {path: path + label, label: label})) {
				folders.push({path: path + label, label: label});
			}
		});
		return folders;
	},
	breadcrumb: function() {
		var folder = Router.current().params.query.path ? Router.current().params.query.path : '';
		if (!folder) {
			return [];
		}
		var folders = folder.split('/');
		var accumulation = [];
		return folders.map(function(item, index) {
			var item = {name: item};
			item.index = index;
			accumulation.push(item.name);
			item.query = 'path=' + accumulation.join('/');
			item.isLast = index == folders.length -1;
			return item;
		})
	},
	upFolderQuery: function() {
		var folder = Router.current().params.query.path ? Router.current().params.query.path : '';
		folder = folder.split('/');
		folder.pop();
		return 'path=' + folder.join('/');
	},
	isOnTop: function() {
		return !Router.current().params.query.path;
	},
	currentFolder: function() {
		return Router.current().params.query.path ? Router.current().params.query.path : '';
	}
});

Template.adminFilesIndexFolder.helpers({
	query: function () {
		return 'path=' + this.path;
	}
});

Template.adminFilesIndex.rendered = function () {
	$(".add-file").tooltip({
		placement: 'right'
	});
};