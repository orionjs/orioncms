# iron-router-progress

**DISCLAIMER**: This is exactly the same package as `multiply:iron-router-progress`. It has been consolidated to work with OrionJS. Additional features are about to be added.

Implements a simple progress bar, when loading different routes.
Example running at: https://iron-router-progress.meteor.com/

## Upgrading to Meteor 1.0

__Please note:__ From version 1.0 and onwards, you have to use `multiply:iron-router-progress` instead of `mrt:iron-router-progress`.

The IronRouterProgress global has been removed. You now configure IRP using Router.configure, or on the route options object. See below, on how to do that.

## Installation

Use [Atmosphere](https://atmospherejs.com/) to install the latest version of iron-router-progress.
```sh
$ meteor add multiply:iron-router-progress
```

## Customization

It's mostly all CSS (LESS), and you can pretty much just override the CSS with whatever you want.

For the most part, you'll want to change the `#iron-router-progress`'s `background-color` and `box-shadow` like this:
```css
#iron-router-progress {
	background-color : <COLOR>;
	box-shadow       : 0 0 5px <COLOR>;
}
```

### Automatic ticks
By default, the progress bar will tick every 0.75-1.5 seconds, after you start loading a route.

If you want to disable this behaviour you can do it either globally by:
```coffee
Router.configure
	progressTick : false
```
Or by route definition:
```coffee
Router.route '/example',
	progressTick : false
```

### Spinner
By default, a spinner is running, on the far right of the page, when loading.

You'll most likely want to just change the border-color like this:
```css
#iron-router-progress.spinner:before {
	border-color : <COLOR>;
}
```

If you don't like the spinner, simply disable it with:
```coffee
Router.configure
	progressSpinner : false
```
Or by route definition:
```coffee
Router.route '/example',
	progressSpinner : false
```

### Enable the progress bar, only for certain routes
If you don't want to use the progress bar for all routes, you can disable it globally, and enable it on the route level:
```coffee
Router.configure
	progress : false

Router.route '/example',
	progress : true
```

Or if you just want it disabled for certain routes:
```coffee
Router.route '/example',
	progress : false
```

### Delay the progress from showing up on fast routes
If you don't want to see the progress-bar for 'fast' routes, you can set a delay (time in ms) in which you would like for the progress to wait, before showing up.
Global delay:
```coffee
Router.configure
	progressDelay : 100
```

Or per route:
```coffee
Router.route '/example',
	progressDelay : 100
```

You can enable it globally, and disable it for specific routes like this:
```coffee
Router.configure
	progressDelay : 100

Router.route '/example',
	progressDelay : false
```

### Debugging
If you want to debug IRP, you may enable the `progressDebug` option.

Global debugging:
```coffee
Router.configure
	progressDebug : true
```

Route debugging:
```coffee
Router.route '/example',
	progressDebug : true
```

You can enable it globally, and disable it for specific routes like this:
```coffee
Router.configure
	progressDebug : true

Router.route '/example',
	progressDebug : false
```
