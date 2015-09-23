# File Attribute

The file attribute is perfect to save files in entities or the dictionary.
For images, use image-attribute.
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
orion.dictionary.addDefinition('logo', 'site',
	orion.attribute('file', {
    label: 'Site Logo',
    optional: true
	})
);
```

Using in templates

```html
<template name="example">
	{{ dict 'site.logo.url' }}
</template >
```

Adding to entities

```js
Posts = new orion.collection('posts', {
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      orion.attributeColumn('file', 'image', 'Image'),
    ]
  }
});

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  image: orion.attribute('file', {
    label: 'Image',
    optional: true
  })
}));
```
