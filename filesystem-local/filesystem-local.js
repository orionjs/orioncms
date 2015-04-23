var base = "";

if (Meteor.isServer) {
  base = process.env.PWD;
}

Files = new FS.Collection("files", {
  stores: [
    new FS.Store.FileSystem("files", {
        path: base + '/public/files'
    })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Files.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
  });

Files.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

if (Meteor.isClient) {
  orion.filesystem.providerUpload = function(options, success, failure, progress) {

    _.each(options.fileList, function(file)   {

        Files.insert(file, function(err, file) {
            if (err) {
              console.log('error', err);
            } else {
              // recreate upload file pattern
              var fileName = file.collectionName + '-' + file._id + '-' + file.original.name;
              var fileUrl = Meteor.absoluteUrl() + 'thumbs/' + fileName;
              success(fileUrl);
            }
        })
    });
  }

  orion.filesystem.providerRemove = function(file, success, failure)  {
    Files.remove(file._id, function(err) {
        if (err) {
            console.log('error', err);
        }
    });
  }
}