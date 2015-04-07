Froala Editor For Orion
==========

Orion supports 2 text editors. Both upload files through ```orionjs:filesystem```.
**Froala** it's more integrated with orion styles and it doesn't require bootstrap.js 
but it's paid.

You can choose the one that fits more your needs.

> If decide later to change the text editor just change the attribute name in the
definition of the entity or dictionary, you will not loose the content.

This attributes are a **String**.

## Getting Started

```sh
meteor add orionjs:summernote
# or 
meteor add orionjs:froala-editor
```

## Examples

Adding to the dictionary

```js
orion.dictionary.addDefinition('body', 'texts', 
	orion.attribute('summernote', {
	    label: 'Body',
	    optional: true
	})
);
// or 
orion.dictionary.addDefinition('body', 'texts', 
	orion.attribute('froala', {
	    label: 'Body',
	    optional: true
	})
);
```

Using in templates. Remember to use triple braces.

```html
<template name="example">
	<!-- Remember to use triple braces -->
	{{{ dict 'body' }}}
</template>
```

Adding to entities

```js
orion.addEntity('posts', {
	title: {
		type: String,
		label: "Title",
	},
	body: orion.attribute('summernote' /* or 'froala' */, {
	    label: 'Body',
	    optional: true
	}),
},  {
	sidebarName: 'Posts',
	pluralName: 'Posts',
	singularName: 'Post',
	/**
	 * You have to put here what do you want to show in
	 * the entity index page.
	 * It uses aldeed:tabular. Check the documentation
	 * https://github.com/aldeed/meteor-tabular/
	 */
	tableColumns: [
		{ data:'title', title: 'Title' },
		orion.attributeColumn('summernote' /* or 'froala' */, 'body', 'Preview')
	]
});
```

## License

The `orionjs:froala-editor` project is under MIT license.

You may use the editor for non-commercial websites for free under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](http://creativecommons.org/licenses/by-nc-nd/4.0/).

Froala Editor has [4 different licenses](http://editor.froala.com/download/) for commercial use.
For details please see [License Agreement](http://editor.froala.com/license).
