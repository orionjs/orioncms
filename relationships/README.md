Relationships
=============

Define and use relationships between meteor collections, entities and the dictionary.
Relationships work as orion attributes. There are 2 types of relationships. You can 
set relationships with entities or normal meteor collections.

## Getting Started

```sh
meteor add orionjs:relationships
```

## Has One

The "has one" attribute is a **String** that contains the selected id of the selected item.

```
orion.attribute('hasOne', schema, options)
```

- ```schema``` **Object**. The definition of the attribute.

***Options***

- ```titleField``` **String**. The name of the field you want to show.

- ```publicationName``` **String**. The name of the publication, it doesn't 
affect anything. Just set a unique string.

- ```entity``` **String**. The name of the entity. You can choose to provide a entity or a collection

- ```collection``` **Collection**. The meteor collection. You can choose to provide a entity or a collection

- ```filter``` **Function**. Optional. A function that takes the ```userId``` and returns the mongo filter. Remember to add to ```aditionalFields``` all the fields that you use in the ```filter``` function.

- ```create``` **Function**. Optional. Allows the user to create a new items that aren't in the list of options. This option can be any of the following: "true", "false" (disabled), or a function that accepts two arguments: "input" and "callback". The callback should be invoked with the final data for the option.

- ```createFilter``` **Function**. Optional. Specifies a RegExp or String containing a regular expression that the current search filter must match to be allowed to be created. May also be a predicate function that takes the filter text and returns whether it is allowed.

- ```aditionalFields``` **Array**. Optional. Search with more fields in the select.

- ```render``` **Object**. Optional. Custom render functions for the select. Check [here](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#rendering). You must set ```option``` and ```item```

## Examples

Adding to entities

```js
orion.addEntity('store', {
	name: {
		type: String,
	},
	group: orion.attribute('hasOne', {
        label: 'Group'
    }, {
        entity: 'groups',
        titleField: 'name',
        publicationName: 'youCanPutAnyStringYouWantHere',
        /**
    	 * To return only the group the the current user has created
    	 */
        filter: function(userId) {
            return { createdBy: userId };
        }
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
		orion.attributeColumn('hasOne', 'group', 'Group'),
	]
});
```

## Has Many

The "has one" attribute is a **Array** that contains the selected ids of the selected items.

```
orion.attribute('hasMany', schema, options)
```

- ```schema``` **Object**. The definition of the attribute.

***Options***

- ```titleField``` **String**. The name of the field you want to show.

- ```publicationName``` **String**. The name of the publication, it doesn't 
affect anything. Just set a unique string.

- ```pluralName``` **String**. Optional. The name of more than one items. When ```entity``` is used, 
this is automatically set.

- ```singularName``` **String**. Optional. The name of more one items. When ```entity``` is used, 
this is automatically set.

- ```entity``` **String**. The name of the entity. You can choose to provide a entity or a collection

- ```collection``` **Collection**. The meteor collection. You can choose to provide a entity or a collection

- ```filter``` **Function**. Optional. A function that takes the ```userId``` and returns the mongo filter.

- ```aditionalFields``` **Array**. Optional. Search with more fields in the select.

- ```render``` **Object**. Optional. Custom render functions for the select. Check [here](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#rendering). You must set ```option``` and ```item```

## Examples

Adding to the dictionary

```js
orion.dictionary.addDefinition('topProducts', 'home', 
	orion.attribute('hasMany', {
		label: 'Top Products'
	}, {
        entity: 'products',
        titleField: 'name',
        publicationName: 'youCanPutAnyStringYouWantHere2',
        /**
    	 * To return only the active products
    	 */
        filter: function(userId) {
            return { active: true };
        }
    })
);
```
