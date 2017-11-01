import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Oloimera } from '../api/oloimera.js';

import './oloimera.html';

///////////////////////////
// Oloimera_list Template
///////////////////////////
Template.Oloimera_list.onCreated(function oloimeraOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('oloimera.user');
});

Template.Oloimera_list.helpers({
  oloimera() {
    return Oloimera.find({});
  },
});

Template.Oloimera_list.events({
  'click .delete-record'(event) {
    event.preventDefault();

    const recordId = event.target.id;
    if (confirm("Είστε βέβαιοι;") == true) {
      Meteor.call('oloimera.delete', recordId);
    }
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});

///////////////////////////
// Oloimera_new Template
///////////////////////////
Template.Oloimera_new.onCreated(function() {
  // search for latest record. if found, clone & change a few data 
  const latestRecord = Oloimera.findOne({}, { sort: { createdAt: -1 }});
  if (latestRecord && latestRecord.monthaa < 9) {
    newRecord = {};
    newRecord.students = latestRecord.students;
    newRecord.monthaa = latestRecord.monthaa + 1;
    newRecord.month = recordMonths[newRecord.monthaa];
    Meteor.call('oloimera.insert', newRecord, function(error, success) { 
      if (error) { 
        console.log('error', error); 
      } 
      if (success) { 
         console.log(success);
         FlowRouter.go('Oloimera.detail', {id: success});
      } 
    });
    //console.log(newRecord);
  }
  
});
Template.Oloimera_new.helpers({
  oloimeraCol() {
    return Oloimera;
  },
  hiddenFields() {
    return [
      'schoolId', 'createdAt', 'schoolPeriod', 'monthaa'
    ];
  }
});

///////////////////////////
// Oloimera_detail Template
///////////////////////////
Template.Oloimera_detail.helpers({
  oloimeraCol() {
    return Oloimera;
  },
  hiddenFields() {
    return [
      'schoolId', 'createdAt', 'schoolPeriod', 'monthaa'
    ];
  },
  selectedDoc() {
    const recId = FlowRouter.getParam('id');
    return Oloimera.findOne({
      _id: recId
    });
    
  }
});

///////////////////////////
// Oloimera_Admin Template
///////////////////////////
Template.Oloimera_Admin.onCreated(function oloimeraOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('oloimera.user');
  Meteor.subscribe('users.all');
});
Template.Oloimera_Admin.helpers({
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
Template.Oloimera_Admin.events({
  'click .reactive-table tbody tr': function (event) {
    // if user clicks delete button
    if (event.target.className.indexOf("delete-record") > -1) {
      if (confirm("Είστε βέβαιοι;") == true) {
        Meteor.call('oloimera.delete', this._id);
      }
    }
  }
});