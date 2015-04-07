Router.route('/admin/pages', {
	name: 'adminPagesIndex',
	controller: orion.RouteController,
	waitOn: function() {
		return orion.subs.subscribe('pages');
	},
	data: function() {
		return { pages: orion.pages.collection.find() };
	}
});

Router.route('/admin/pages/:_id/edit', {
	name: 'adminPagesUpdate',
	controller: orion.RouteController,
	waitOn: function() {
		return orion.subs.subscribe('pages');
	},
	data: function() {
		return orion.pages.collection.findOne(this.params._id);
	}
});

Router.route('/admin/pages/:_id/delete', {
	name: 'adminPagesDelete',
	controller: orion.RouteController,
	waitOn: function() {
		return orion.subs.subscribe('pages');
	},
	data: function() {
		return orion.pages.collection.findOne(this.params._id);
	}
});

Router.route('/admin/create', {
	name: 'adminPagesCreate',
	controller: orion.RouteController
});

Router.route('/pages/:url', function() {
	this.wait(orion.subs.subscribe('pages', { url: this.params.slug }));
	if (this.ready()) {
		var page = orion.pages.collection.findOne({ url: this.params.url });
		var template = orion.pages.templates[page.template];
		if (page) {
			if (template.layout) {
				this.layout(template.layout);
			}
			this.render(page.template, { data: page });
		} else {
			this.render('adminLoading');
		}
	} else {
		this.render('adminLoading');
	}
}, { name: 'pages' });