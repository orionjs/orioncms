if (Meteor.isClient) {
  orion.filesystem.providerUpload = function(options, success, failure, progress) {
    S3.upload({
      files: options.fileList,
      path: 'orionjs',
    }, function(error, result) {
      if (error) {
        failure(error);
      } else {
        success(result.secure_url, { s3Path: result.relative_url });
      }
      S3.collection.remove({})
    });
    Tracker.autorun(function () {
      var file = S3.collection.findOne();
      if (file) {
        progress(file.percent_uploaded);
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
}

orion.config.add('AWS_API_KEY', 'aws')
orion.config.add('AWS_API_SECRET', 'aws', { secret: true })
orion.config.add('AWS_S3_BUCKET', 'aws')

if (Meteor.isServer) {
  S3.config = {
    key: orion.config.get('AWS_API_KEY', 'key'),
    secret: orion.config.get('AWS_API_SECRET', 'secret'),
    bucket: orion.config.get('AWS_S3_BUCKET', 'bucket')
  };
}