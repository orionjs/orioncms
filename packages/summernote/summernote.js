orion.templates.setOnRendered('attribute.summernote', function() {
    var key = this.data.name;
    var parent = $('[data-schema-key="' + key + '"]')
    var element = parent.find('.summernote');
    var options = _.extend({
        height: 300,
        onImageUpload: function(files, editor, $editable) {
            parent.find('.progress').show();
            orion.filesystem.upload({fileList: files, name: files[0].name, folder: 'summernote', canRemove: true}, function(file, error) {
                if (!error) {
                    editor.insertImage($editable, file.url);
                } else {
                    console.log(error, "error uploading file")
                }
                parent.find('.progress').hide();
            });
        }
    }, this.data.atts.summernoteOptions);
    element.summernote(options);
    element.code(this.data.value);
})

orion.templates.setHelpers('attribute.summernote', {
    atts: function afSelectAtts() {
        var atts = _.clone(this.atts);

        // Remove summernote options from atts as they cannot necessarily be stringified
        delete atts.summernoteOptions;
        return atts;
    }
})

orion.templates.setHelpers('attributeColumn.summernote', {
    preview: function () {
        var value = this.value;
        var tmp = document.createElement("DIV");
        var content = value.replace(/<(?:.|\n)*?>/gm, ' ');
        if(content.length > 50) content = content.substring(0, 47).trim() + '...';
        return content;
    }
});
