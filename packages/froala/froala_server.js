 const Api = new Restivus({
 	useDefaultAuth: true,
 	prettyJson: true
 });

 Api.addRoute('froala/images/', {
 	get() {
 		return orion.filesystem.collection.find({uploader: 'image-attribute'}).map(function(image){
 			return {
 				thumb: image.url,
 				url: image.url,
 				tag: "froala" // TODO: add tags to filesystem
 			}
 		});
 	},
 	delete(){ 
 		let {src} = this.bodyParams;
 		// TODO: only allow admin to delete, see also orion:filesystem permission
 		orion.filesystem.collection.remove({url: src});
 		return "";
 	}
 });