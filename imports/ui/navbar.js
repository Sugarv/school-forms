import './navbar.html';

Template.navBar.helpers({
  isAdmin: function() {
    return Roles.userIsInRole( Meteor.userId(), 'admin' ) ?
      '/admin' :
      '';
  }
});
