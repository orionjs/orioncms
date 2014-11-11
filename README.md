Meteor CMS
==========

This is a simple and useful cms for meteor. 
Creates automatically a admin panel for your 
collections and gives you the ability to have
key/value definitions for your site.

![alt tag](http://i.imgur.com/aTG9iF5.png)

## Getting Started

Add the package
```meteor add nicolaslopezj:cms```

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
[collection2](https://github.com/aldeed/meteor-collection2) and 
[autoform](https://github.com/aldeed/meteor-autoform),
you can read the especifications there.

#### Subscribing to the dictionary

The name of the publication is ```dictionary```. Its recomended to use ```cms.subs.subscribe``` instead of meteor default, becouse it uses [meteorhacks:subs-manager](https://github.com/meteorhacks/subs-manager).

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

#### Using in javascript files

To use definitions in other javascript files you can do this

```js
var description = cms.dictionary.get('siteDescription', 'No description');
```


## Entities

Entities are collections that are editable by the admin.

#### Adding a new entity

Create a file and add this code

```js
cms.addEntity('posts', {
	title: {
		type: String,
		label: "Title",
	},
	body: {
		type: String,
		label: "Body",
		autoform: {
			type: 'textarea',
		}
	}
}, {
	sidebarName: 'Posts',
	pluralName: 'Posts',
	singularName: 'Post',
	defaultIndexTableFields: [
		{key:'title', label: 'Title'},
	]
});
```

Where:

- The first attribute is the name of the entity and the collection in the database.
- The second attribute is the description of the attributes. This uses 
[collection2](https://github.com/aldeed/meteor-collection2) and 
[autoform](https://github.com/aldeed/meteor-autoform),
you can read the especifications there.
- The third attribute is the options.
To show the index of the entity this package uses [aslagle:reactive-table](https://github.com/ecohealthalliance/reactive-table).
	- ```defaultIndexTableFields``` are the fields in [aslagle:reactive-table](https://github.com/ecohealthalliance/reactive-table). It defaults to the id.

#### Subscribing to a entity

The name of the publication is ```entity``` and the second input of the function is the name of the entity. 
Its recomended to use ```cms.subs.subscribe``` instead of meteor default, 
becouse it uses [meteorhacks:subs-manager](https://github.com/meteorhacks/subs-manager).

```js
cms.subs.subscribe('entity', 'posts')
```

#### Access the collection

To access the collection of the entity you can do this

```js
cms.entities.posts.collection;
```

#### Using with iron router

This is an example of the use with iron router

```js
Router.map(function() {

	this.route('postsShow', {
		path: '/posts/:_id',
		waitOn: function() {
			return [cms.subs.subscribe('dictionary'), cms.subs.subscribe('entity', 'posts')];
		},
		data: function() {
			return cms.entities.posts.collection.findOne(this.params._id);
		}
	});

});
```

## Custom Attributes

### Images

To add images to your entities or dictionary you can do this

```js
cms.dictionary.addDefinition('logo', 'basic', {
	type: cms.attributes.image,
	label: "Logo"
});

// or if you want a array

cms.dictionary.addDefinition('carouselImages', 'basic', {
	type: [cms.attributes.image],
	label: "Carousel Images"
});
```

It uses AWS S3 to save the images, using the package [lepozepo:s3](https://github.com/Lepozepo/S3)

You must set the AWS credentials to use this

```js
S3.config = {
	key: 'AWS_KEY',
	secret: 'AWS_SECRET',
	bucket: 'AWS_BUCKET_NAME'
};
```

To access the image you can do this

```html
<template name="example">
	<img src="{{ dict 'logo.link' }}">
</template>
```

If you want to show the image in the index table of the entity use ```cms.attributesIndexTable.image(key, label)```

```js
cms.addEntity('posts', {
	image: {
		type: cms.attributes.image,
		label: "Image",
	},
	...
}, {
	defaultIndexTableFields: [
		cms.attributesIndexTable.image('image', 'Image'),
		...
	]
});
```


## Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.2.0/dist/gittip.png)](https://gratipay.com/nicolaslopezj/)
