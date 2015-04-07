Orion Pages
===========

Create new routes with custom templates right in the admin.

## Getting Started

Install the package

```sh
meteor add orionjs:pages
```
### Should I use pages?

Pages are not array of things. Although the developer will put them in lists (like menus or something), each item has nothing to do with the other. For example: FAQ, Contact, History of the company, etc.

Entities are definitely array of things. For example: a gallery images, blog posts, projects of the company, etc.

If you want to build a blog you must use entities. If in your blog you want some extra pages like contact, FAQ or maybe decide in the future, use pages for that.

Of course you can do a blog or a gallery with pages, but that is not the correct way.

### How this work

First, in code you must register a template and attatch a schema to that template.
Then, the admin will choose a template and create a new page.
When a user request the url for that page, orion with load the template with the 
data of the page.

### Create a new template

To add pages you must create at least one template. 
Each template comes with a schema (like a entity) and with 
a meteor html template.

```js
orion.pages.addTemplate(options, schema)
``` 

- ```schema``` **[Schema](https://github.com/orionjs/core/tree/master/attributes)**. The schema of the template.
It comes with *url*, and *title*.

***Options***

- ```template``` **String**. The name of the meteor html template.

- ```layout``` **String**. The layout of the template.

- ```name``` **String**. Optional. The visual name of the template.

- ```description``` **String**. Optional. The description of the template.

Example:

```html
<template name="pagesSimple">
	<h1 class="title">{{ title }}</h1>
	<div class="content">
		{{{ content }}}
	</div>
</template>
```
```js
orion.pages.addTemplate({
	template: 'pagesSimple', 
	name: 'Simple',
	description: 'Simple template'
}, {
	content: orion.attribute('froala', {
	  label: 'Content'
	})
})
```

### List Pages

To list pages you have to **subscribe**.

```js
// This
orion.subs.subscribe('pages', arg1, arg2);
// Will return this
orion.pages.collection.find(arg1, arg2);
```

Pages comes with a built in helper for all your template that
returns the pages (you must be subscribed first). 
You can use it like this:

```html
<h3>All Pages</h3>
{{# each pages }}
  <a href="{{ path }}">
    {{ title }}
  </a>
{{/ each }}

<h3>Some Pages</h3>
{{# each pages template="pagesSimple" }}
  <a href="{{ path }}">
    {{ title }}
  </a>
{{/ each }}
```

> When you call path() on a page, it will return the path to the page. Its important to use this, becouse the url might change
