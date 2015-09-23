# Basic Attributes

The ```attributes``` package comes with a basic set of attributes that
you can use in your collections.

## Created By

Saves the ```_id``` of the user that created the document.

Example:

```js
Posts = new orion.collection('posts', {
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      orion.attributeColumn('createdBy', 'createdBy', 'Created By')
    ]
  }
});

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  createdBy: orion.attribute('createdBy')
}));
```

## Created At

Saves the date that the document was created automatically.

Example:

```js
Posts = new orion.collection('posts', {
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      orion.attributeColumn('createdAt', 'createdAt', 'Created At')
    ]
  }
});

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  createdAt: orion.attribute('createdAt')
}));
```
