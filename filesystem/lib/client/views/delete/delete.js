Template.adminFilesDelete.events({
	'click .confirm-btn': function (event, template) {
		var file =  Router.current().data().file;
		try {
			if (file.canRemove) {
				orion.filesystem.remove(file._id);
			} else {
				alert('Can\'t Remove!');
			}
        } catch (e) {
            
        }
		Router.go('adminFilesIndex'); 
	}
});