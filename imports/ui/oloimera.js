import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Oloimera } from '../api/oloimera.js';

import './oloimera.html';

Template.Oloimera_list.onCreated(function oloimeraOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('oloimera.user');
});

Template.Oloimera_list.helpers({
  oloimera() {
    /*const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }*/
    // Otherwise, return all of the tasks
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
    console.log(newRecord);
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