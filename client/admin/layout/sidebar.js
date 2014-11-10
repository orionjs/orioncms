Template.adminSidebar.events({
    'click #logout-btn': function(event){
        Meteor.logout();
        Router.go('/');
    },
});

Template.adminSidebar.helpers({
	getPath: function (options) {
		return Router.path('adminEntitiesIndex', {entity:this.name});;
	},
});