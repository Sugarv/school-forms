import { Template } from 'meteor/templating';
import Papa from 'papaparse';
import { Bert } from 'meteor/themeteorchef:bert';
import '../api/users.js';
import './admin.html';

Template.uploadUsers.onCreated( () => {
   Template.instance().uploading = new ReactiveVar( false );
 });
 
 Template.uploadUsers.helpers({
   uploading() {
     return Template.instance().uploading.get();
   }
 });

 Template.uploadUsers.events({
   'change [name="uploadCSV"]' ( event, template ) {
      template.uploading.set( true );
  
      Papa.parse( event.target.files[0], {
        header: true,
        complete( results, file ) {
          Meteor.call( 'parseUpload', results.data, ( error, response ) => {
            if ( error ) {
              console.log( error.reason );
              Bert.alert( 'Προέκυψε ένα σφάλμα!', 'danger', 'growl-top-right' );
            } else {
              template.uploading.set( false );
              Bert.alert( 'Το ανέβασμα ολοκληρώθηκε επιτυχώς!', 'success', 'growl-top-right' );
            }
          });
        }
      });
    }
 });