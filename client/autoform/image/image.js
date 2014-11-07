AutoForm.addInputType("cmsImage", {
	template: "cmsImageInput",
	valueOut: function() {
		return this.attr('src');
	}
});

Template.cmsImageInput.events({
    "change input.filebag": function(){
    	var name = this.name;
    	var imageView = $('[data-schema-key="' + name + '"]')
    	var fileInput = $('input[attr-name="' + name + '"]');
    	var file = fileInput[0].files;

    	imageView.parent().addClass('is-loading');
    	S3.upload(file, "/imgs", function(e, r) {
    		imageView.attr('src', r.url);
			imageView.parent().removeClass('is-loading');
		});
    },
    "click img.image-input": function() {
    	$('[data-schema-key="' + this.name + '"]').attr('src', '');
    }
})