Orion Filesystem
================

The filesystem module is a unified upload system that keep track
of all the files that are uploaded to orion and use any provider
you want.

![alt tag](http://i.imgur.com/Rl3Mpvi.jpg)

## Getting Started

Install filesystem

```sh
meteor add orionjs:filesystem
```

Install the provider 
(currently the only one is S3. 
To use S3 need to config some things, see [here](https://github.com/orionjs/s3))

```sh
meteor add orionjs:s3
```

## Creating a Provider

You can setup a provider and orion will automatically upload 
all the files through this, and all packages in compatible with orion should too.

### Provider Upload

```js
orion.filesystem.providerUpload(options, success, failure)
``` 

- ```option``` **Object**. Attribute that will contain information about the upload.
But the only important thing is ```option.fileList```, which is equivalent
to ```$(".fileinput")[0].files```. It only contains one file.

- ```success(publicUrl, [meta])``` **Function**. When the file is uploaded call this function so orion
can register the file in the database and we can see it in the admin.

	- ```publicUrl``` **String**. The url of the uploaded file.

	- ```meta``` **Object**. A object containing whatever you want. For example 
	you can save here the local path of the file.

- ```failure(error)``` **Function**. If the upload fails call this function.
	
	- ```error``` **Object**. The upload error description.

Example: 

```js
// Official S3 Upload Provider
orion.filesystem.providerUpload = function(options, success, failure) {
	/**
     * Here you will recive the file in the variable options.fileList.
     *
     * You have to upload the file using the method you want.
     *
     * If the file was uploaded successfully call success(fileUrl, optionalData)
     * The optionalData will be saved in the meta variable
     *
     * If not call failure(error).
     */
	S3.upload(options.fileList, "/orionjs", function(error, result) {
		if (error) {
			failure(error);
		} else {
			success(result.url, { s3Path: result.relative_url });
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
// Official S3 Remove Provider
orion.filesystem.providerRemove = function(file, success, failure)  {
	/**
     * Here you will recive the file object, containing the url and 
     * the optionalData in file.meta.
     *
     * You have remove the file.
     *
     * If the file was removed successfully call success()
     *
     * If not call failure(error).
     */
	S3.delete(file.meta.s3Path, function(error, result) {
		if (error) {
			failure(error);
		} else {
			success();
		}
	})
}
```

## Uploading Files Through Filesystem

If you want to make an extension for orion and
you need to upload files, you **must** use this.

Example:

```js
orion.filesystem.upload({
    fileList: fileInput[0].files, 
    name: 'file.txt', 
    folder: 'my-extension-files', 
    canRemove: true // Can the admin delete manually the files
}, function(file, error) {
    if (!error) {
        console.log(file, "file uploaded")
    } else {
        console.log(error, "error uploading file")
    }
});
```

### Removing Files

Example:

```js
var fileId = 'The id of the file';
orion.filesystem.remove(fileId, function(error) {
	if (!error) {
		console.log('File removed');
	}
});
```
