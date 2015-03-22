# Users

Orion users covers from creation to roles, everything is
very simple to use.

#### Create the first account

It all starts with this. Navigate to ```/admin``` and orion
will search if there's any user registrated, if not you will 
be redirected to ```/admin/setup```, where you can create
the first account. This account will be a **admin**.

## Creating accounts

After the first account is created, the ```/admin/setup``` way 
will not work anymore. Now you have 2 methods to create accounts:

#### Invitations

The first method, and the one you will probably use, is invitations.
If you navigate to ```/admin/users``` you will see a **create** button, 
when you click there, you will see a page where you can select the 
permissions for the new user and generate the invitation. 
The invitation will only work once.

#### Public account creation

You can allow anyone create create an account.

```js
orion.users.configure(options)
```

***Options***

- ```defaultPermissions``` **Array**. Array of the permissions that new users will have. 
You can see the list of permissions in ```/admin/users/create```.

Anything in the ```options``` (except ```defaultPermissions```) will be passed directly
to ```AccountsTemplates.configure(options)```, so you can setup things like ```forbidClientAccountCreation```, ```homeRoutePath``` or ```sendVerificationEmail```

Example:

```js
/**
 * accounts-config.js (client/server)
 *
 * In this example we are allowing anyone to create an account and create
 * posts (a entity). They will only see the posts that they have made.
 * Posts will also have a createdBy attribute which contains the userId.
 */

orion.users.configure({
	forbidClientAccountCreation: false,
	defaultPermissions: ['entity.posts.personal']
})
```

## Permissions

Orion permissions consists in 2 parts. You can register permissions, 
which they can be assign to users by the admin. And you can see a a user
has the right permission.

### Register Permissions

When you register a permission the permission will now appear on the list 
of permissions, and the admin can assign it to a user.

![alt tag](http://i.imgur.com/Guo41xU.png)

```js
orion.users.permissions.add(permission)
```

- ```permission``` ***String***. The name of the permission.

### Check Permissions

The user object have a helper function that indicates if the user have
the right permission.

```js
Meteor.user().hasPermission(permission, strict)
```

- ```permission``` ***String***. The name of the permission.

- ```strict``` ***Boolean*** defaults to ```false```. Strict search of the permission.

If ```strict``` is ```true``` this function will return true only if the user 
has exactly that permission if not, even if its admin, it will return false.

If ```strict``` is ```false```:

- If the user is admin, will always return true, even if the permission is not registered.

- If the user has a permission that has dots, and its in a lower level than the permission
you are asking for, will return true.

Example:

```js
/**
 * Imagine we have a user with this permissions:
 * ['entity.posts.personal', 'files.upload']
 */

var user = Meteor.user();

user.hasPermission('entity') // true
user.hasPermission('entity.posts') // true
user.hasPermission('entity.post') // false
user.hasPermission('entity.posts.personal') // true
user.hasPermission('files') // true
user.hasPermission('files.upload') // true
user.hasPermission('files.delete') // false
user.hasPermission('') // true
user.hasPermission(null) // true
```

You can also check if the logged in user has some permission in html

```html
{{# if doIHavePermission 'entity.posts' }}
	<!-- Content here -->
{{/ if }}
```
