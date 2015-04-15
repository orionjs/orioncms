# Orion API

Orion is very extensible. For example, the package ```orionjs:filesystem```
is completely an extension. Anyone can make something that integrated.

## Adding Tabs

To add tabs to the admin call this function:

```js
orion.admin.addSidebarTab(options)
```

***Options***

- ```routeName``` **String**. The name of the route. You have to define it previously.

- ```navbarTitle``` **String**. The text that will be shown in the sidebar.

- ```activeRouteRegex``` **String**. Optional. defaults to the name of the route.
Used to check if the tab is active.
Uses [zimme:iron-router-active](https://github.com/zimme/meteor-iron-router-active).

- ```icon``` **String**. The name of the icon (FontAwesome).

- ```permission``` **String**. Optional. The name of the permission

Example:

```js
/**
 * Filesystem
 */
orion.admin.addSidebarTab({
	routeName: 'adminFilesIndex',
	navbarTitle: 'Files',
	activeRouteRegex: 'adminFiles',
	icon: 'folder',
	permission: 'files.folders'
});
```

## Subscriptions

If you need to subscribe on all routes of the admin panel
you can call this function

```js
orion.admin.addAdminSubscription([arguments])
```

- The arguments are the same arguments of the original subscription.

## User Actions

You can add users actions to the admin panel.
This actions will only be called by an admin user.
This actions can be a route or a Meteor Method.

**This will add a button to the user row in** ```/admin/users/```

```js
orion.admin.addUserAction(options)
```

***Options***

- ```forAdmins``` **Boolean**. Optional, default: ```false```. The action is aplicable to admin users.

- ```forUsers``` **Boolean**. Optional, default: ```true```. The action is aplicable to not admin users.

- ```btnClass``` **String**. Optional, default: ```btn-primary```. The class of the btn (bootstrap).

- ```title``` **String**. The text of the button.

- ```route``` **String**. If the action is a route, the name of the route.
The params of the route will be the user.

- ```method``` **String**. If the action is a method, the name of the method.
If in the execution of the method was an error, a message will be shown to the admin.
If the method returned an object with the ```message``` key, that will be shown to the admin.

- ```callback``` **function**. Optional. If the action is a method, this will be executed on the method success.

Example:

```js
orion.admin.addUserAction({
	forAdmins: true,
	forUsers: true,
	btnClass: 'btn-default',
	title: 'Send email',
	method: 'sendEmailToUser'
})

Meteor.methods({
	sendEmailToUser: function(user) {
		// send mail to user
		return {
			message: 'Email delivered'
		};
	}
})
```
