Template.orionAttributesFileUpload.events({
	"click .btn-remove": function(event, template) {
		try {
            orion.filesystem.remove(this.fileId);
        } catch (e) {
        	console.log(e, 'error removing image')
        }
        Session.set('file[' + template.data.name + ']', null);
	},
    "change input": function(event, template) {
    	var self = this;
    	if (event.target.files.length > 0) {
    		Session.set('uploadProgress[' + self.name + ']', 100);
    		var file = event.target.files[0]
    		orion.filesystem.upload({
                fileList: event.target.files,
                name: file.name,
                folder: 'file-attribute',
                canRemove: true
            }, function(file, error) {
                if (!error) {
                    Session.set('file[' + self.name + ']', {
                    	fileId: file._id,
                    	url: file.url
                    });
                } else {
                	alert('error uploading file');
                    console.log(error, "error uploading file")
                    Session.set('file[' + self.name + ']', null);
                }
                Session.set('uploadProgress[' + self.name + ']', null);
            });
    	}
    }
})

Template.orionAttributesFileUpload.helpers({
	uploadProgress: function (name) {
		return Session.get('uploadProgress[' + name + ']');
	},
	file: function(name) {
		return Session.get('file[' + name + ']');
	},
});

Template.orionAttributesFileUpload.rendered = function () {
	Session.set('uploadProgress[' + this.data.name + ']', null);
	Session.set('file[' + this.data.name + ']', this.data.value);
};
