# Customization

Orion is very flexible and you can customize almost any aspect of the admin.

## Adding links

All the links that you see in the admin panel are saved in a local collection.

To add links call this function:

```js
orion.links.add(options);
```

**options**

- ```index``` **Number**. Optional. Orion will order the links by this key. If not set, it will not appear on the list.

- ```identifier``` **String**. The identifier of the link. Only letters, numbers, ```-``` and ```_```.

- ```parent``` **String**. Optional. The identifier of the parent link.

- ```title``` **String** or **Function**. The title of the link.

- ```routeName``` **String**. Optional. The name of the route where the link points.

- ```activeRouteRegex``` **String**. Optional. The prefix that indicates if the link is active.

- ```permission``` **String**. Optional. The name of the Roles action that is needed to be showed.

## Override Templates

Every template in the admin is replaceable in a very easy way.
Orion uses Reactive Templates, a packages that allows us to create overridable templates.

To replace a template call this method:

```js
ReactiveTemplates.set(identifier, templateName);
```

- ```identifier``` **String**. The identifier of the template.

- ```templateName``` **String**. The name of the template you want to set.

List of identifiers:

- ```layout``` Layout of the admin.
- ```outAdminLayout``` Layout of the login view.
- ```login``` Login template.
- ```registerWithInvitation``` "Register with invitation" template.
- ```myAccount.index``` User profile index.
- ```myAccount.password``` Change password.
- ```myAccount.profile``` Edit profile.
- ```accounts.index``` List of all accounts.
- ```accounts.update``` Update a account.
- ```accounts.create``` Create a new account.
- ```configUpdate``` Edit the Orion config.
- ```dictionaryUpdate``` Edit the Orion dictionary.
- ```pages.index``` Pages index.
- ```pages.create``` Create a page.
- ```pages.update``` Pages update.
- ```pages.delete``` Delete a page.

Each collection has a unique identifier, for a collection named ```myCollection``` this would be the identifiers:

- ```collections.myCollection.index``` List the documents.
- ```collections.myCollection.create``` Create a document.
- ```collections.myCollection.update``` Update a document.
- ```collections.myCollection.delete``` Delete a document.

Every Orion attribute has a overridable template with the following identifier

```
attribute.nameOfTheAttribute
```

So, if the attribute you want to override is "image", use ```attribute.image```.

#### Example

To override the delete template of ```posts``` collections

```js
ReactiveTemplates.set('collections.posts.delete', 'myCustomTemplate');
```

> For more info with Reactive Templates go to the project page http://github.com/nicolaslopezj/reactive-templates

#### Collection links

When you define a collection orion will create a link with identifier ```collections-collectionName```.
If you want to override any option of the link you can do it in the ```link``` key while defining the collection.

Example:
```js
Comments = new orion.collection('comments', {
  singularName: 'comment',
  pluralName: 'comments',
  title: 'Comments',
  link: {
    title: 'Comments',
    index: 100,
    parent: 'collections-posts' // to show it under the posts collection link
  },
  tabular: {
    columns: [
      { data: 'message', title: 'Message' }
    ]
  }
});

```
