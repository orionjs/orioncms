# Text Editors

Orion supports 2 text editors. Both upload files through ```orionjs:filesystem```.
**Froala** doesn't require bootstrap.js but it's paid.

You can choose the one that fits more your needs.

> If decide later to change the text editor just change the attribute name in the
definition of the entity or dictionary, you will not loose the content.

This attributes are a **String**.

## Getting Started

```sh
meteor add orionjs:summernote
```

or

```sh
meteor add orionjs:froala
```

## Examples

Adding to the dictionary

```js
orion.dictionary.addDefinition('body', 'texts',
  orion.attribute('summernote')
);
// or
orion.dictionary.addDefinition('body', 'texts',
  orion.attribute('froala')
);
```

Using in templates. Remember to use triple braces.

```html
<template name="example">
  <!-- Remember to use triple braces -->
  {{{ dict 'texts.body' }}}
</template>
```

Adding to entities

```js
Posts = new orion.collection('posts', {
  tabular: {
    columns: [
      { data: 'title', title: 'Title' },
      orion.attributeColumn('summernote' /* or 'froala' */, 'body', 'Preview')
    ]
  }
});

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  body: orion.attribute('summernote' /* or 'froala' */, {
    label: 'Body'
  }),
}));
```
