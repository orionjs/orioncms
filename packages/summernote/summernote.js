orion.templates.setOnRendered('attribute.summernote', function() {
  this.subscribe('summernoteImages');
  var element = this.$('.summernote');
  element.summernote({
      height: 300,
      onImageUpload: function(files, editor, $editable) {
        // upload file here
      }
  });
  element.code(this.data.value);
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
