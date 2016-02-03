# Roles

Orion uses ```nicolaslopezj:roles``` for roles.
Basically, this package lets us define actions and later assign allow/deny rules for that action.

You can check the full documentation of ```nicolaslopezj:roles``` [here](http://github.com/nicolaslopezj/roles).

## Creating roles
To create a new role:
```js
myRole = new Roles.Role('my-role');
```

## Role Allow/Deny Rules
You can then set custom allow/deny rules for specific roles to allow/deny users with the role certain actions:

```js
myRole.allow(action, rule);
myRole.deny(action, rule);
```

- ```action``` **String**. The name of the action.

- ```rule``` **Function**. Must return true/false. The input of the function depends of the context.
To get the userId in the function you can call ```this.userId```.

For example:

```js
myRole.allow('collections.posts.update', function(userId, doc, fields, modifier) {
  return doc.createdBy === userId; // Will be allowed to edit his own posts
});
myRole.deny('collections.posts.update', function(userId, doc, fields, modifier) {
  return _.contains(fields, 'userId'); // Can't change the userId field
});
```

## Role Helper Functions

You can also set helpers for your role

```js
myRole.helper(name, func);
```

- ```name``` **String**. The name of the helper.

- ```func``` **Function**. The function that will be called when the helper is called.

Example:

```js
myRole.helper('dictionary.allowedCategories', function() {
  return ['public'];
});
```

```js
// Return the fields that the users with that role can't edit
myRole.helper('collections.posts.forbiddenFields', function() {
  return ['isFeatured', 'score'];
});
```

## Actions

Below is a list of the available actions for users. These Actions are essentially a list of privileges for logged in users.

**Accounts**

- ```accounts.index``` View the list of users in the admin panel.
- ```accounts.update.roles``` Change a user's roles.
- ```accounts.invite``` Create invitations.

**Collections**

Where ```myCollection``` is the name of the collection.

- ```collections.myCollection.index``` View the list of items of the collection in the admin.
- ```collections.myCollection.insert``` Create documents of that collection. Input: ```userId, doc```.
- ```collections.myCollection.update``` Update a document of a collection. Input: ```userId, doc, fields, modifier```.
- ```collections.myCollection.remove``` Remove a document. Input: ```userId, doc```.
- ```collections.myCollection.showCreate``` Show the create button in the admin.
- ```collections.myCollection.showUpdate``` Show the update button/send the user to the update form. Input: ```doc```.
- ```collections.myCollection.showRemove``` Show the remove button. Input: ```doc```.

**App Configuration**

- ```config.update``` Update the app configuration.

**Dictionary**

- ```dictionary.update``` Update the dictionary. Input: ```userId, doc, fields, modifier```.

## Helpers

Below is a list of the helpers that Orion uses.

**Collections**

Where ```myCollection``` is the name of the collection.

- ```collections.myCollection.indexFilter``` The filter of the results that the user can view in the admin.
Example: ```{ createdBy: this.userId }```. Filters will be joined with $or comparator.
- ```collections.myCollection.forbiddenFields``` An array of the name of the fields that the users with that role can't insert/update.
This will hide the input in the admin and secure those fields in the server.
Example: ```['isFeatured', 'likesCount']```.


**Dictionary**

- ```dictionary.allowedCategories``` The categories that the user can edit in the admin.
The union of all the allowedCategories will be the result.

**Accounts**

- ```accounts.allowedRoles``` An array of the roles that the user with that role can add to new users or existing ones.
- ```accounts.indexFilter``` The filter of the users that the user can view in the admin.

## Example

How to give permissions to a role over a collection.

```js
/*
 * First you must define the role
 */
myRole = new Roles.Role('my-role');

/**
 * Allow the actions of the collection
 */
myRole.allow('collections.myCollection.index', true); // Allows the role to see the link in the sidebar
myRole.allow('collections.myCollection.insert', true); // Allows the role to insert documents
myRole.allow('collections.myCollection.update', true); // Allows the role to update documents
myRole.allow('collections.myCollection.remove', true); // Allows the role to remove documents
myRole.allow('collections.myCollection.showCreate', true); // Makes the "create" button visible
myRole.allow('collections.myCollection.showUpdate', true); // Allows the user to go to the update view
myRole.allow('collections.myCollection.showRemove', true); // Shows the delete button on the update view

/**
 * Set the index filter.
 * This part is very important and sometimes is forgotten.
 * Here you must specify which documents the role will be able to see in the index route
 */
myRole.helper('collections.myCollection.indexFilter', {}); // Allows the role to see all documents
```
