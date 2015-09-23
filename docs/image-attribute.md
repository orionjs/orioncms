# Image Attribute

The image attribute is perfect to save images in entities or the dictionary.
It's integrated with ```orionjs:filesystem```

The image attribute is a **object**. It has the following attributes:

- ```url``` **String**. The url of the uploaded file.

- ```fileId``` **String**. The id of the ```orionjs:filesystem``` file.

- ```info``` **Info**. Information about the image.

**Info**

- ```width``` **Number**. The width of the image.

- ```height``` **Number**. The height of the image.

- ```backgroundColor``` **String**. The background color of the image, in hex (Example: #333333).

- ```primaryColor``` **String**. The primary color of the image, in hex.

- ```secondaryColor``` **String**. The secondary color of the image, in hex.

> From version 1.3, you can use ```images``` to save a array of images.

## Getting Started

```sh
meteor add orionjs:image-attribute
```

## Examples

Adding to the dictionary

```js
orion.dictionary.addDefinition('logo', 'site',
  orion.attribute('image', {
      label: 'Site Logo',
      optional: true
  })
);
```

Using in templates

```html
<template name="example">
  <img src="{{ dict 'site.logo.url' }}" width="{{ dict 'site.logo.info.width' }}">
</template >
```

Adding to entities

```js
Posts = new orion.collection('posts', {
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      orion.attributeColumn('image', 'image', 'Image'),
    ]
  }
});

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  image: orion.attribute('image', {
    label: 'Image',
    optional: true
  })
}));
```
