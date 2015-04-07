Template.orionAttributesFroala.rendered = function () {
    var key = this.data.name;
    var parent = $('[data-schema-key="' + key + '"]')
    // Find the element
    var element = parent.find('.editor');

    // initialize froala
    element.editable({
        inlineMode: false,
        placeholder: ''
    });

    // set the current value of the attribute
    element.editable("setHTML", this.data.value, true);

    // Handle image uploads
    element.on('editable.beforeImageUpload', function (e, editor, files) {
        orion.filesystem.upload({fileList: files, name: files[0].name, folder: 'froala/images', canRemove: true}, function(file, error) {
            if (!error) {
                element.editable("insertHTML", "<img class='fr-fin' data-file-id='" + file._id + "' src='" + file.url + "'>", true);
            } else {
                console.log(error, "error uploading file")
            }
            $(".editor").editable("hidePopups");
        });
        return false;
    });
    // Handle image deletes
    // If its uploaded through filesystem, it deletes the image and prevent the server call to delete
    element.on('editable.beforeRemoveImage', function (e, editor, img) {
        var imgId = img.attr("data-file-id");
        if (!imgId) {
            return;
        }
        orion.filesystem.remove(imgId);
    });
};

Template.orionAttributesFroalaColumn.helpers({
    preview: function () {
        var value = this.value;
        var tmp = document.createElement("DIV");
        var content = value.replace(/<(?:.|\n)*?>/gm, ' ');
        if(content.length > 50) content = content.substring(0, 47).trim() + '...';
        return content;
    }
});