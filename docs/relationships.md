# Relationships

Define and use relationships between Meteor collections and the dictionary.
Relationships work as Orion attributes. There are two types of relationships:
"has one" and "has many".

## Getting Started

```sh
meteor add orionjs:relationships
```

## Has One

The "has one" attribute is a **String** that contains the id of the selected item.

```js
orion.attribute('hasOne', schema, options)
```

- ```schema``` **Object**. The definition of the attribute.

***Options***

- ```titleField``` **String|Array**. The name of the field (or fields) you want to show.

- ```publicationName``` **String**. The name of the publication. It doesn't
affect anything; just set a unique string.

- ```customPublication``` **Boolean**. Optional. False by default, if true the publication will not be created automatically.

- ```collection``` **Collection**. The Meteor collection. This is not the name of the collection, but the variable.

- ```filter``` **Function**. Optional. A function that takes the ```userId``` and returns the Mongo filter. Remember to add to ```additionalFields``` all the fields that you use in the ```filter``` function.

- ```additionalFields``` **Array**. Optional. Search with more fields in the select. If you want to fetch other fields than the ```titleField``` you must add them here.

- ```create``` **Function**. Optional. Allows the user to create new items that aren't in the list of options. This option can be any of the following: `true`, ```false``` (disabled), or a function that accepts two arguments: "input" and "callback". The callback should be invoked with the final data for the option.

- ```createFilter``` **Function**. Optional. Specifies a RegExp or String containing a regular expression that the current search filter must match to be allowed to be created. May also be a predicate function that takes the filter text and returns whether it is allowed.

- ```render``` **Object**. Optional. Custom render functions for the select. Check the [Selectize.js documentation](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#rendering). You must set ```option``` and ```item```.

- ```validateOnClient``` **Boolean**. Optional, ```true``` by default. If ```false```, Orion will not validate that the related document exists.

- ```validateOnServer``` **Boolean**. Optional. ```true``` by default. If ```false```, Orion will not validate that the related document exists.

## Examples

Adding to entities

```js
Groups = new orion.collection('groups');
Stores = new orion.collection('stores');

Stores.attachSchema(new SimpleSchema({
  group: orion.attribute('hasOne', {
    label: 'Group'
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'youCanPutAnyStringYouWantHere',
  })
}))
```

## Has Many

The "has many" attribute is an **Array** that contains the ids of the selected items.

```js
orion.attribute('hasMany', schema, options)
```

- ```schema``` **Object**. The definition of the attribute.

***Options***

- ```titleField``` **String**. The name of the field you want to show.

- ```publicationName``` **String**. The name of the publication. It doesn't
affect anything; just set a unique string.

- ```pluralName``` **String**. Optional. The name of more than one item. When ```entity``` is used,
this is automatically set.

- ```singularName``` **String**. Optional. The name of one item. When ```entity``` is used,
this is automatically set.

- ```collection``` **Collection**. The Meteor collection. This is not the name of the collection, but the variable.

- ```filter``` **Function**. Optional. A function that takes the ```userId``` and returns the Mongo filter. Remember to add to ```additionalFields``` all the fields that you use in the ```filter``` function.

- ```additionalFields``` **Array**. Optional. Search with more fields in the select. If you want to fetch other fields than the ```titleField``` you must add them here.

- ```create``` **Function**. Optional. Allows the user to create new items that aren't in the list of options. This option can be any of the following: ```true```, ```false``` (disabled), or a function that accepts two arguments: "input" and "callback". The callback should be invoked with the final data for the option.

- ```createFilter``` **Function**. Optional. Specifies a RegExp or String containing a regular expression that the current search filter must match to be allowed to be created. May also be a predicate function that takes the filter text and returns whether it is allowed.

- ```render``` **Object**. Optional. Custom render functions for the select. Check the [Selectize.js](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#rendering). You must set ```option``` and ```item```.

- ```validateOnClient``` **Boolean**. Optional, ```true``` by default. If ```false```, Orion will not validate that the related document exists.

- ```validateOnServer``` **Boolean**. Optional. ```true``` by default. If ```false```, Orion will not validate that the related document exists.

## Examples

Adding to the dictionary:

```js
orion.dictionary.addDefinition('topProducts', 'home',
  orion.attribute('hasMany', {
    label: 'Top Products'
  }, {
    collection: Products,
    titleField: 'name',
    additionalFields: ['active'],  // we must add the active field because we use it in the filter
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
