File Attribute For Orion
=========================

The file attribute is perfect to save files or images in entities or the dictionary.
It's integrated with ```orionjs:filesystem```

The file attribute is a **object**. It has the following attributes:

- ```url``` **String**. The url of the uploaded file.

- ```fileId``` **String**. The id of the ```orionjs:filesystem``` file.

## Getting Started

```sh
meteor add orionjs:file-attribute
```

## Examples

Adding to the dictionary

```js
orion.dictionary.addDefinition('logo', 'images', 
	orion.attribute('file', {
	    label: 'Site Logo',
	    optional: true
	})
);
```

Using in templates

```html
<template name="example">
	{{ dict 'logo.url' }}
</template >
```

Adding to entities

```js
orion.addEntity('posts', {
	title: {
		type: String,
		label: "Title",
	},
	image: orion.attribute('file', {
	    label: 'Image',
	    optional: true
	}),
},  {
	sidebarName: 'Posts',
	pluralName: 'Posts',
	singularName: 'Post',
	/**
	 * You have to put here what do you want to show in
	 * the entity index page.
	 * It uses aldeed:tabular. Check the documentation
	 * https://github.com/aldeed/meteor-tabular/
	 */
	tableColumns: [
		{ data:'title', title: 'Title' },
		orion.attributeColumn('file', 'image', 'Image'),
	]
});
```
