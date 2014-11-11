Meteor CMS
==========

This is a simple and useful cms for meteor. 
Creates automatically a admin panel for your 
collections and gives you the ability to have
key/value definitions for your site.

## Getting Started

run ```meteor add aldeed:collection2```

#### Create an account

Add this line to create a new file in ```/server``` and add this code

```js
if (Meteor.users.find().count() === 0) {
	Accounts.createUser({
		email: 'your email',
		password: 'your password'
	});
}
```

Now you can enter the admin panel in the route ```/admin```

## Dictionary

You can add editable key/value items

#### Adding a new definition

Create a file and add this code

```js
cms.dictionary.addDefinition('siteDescription', 'basic', {
	type: String,
	label: "Description",
	optional: true,
	autoform: {
		type: 'textarea'
	}
});
```

- The first attribute is the key of the definition.
- The second is the category of the definition. This is used only in the admin panel.
- The third attribute is the description of the attribute. This uses 
[collection2](https://github.com/aldeed/meteor-collection2) and [autoform](https://github.com/aldeed/meteor-autoform),
you can read the especifications there.

#### Subscribing to the dictionary

The name of the publication is ```dictionary```. Its recomended to use this method instead of meteor default, becouse it uses [meteorhacks:subs-manager](https://github.com/meteorhacks/subs-manager).

```js
cms.subs.subscribe('dictionary')
```

#### Using in templates

To use definitions in templates you can do this

```html
<template name="example">
	{{ dict 'siteDescription' 'No description' }}
</template>
```

Where:

- The first attribute is the key of the dictionary.
- The second attribute is the default value, used if the definition doesnt exist or its empty.

**Warning: You must subscribe to the dictionary before using it**

#### Using in other files

To use definitions in other javascript files you can do this

```js
var description = cms.dictionary.get('siteDescription', 'No description');
```





