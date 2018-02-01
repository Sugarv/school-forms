import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router'
import Papa from 'papaparse';
import { Bert } from 'meteor/themeteorchef:bert';
import '../api/users.js';
import './admin.html';
import { Oloimera } from '../api/oloimera.js';
import { monthNames } from '../api/oloimera.js';

import './oloimera.html';


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




 ///////////////////////////
// Oloimera_Admin Template
///////////////////////////

Template.Oloimera_Admin_old.onCreated(function oloimeraOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('oloimera.user');
  Meteor.subscribe('users.all');
});
Template.Oloimera_Admin_old.helpers({
  rtSettings() {
    return {
        collection: Oloimera,
        rowsPerPage: 10,
        showFilter: true,
        fields: [
          {
            key: 'schoolName',
            label: 'Σχολείο',
            //sortable: false,
          },
          {
            key: 'month',
            label: 'Μήνας',
            sortable: true
          },
          {
            key: '_id',
            label: 'Ενέργεια',
            fn: function (value, object) {
              let retStr = `<a href="/oloimera/${value}" class="viewBtn">Προβολή</a>`;
              retStr += '&nbsp;<a href="#" class="delete-record">Διαγραφή</a>';
              return new Spacebars.SafeString(retStr);
            },
            sortable: false
          }
        ],
        class: "table table-striped table-bordered"
  }
}
});
Template.Oloimera_Admin_old.events({
  'click .reactive-table tbody tr': function (event) {
    // if user clicks delete button
    if (event.target.className.indexOf("delete-record") > -1) {
      if (confirm("Είστε βέβαιοι;") == true) {
        Meteor.call('oloimera.delete', this._id);
      }
    }
  }
});


Template.Oloimera_Admin_months.helpers({
  monthRow(){
    let returnData = monthNames.map((val,index,arr) => {return {monInd: index, monName: val, monSch: 'todo'}});
    return returnData;
  }
});

Template.Oloimera_Admin_month.onCreated(function oloimeraOnCreated() {
  let monId = FlowRouter.getParam('id');
  Template.instance().monId = monId;
  Meteor.subscribe('oloimera.month', monId);
  Meteor.subscribe('users.usernames');
});
Template.Oloimera_Admin_month.helpers({
  monthSchools() {
    let monId1 = parseInt(Template.instance().monId) + 1;
    let oloimeraMonth = Oloimera.find({monthaa: monId1}).fetch();
    let returnData = oloimeraMonth.map((val,ind,arr) => {
      let theUser = Meteor.users.findOne({_id: val.schoolId});
      let uName = theUser ? theUser.username : '';
      return {
        schId: val.schoolId, 
        schName: uName, 
        monId: Template.instance().monId,
      }
    });
    return returnData;
  },
  curMonth() {
    return monthNames[Template.instance().monId];
  }
});

Template.Oloimera_Admin_school.onCreated(function oloimeraOnCreated() {
  let monId = FlowRouter.getQueryParam('month');
  let schId = FlowRouter.getParam('id');
  Template.instance().schId = schId;
  Template.instance().monId = monId;
  Meteor.subscribe('oloimera.singleMonth', schId, monId);
  Meteor.subscribe('users.single', schId);
});
Template.Oloimera_Admin_school.helpers({
  theRecord() {
    return Oloimera.findOne({
      schoolId: Template.instance().schId, 
      monthaa: parseInt(Template.instance().monId)+1,
    });
  },
  schName() {
    let theUser = Meteor.users.findOne({_id: Template.instance().schId});
    return theUser ? theUser.username : '';
  },
  studentCount() {
    let theRecord = Oloimera.findOne({
      schoolId: Template.instance().schId, 
      monthaa: parseInt(Template.instance().monId)+1,
    });
    return theRecord ? theRecord.students.length : '';
  }
});