orion.filesystem.providerUpload = function(options, success, failure) {
	S3.upload(options.fileList, "/orionjs", function(error, result) {
		if (error) {
			failure(error);
		} else {
			success(result.secure_url, { s3Path: result.relative_url });
		}
    	
    });
}

orion.filesystem.providerRemove = function(file, success, failure)  {
	S3.delete(file.meta.s3Path, function(error, result) {
		if (error) {
			failure(error);
		} else {
			success();
		}
	})
}

orion.config.add('AWS_API_KEY', 'aws')
orion.config.add('AWS_API_SECRET', 'aws', {secret: true})
orion.config.add('AWS_S3_BUCKET', 'aws')

if (Meteor.isServer) {
	S3.config = {
		key: orion.config.get('AWS_API_KEY', 'key'),
		secret: orion.config.get('AWS_API_SECRET', 'secret'),
		bucket: orion.config.get('AWS_S3_BUCKET', 'bucket')
	};
}