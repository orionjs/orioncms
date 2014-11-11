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
cms.dictionary.addDefinition('siteName', 'basic', {
	type: String,
	label: "Title",
	optional: true,
});
```

The first attribute is the key of the definition.

The second is the category of the definition. This is used only in the admin panel.

The third attribute is the description of the attribute. This uses 
[collection2](https://github.com/aldeed/meteor-collection2) and [autoform](https://github.com/aldeed/meteor-autoform),
you can read the especifications there.









