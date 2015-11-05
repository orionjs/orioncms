# Collections

Introduction to collections

## Getting Started

To create an orion collection just replace ```Mongo.Collection``` with ```orion.collection```,
the rest will be done automatically.

```js
myCollection = new orion.collection(name, options);
```

- ```name``` **String**. The name of the collection.

- ```options``` **Object**. Options of the collection.

**Options**

- ```singularName``` **String**. The name of one of these items.

- ```pluralName``` **String**. The name of more than one of these items.

- ```link.title``` **String**. The title of the link in the sidebar.

- ```tabular``` **Object**. Tabular options.

**tabular**

- ```columns``` **Array**. The table columns.


Example:

```js
Posts = new orion.collection('posts', {
  singularName: 'post', // The name of one of these items
  pluralName: 'posts', // The name of more than one of these items
  title: 'posts', // The title in the index of the collection
  link: {
    /**
     * The text that you want to show in the sidebar.
     * The default value is the name of the collection, so
     * in this case it is not necessary.
     */
    title: 'Posts'
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      /**
       * If you want to show a custom orion attribute in
       * the index table you must call this function
       * orion.attributeColumn(attributeType, key, label, options)
       */
      orion.attributeColumn('file', 'image', 'Image'),
      orion.attributeColumn('summernote', 'body', 'Content', { orderable: true }), // makes it searchable
      orion.attributeColumn('createdBy', 'createdBy', 'Created By')
    ]
  }
});
```

### Set Schema

If you set the schema of the collection, orion will create the corresponding forms for it.

```js
Posts.attachSchema(new SimpleSchema(schema));
```

The process is exactly the same as that of [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema)

Example:

```js
/**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
Posts.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  /**
   * The file attribute is a custom orion attribute
   * This is where orion does its magic. Just set
   * the attribute type and it will automatically
   * create the form for the file.
   * WARNING: the url of the image will not be saved in
   * .image, it will be saved in .image.url.
   */
  image: orion.attribute('file', {
      label: 'Image',
      optional: true
  }),
  /**
   * Here it's the same with an image attribute.
   * summernote is an html editor.
   */
  body: orion.attribute('summernote', {
      label: 'Body'
  }),
  /**
   * This attribute sets the user id to that of the user that created
   * this post automatically.
   */
  createdBy: orion.attribute('createdBy')
}));
```
