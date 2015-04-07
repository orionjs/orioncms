AutoForm.hooks({
	adminPagesCreateForm: {
		before: {
			insert: function(doc) {
				var name = Session.get('adminPagesCreate_choosenTemplate');
				if (!name) {
					this.result(false);
				} else {
					doc = orion.pages.templates[name].schema.clean(doc, {
						extendAutoValueContext: {
							isInsert: true,
							userId: Meteor.userId()
						}
					});
					this.result(doc);
				}
			}
		},
		onSuccess: function() {
			Router.go('adminPagesIndex');
		}
	}
});


Template.adminPagesCreate.rendered = function () {
	if (_.keys(orion.pages.templates).length == 1) {
		Session.set('adminPagesCreate_choosenTemplate', _.keys(orion.pages.templates)[0]);
	} else {
		Session.set('adminPagesCreate_choosenTemplate', null);
	}
};

Template.adminPagesCreate.helpers({
	choosenTemplate: function() {
		var name = Session.get('adminPagesCreate_choosenTemplate');
		return name && orion.pages.templates[name];
	},
	templates: function () {
		return _.values(orion.pages.templates);
	}
});

Template.adminPagesCreate.events({
	'click .template-choose': function () {
		Session.set('adminPagesCreate_choosenTemplate', this.template);
	},
	'click #cancel-btn': function () {
		if (_.keys(orion.pages.templates).length == 1) {
			Router.go('adminPagesIndex')
		} else {
			Session.set('adminPagesCreate_choosenTemplate', null);
		}
	},
	'click #submit-btn': function () {
		$("#adminPagesCreateForm").submit();
	}
});