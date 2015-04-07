Template.adminFilesCreate.events({
    "change input.filebag": function(event, template){
    	var name = this.name;
        var fileInput = $('input.filebag');
        var folder = $('input[name="folder"]').val();

        if (fileInput[0].files.length > 0) {
            $(".progress-bar-container").fadeIn();
            var uploadingFile = fileInput[0].files[0];
            var request = {
                fileList: fileInput[0].files, 
                name: uploadingFile.name, 
                folder: folder, 
                canRemove: true
            };
            orion.filesystem.upload(request, function(file, error) {
                if (!error) {
                    Router.go('adminFilesShow', {_id: file._id}); 
                } else {
                    console.log(error, "error uploading file")
                }
                $(".progress-bar-container").fadeOut();
            });
        }
    }
})

Template.adminFilesCreate.helpers({
    folder: function () {
        return Router.current().params.query.path;
    }
});