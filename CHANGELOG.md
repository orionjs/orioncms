Orion Core
==========

This is the changelog for ```orionjs:core```.

### 0.5.0

- Reorder dictionary code.

- Subscribe to dictionary on startup automatically.

- Reorder main variables.

- Reorder entities code.

- ```orion.addEntity()``` now returns the new entity.

- Reorder orion config code.

- Reorder users code.

- Added the posibility to modify the user object on creation using ```orion.users.onCreateUser(options, user)```. Thanks @splendido.

- Rewrite routes.

- Reorder admin api.

- Put all the common helpers, events, and rendered callback on this repository.

- Removed views.

### 0.4.10

- Fixed bug #21.

### 0.4.9

- Added license.

### 0.4.6

- User actions in the admin.

### 0.4.5

- Changes in entity index table.

### 0.4.4

- Fixed #11.

### 0.4.2

- Fixed default value for orion entity tableColumns.

### 0.4.1

- Changed package description.

### 0.4.0

- Merged with ```orionjs:admin```.

### 0.3.1

- Remove invitations after using them.

### 0.3.0

- Introducing Accounts. See documentation on http://orion.meteor.com/docs/accounts.

- In ``` orion.config``` you can specify public options, which are passed to the client only at startup. 

### 0.2.2

- Added default value for ```orion.config.get```.

### 0.2.0

- Dictionary definitions are optional by default.

- Introducing ``` orion.config```. See documentation on http://orion.meteor.com/docs/config.

### 0.1.3

- Added icon for entities. To set a icon to a entity add the ```icon``` key to the entity options. Font awesome is supported.

