import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Oloimera = new Mongo.Collection('oloimera');

// Helper array to determine month series
const months = [
  'Σεπτέμβριος',
  'Οκτώβριος',
  'Νοέμβριος',
  'Δεκέμβριος',
  'Ιανουάριος',
  'Φεβρουάριος',
  'Μάρτιος',
  'Απρίλιος',
  'Μάιος',
  'Ιούνιος'
];

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish records that belong to the current user
  Meteor.publish('oloimera.user', function schoolsPublication() {
    return Oloimera.find({schoolId: Meteor.userId()});
  });
  // Publish all records to the admin
  Meteor.publish('oloimera.admin', function schoolsPublication() {
    // check if admin
    return Oloimera.find({});
  });
}

const oloimeraSchema = new SimpleSchema({
  schoolId: {
      type: String,
      label: "School ID",
      optional: true
  },
  schoolPeriod: {
    type: String,
    label: "Σχολικό έτος",
    optional: true
  },
  month: {
    type: String,
    label: "Μήνας",
    allowedValues: months,
  },
  monthaa: {
    type: Number,
    optional: true
  },
  students: {
    type: Array,
    label: 'Μαθητές'
  },
  'students.$': {
      type: Object,
      label: 'Μαθητής'
  },
  'students.$.name': {
    type: String,
    label: 'Όνομα',
  },
  'students.$.surname': {
    type: String,
    label: 'Επώνυμο',
  },
  'students.$.father': {
    type: String,
    label: 'Πατρώνυμο',
  },
  'students.$.class': {
    type: String,
    label: "Τάξη",
    allowedValues: [
      'Α', 'Β','Γ','Δ','Ε','ΣΤ',
    ],
  },
  'students.$.type': {
    type: String,
    label: "Τύπος",
    allowedValues: [
      'Ολοήμερο', 'Πρωινή Ζώνη'
    ],
  },
  'students.$.leave': {
    type: String,
    label: "Ώρα αποχώρησης",
    allowedValues: [
      '15.00', '16.00'
    ],
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  }
}, { tracker: Tracker });

Oloimera.attachSchema(oloimeraSchema);

Meteor.methods({
  'oloimera.insert'(rec) {
    // Make sure the user is logged in before inserting a record
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // determine month series
    rec.monthaa = months.indexOf(rec.month) + 1;
    rec.schoolPeriod = '2017-18';
    rec.schoolId = this.userId;
    rec.createdAt = new Date();
    return Oloimera.insert(rec);
  },
  'oloimera.update'(params) {
    // Make sure the user is logged in before inserting a record
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Oloimera.update({_id: params._id}, params.modifier);
  },
  'oloimera.delete'(id) {
    check(id, String);
    
    // Make sure the user is logged in before inserting a record
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const theRecord = Oloimera.findOne({_id: id});
    if (theRecord.schoolId === this.userId)
      return Oloimera.remove({_id: id});
    throw new Meteor.Error('not-authorized');
  }
});