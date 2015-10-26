if (Meteor.isClient) {
  orion.filesystem.providerUpload = function(options, success, failure, progress) {
    var before = _.pluck(S3.collection.find().fetch(), '_id');
    S3.upload({
      files: options.fileList,
      path: orion.config.get('AWS_S3_PATH', 'orionjs'),
    }, function(error, result) {
      if (error) {
        failure(new Meteor.Error('s3-error', i18n('filesystem.messages.errorUploading')));
      } else {
        success(result.secure_url, { s3Path: result.relative_url });
      }
      S3.collection.remove({});
    });
    var after = _.pluck(S3.collection.find().fetch(), '_id');
    var difference = _.difference(after, before);
    var id = difference.length > 0 ? difference[0] : '';

    Tracker.autorun(function () {
      var file = S3.collection.findOne(id);
      if (file) {
        progress(file.percent_uploaded);
      }
    });
  };

  orion.filesystem.providerRemove = function(file, success, failure)  {
    S3.delete(file.meta.s3Path, function(error, result) {
      if (error) {
        failure(new Meteor.Error('s3-error', i18n('filesystem.messages.errorRemoving')));
      } else {
        success();
      }
    });
  };
}

orion.config.add('AWS_API_KEY', 'aws');
orion.config.add('AWS_API_SECRET', 'aws');
orion.config.add('AWS_S3_BUCKET', 'aws');
orion.config.add('AWS_S3_REGION', 'aws', { optional: true });
orion.config.add('AWS_S3_PATH', 'aws', { optional: true });

if (Meteor.isServer) {
  S3.config = {
    key: orion.config.get('AWS_API_KEY', 'key'),
    secret: orion.config.get('AWS_API_SECRET', 'secret'),
    bucket: orion.config.get('AWS_S3_BUCKET', 'bucket'),
    region: orion.config.get('AWS_S3_REGION', 'us-east-1')
  };
}
