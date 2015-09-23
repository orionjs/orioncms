# The Dictionary

Instead of making all the content of your site static, use
**the dictionary** to make all the content editable in the admin interface.

## Getting started

To use the dictionary you just have to define the *definition*
and then the administrator will be able to edit the value in the admin panel.
It doesn't matter if it's an image, HTML, numbers, dates, or a simple
string - everything is just as easy.

### Creating Definitions

To create definitions you just have to set the name, the category
and the type.

```js
orion.dictionary.addDefinition(name, category, attributeSchema)
```

- ```name``` **String**. This is the name of the definition.

- ```category``` **String**. The category of the definition.
In the admin panel, the form will be separated by categories.

- ```attributeSchema``` **Attribute**. Here is where you customize the
definition. Set it to String, Image, HTML, or anything!

Example:

```js
orion.dictionary.addDefinition('description', 'site', {
  type: String,
  label: 'Description'
});
```

### Using the dictionary

Orion lets you get the value of the definitions easily in JavaScript or
directly in HTML.

#### In HTML

In the Meteor templates, call the function `dict`, where the first
argument is the name of the definition and the second is the value that
will be returned if the definition is not set or is empty

```html
<template name="example">
  {{ dict 'site.description' 'No description' }}
</template>
```

#### In JavaScript

Sometimes you might need to use the dictionary in template helpers
or other JavaScript files.

```js
var description = orion.dictionary.get('site.description', 'No description');
```

### Default value

You can set a default value for a dictionary definition while creating it.
Just add the ```defaultValue``` key in the schema:

```js
orion.dictionary.addDefinition('description', 'site', {
  type: String,
  label: 'Description',
  defaultValue: 'My description'
});
```
