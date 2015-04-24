# Entities

Create your collections in orion and orion will dynamically
generate an admin interface to view, edit, and create items.

> Entities work like normal collections, the only difference
is that entities are automatically inserted to the admin panel.

## Getting started

Creating entities is just as easy as creating normal meteor
collections.

### Creating Entities

```js
orion.addEntity(name, schema, options)
```

- ```name``` **String**. The name of the entity. Also the name
of the collection in mongodb.

- ```schema``` **[Schema](https://github.com/orionjs/orion/tree/master/core/attributes)**. The schema of the entity. The schema has 3 default fields: ```createdAt```, ```updatedAt``` and ```createdBy``` (the id of the user that created the entity).

***Options***

- ```icon``` **String**. The name of the icon (FontAwesome).

- ```sidebarName``` **String**. The text that will be shown in the sidebar.

- ```pluralName``` **String**.

- ```singularName``` **String**.

- ```tableColumns``` **Array of Fields**. You have to put here what you want to show in
the entity index page. It uses [aldeed:tabular](https://github.com/aldeed/meteor-tabular/). Check the documentation [here](https://github.com/aldeed/meteor-tabular/)

Example:

```js
orion.addEntity('posts', {
	title: {
		type: String,
		label: "Title"
	},
	body: {
		type: String,
		label: "Body"
	}
}, {
	icon: 'bookmark',
	sidebarName: 'Posts',
	pluralName: 'Posts',
	singularName: 'Post',
	tableColumns: [
		{ data:'title', title: 'Title' },
	]
});
```

### Using entities

Entities work just like normal meteor collections. You can get the entity
collection attribute like this:

```js
orion.entities.posts.collection

// Getting all the items in the collection
var posts = orion.entities.posts.collection.find().fetch();

// Getting one item
var post = orion.entities.posts.collection.findOne({_id: 'AdkAMX67BLs5rrRpf'});
```

> Remember that when you use that functions in the client it will only search
across the local data. You first have to **subscribe to the collections**.

### Subscriptions

When you define a entity orion will make a publication of the entity. You can
use it like this:


**Meteor Default Way**
```js
Meteor.subscribe('entity', 'posts');
/* Subscribes to orion.entities.posts.collection.find(); */
Meteor.subscribe('entity', 'posts', {awesome: true});
/* Subscribes to orion.entities.posts.collection.find({awesome: true}); */
```

**Orion Recomended Way**
```js
orion.subs.subscribe('entity', 'posts');
/* Subscribes to orion.entities.posts.collection.find(); */
orion.subs.subscribe('entity', 'posts', {awesome: true});
/* Subscribes to orion.entities.posts.collection.find({awesome: true}); */
```

***¿What is the difference?***

The orion recomended way uses [meteorhacks:subs-manager](https://github.com/meteorhacks/subs-manager).

> With the meteor default way, when you navigate to a new route, all the previous subscriptions will be stopped.
The user will have to wait a bit even if they've visited that route previously.

> With the Orion recomended way Subscriptions Manager caches your subscriptions
and runs all the subscriptions that have been cached when a route is changed. This means that when switching between routes, the user will no longer have to wait. Also, Meteor won't need to re-send data that's already in the client.
