# Attributes

You need to understand attributes to make the dictionary
and entities (Schema).

***Attributes and Schema***

```js
// Attribute (Used in the dictionary)
{
	type: String,
	label: "Title",
}

// Schema (Used in entities)
{
	title: {
		type: String,
		label: "Title",
	},
	body: {
		type: String,
		label: "Body",
	}
}
```

## The Attribute Object

The orion attribute relies on [aldeed:collection2](https://github.com/aldeed/meteor-collection2) and
[aldeed:autoform](https://github.com/aldeed/meteor-autoform).
So everything that it's supported in [aldeed:autoform](https://github.com/aldeed/meteor-autoform)
it's supported in orion.

You can check the [documentation](https://github.com/aldeed/meteor-autoform).
**I recommend you to check the [autoform playground](http://autoform.meteor.com/)
to learn more about attributes**

- **Simple String with a maximun of 200 characters**
```js
{
	type: String,
	label: "Text",
	optional: true, // defaults to false
	max: 200
}
```

- **Array of Strings**
```js
{
	type: [String],
	label: "Strings",
}
```

- **Dates**
```js
{
	type: Date,
	label: "Birth Date",
}
```

- **Allowed Values**
```js
{
	type: String,
	label: "Gender",
    allowedValues: ['Male', 'Female'],
}
```

## Orion Attributes

In addition to the infinite posibilities that 
[aldeed:autoform](https://github.com/aldeed/meteor-autoform)
give us, Orion has custom attributes to make it even more easy.

### Using Orion Attributes

Using orion attributes it's super-easy.
Replace the **attribute** with 
the custom attribute function

In the dictionary

```js
// Instead of 
orion.dictionary.addDefinition('description', 'basic', {
    type: String,
    label: 'Description of the site',
    optional: true,
    autoform: {
        type: 'textarea',
    }
});
// Do this
orion.dictionary.addDefinition('description', 'basic', 
    orion.attribute('summernote', {
        label: 'Description of the site',
        optional: true
    })
);
```

In entities

```js
// Instead of 
orion.addEntity('posts', {
    body: {
        type: String,
        label: 'Body',
        optional: true,
        autoform: {
            type: 'textarea',
        }
    }
});
// Do this
orion.addEntity('posts', {
    body: orion.attribute('summernote', {
        label: 'Body',
        optional: true
    }),
});
```

### Creating Orion Attributes

You can create orion attribute to have instant 
solutions and integrated solutions for orion 
dictionary and entities.

```js
orion.attributes.registerAttribute(name, options)
```

- ```name``` **String**. The name of the attribute.

***Options***

- ```template```, ```valueIn```, ```valueOut```, 
```valueConverters```, ```contextAdjust``` are passed directly to 
[autoform](https://github.com/aldeed/meteor-autoform), check here https://github.com/aldeed/meteor-autoform#defining-custom-input-types.

- ```columnTemplate``` **String**. The name of the template to display 
on the entity list table. The value of the attribute will be the data of
template.

- ```getSchema``` **Function**. A function that should return the 
[schema](https://github.com/aldeed/meteor-simple-schema) of the attribue.
Sometimes its a [value](https://github.com/orionjs/froala-editor/blob/master/lib/attribute.js#L4) 
and sometimes an [object](https://github.com/orionjs/file-attribute/blob/master/lib/attribute.js#L4).

