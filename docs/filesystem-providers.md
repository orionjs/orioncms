# Filesystem Providers

You can setup a provider and orion will automatically upload
all the files through this, and all packages compatible with orion should too.

### Provider Upload

```js
orion.filesystem.providerUpload(options, success, failure, progress)
```

- ```option``` **Object**. Attribute that will contain information about the upload.
But the only important thing is ```option.fileList```, which is equivalent
to ```$(".fileinput")[0].files```. It only contains one file.

- ```success(publicUrl, [meta])``` **Function**. When the file is uploaded call this function so orion
can register the file in the database and we can see it in the admin interface.

  - ```publicUrl``` **String**. The url of the uploaded file.

  - ```meta``` **Object**. A object containing whatever you want. For example
  you can save here the local path of the file.

- ```failure(error)``` **Function**. If the upload fails call this function.

  - ```error``` **Object**. The upload error description.

- ```progress(percent)``` **Function**. Call this function when the progress has changed.

  - ```percent``` **Number**. The current progress, from 0 to 1.

Example:

```js
/**
 * Official S3 Upload Provider
 *
 * Please replace this function with the
 * provider you prefer.
 *
 * If success, call success(publicUrl);
 * you can pass data and it will be saved in file.meta
 * Ej: success(publicUrl, {local_path: '/user/path/to/file'})
 *
 * If it fails, call failure(error).
 *
 * When the progress change, call progress(newProgress)
 */
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
```

### Provider Remove

```js
orion.filesystem.providerRemove(file, success, failure)
```

- ```file``` **Object**. The object representing the file.

- ```success()``` **Function**. When the file is removed call this function so orion
can delete the file from the database.

- ```failure(error)``` **Function**. If the remove fails call this function.

  - ```error``` **Object**. The remove error description.

Example:

```js
/**
 * Official S3 Remove Provider
 *
 * Please replace this function with the
 * provider you prefer.
 *
 * If success, call success();
 * If it fails, call failure(error).
 */
orion.filesystem.providerRemove = function(file, success, failure)  {
  S3.delete(file.meta.s3Path, function(error, result) {
    if (error) {
      failure(error);
    } else {
      success();
    }
  })
}
```
