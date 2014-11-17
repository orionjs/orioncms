Orion
====

<<<<<<< HEAD
Simple CMS for meteor

http://orion.meteor.com/
=======
Meteor CMS is now [orion](http://orion.meteor.com/). The code is more organized and extendable.

## Migration

- Change ```cms``` to ```orion```. Example:

```js
cms.dictionary.addDefinition('siteName', 'basic', {
	type: String,
	label: "Site Name",
	optional: true,
});

// To

orion.dictionary.addDefinition('siteName', 'basic', {
	type: String,
	label: "Site Name",
	optional: true,
});
```

- If you are using the image attribute install ```orionjs:image-attribute``` and change ```cms.attributesIndexTable.image('image', 'Image')``` to ```orion.adminIndexAttributeViews.image('image', 'Image')```

- Now you have to use your own bootstrap theme.
>>>>>>> FETCH_HEAD
