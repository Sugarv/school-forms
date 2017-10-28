import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../ui/body.js';
//import '../../ui/pages/lists-show-page.js';
//import '../../ui/pages/app-not-found.js';

// Import to override accounts templates
//import '../../ui/accounts/accounts-templates.js';

FlowRouter.route('/oloimera', {
  name: 'Oloimera.list',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_list' });
  },
});
FlowRouter.route('/oloimera/new', {
  name: 'Oloimera.new',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_new' });
  },
});
FlowRouter.route('/oloimera/:id', {
  name: 'Oloimera.detail',
  action() {
    BlazeLayout.render('App_body', { main: 'Oloimera_detail' });
  },
});


FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'Home' });
  },
});

// the App_notFound template is used for unknown routes and missing lists
/*FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};*/