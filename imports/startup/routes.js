import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../ui/body.js';
//import '../../ui/pages/lists-show-page.js';
//import '../../ui/pages/app-not-found.js';

// Import to override accounts templates
//import '../../ui/accounts/accounts-templates.js';


privateRoutes = FlowRouter.group({
  triggersEnter: [function(context, redirect, stop){
    if (!Meteor.userId()){
      redirect('/');
    }
  }]
});

publicRoutes = FlowRouter.group({});

publicRoutes.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'Home' });
  },
});
privateRoutes.route('/oloimera', {
  name: 'Oloimera.list',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_list' });
  },
});
privateRoutes.route('/oloimera/new', {
  name: 'Oloimera.new',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_new' });
  },
});
privateRoutes.route('/oloimera/:id', {
  name: 'Oloimera.detail',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_detail' });
  },
});

// admin routes
privateRoutes.route('/admin', {
  name: 'Admin_route',
  action() {
    BlazeLayout.render('App_body', { main: 'Admin_Home' });
  },
});
privateRoutes.route('/admin/oloimera/', {
  name: 'Oloimera_Admin_route',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_Admin' });
  },
});
privateRoutes.route('/admin/oloimera-months/', {
  name: 'Oloimera_Admin_months',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_Admin_months' });
  },
});
privateRoutes.route('/admin/oloimera/month/:id', {
  name: 'Oloimera_Admin_month',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_Admin_month' });
  },
});
privateRoutes.route('/admin/oloimera/school/:id', {
  name: 'Oloimera_Admin_school',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_Admin_school' });
  },
});
privateRoutes.route('/admin/upload/', {
  name: 'Admin_upload_route',
  action() {
    BlazeLayout.render('App_body', { main: 'uploadUsers' });
  },
});


// the App_notFound template is used for unknown routes and missing lists
/*FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};*/