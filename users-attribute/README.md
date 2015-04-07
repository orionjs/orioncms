Users Attribute
===============

Attatch users to entities or the dictionary using ```orionjs:users-attribute```

This package uses ```orionjs:relationships``` to create 2 new attribute types
with a custom view.

## Getting Started

```sh
meteor add orionjs:users-attribute
```

## One user

The "user" attribute is a **String** that contains the selected id of the selected user.

```
orion.attribute('user', schema, options)
```

- ```schema``` **Object**. The definition of the attribute.

***Options***

- ```publicationName``` **String**. The name of the publication, it doesn't 
affect anything. Just set a unique string.

- ```filter``` **Function**. Optional. A function that takes the ```userId``` and returns the mongo filter.

## Examples

Adding to entities

```js
orion.addEntity('store', {
	name: {
		type: String,
	},
	owner: orion.attribute('user', {
        label: 'Group'
    }, {
        publicationName: 'youCanPutAnyStringYouWantHere',
    })
},  {
	sidebarName: 'Stores',
	pluralName: 'Stores',
	singularName: 'Store',
	/**
	 * You have to put here what do you want to show in
	 * the entity index page.
	 * It uses aldeed:tabular. Check the documentation
	 * https://github.com/aldeed/meteor-tabular/
	 */
	tableColumns: [
		{ data:'name', title: 'Name' },
		orion.attributeColumn('user', 'owner', 'Owner'),
	]
});
```

## Multiple Users

The "users" attribute is a **Array** that contains the selected ids of the selected users.

```
orion.attribute('users', schema, options)
```

- ```schema``` **Object**. The definition of the attribute.

***Options***

- ```publicationName``` **String**. The name of the publication, it doesn't 
affect anything. Just set a unique string.

- ```filter``` **Function**. Optional. A function that takes the ```userId``` and returns the mongo filter.

## Examples

Adding to the dictionary

```js
orion.dictionary.addDefinition('favoriteUsers', 'users', 
	orion.attribute('users', {
		label: 'Favorite Users'
	}, {
        publicationName: 'youCanPutAnyStringYouWantHere2',
    })
);
```
