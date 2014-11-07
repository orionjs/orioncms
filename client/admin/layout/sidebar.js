Template.adminSidebar.events({
    'click #logout-btn': function(event){
        Meteor.logout();
    },
});