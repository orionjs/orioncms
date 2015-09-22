# Accounts

Orion allows for you to create accounts with different roles so that users can login and manage app content and configuration.

## Creating accounts

Orion has 3 ways to create accounts:

- **First Admin**. By default account creation is closed, but when there is no
admin (no user that has the admin role), Orion will allow you to create an account
that will be automatically granted an ```admin``` role. To do this navigate in your app
to ```/admin```.

- **Invitations**. The admin can create new users, to do that you must navigate to the
accounts tab and press + and follow the instructions.

- **Public Registration**. With Open Registration, you can allow anyone to publicly register.

### Public registration

##### Enabling Public Registration
To allow anyone to register an account for your app, make sure to set the ```'forbidClientAccountCreation'``` option to ```false```.

```js
Options.set('forbidClientAccountCreation', false);
```

##### Default Roles

New users will not have any roles by default, unless you specify default roles:

```
Options.set('defaultRoles', ['role1', 'role2']);
```
