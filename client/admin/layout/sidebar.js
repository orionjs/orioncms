Template.adminSidebar.events({
    'click #logout-btn': function(event){
        Meteor.logout();
    },
});

Template.adminSidebar.helpers({
	getPath: function (options) {
		return Router.path('adminEntitiesIndex', {entity:this.name});;
	}
});