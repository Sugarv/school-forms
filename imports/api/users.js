import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'


if (Meteor.isServer) {
  // This code only runs on the server
  // Publish all users to the admin
  Meteor.publish('users.all', function userPublication() {
    // check if admin
    return Roles.userIsInRole( Meteor.userId(), 'admin' ) ?
      Meteor.users.find({}) : 
      [];
  });
}


Meteor.methods({
  // parse the uploaded csv userdata & import to DB
  parseUpload( data ) {
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          // check if user exists
          exists = Meteor.users.findOne( { code: item.code } );

      if ( !exists ) {
        let userObject = {
          username: item.username, 
          email: item.email, 
          password: item.password,
        }; 
         
        let id = Accounts.createUser(userObject);
        // add code to users @ server
        if (Meteor.isServer){
          Meteor.users.update(id, {
            $set: {
              code: item.code
            }
          });
        }
      } else {
        console.warn( 'Απορρίφθηκε. Ο χρήστης υπάρχει ήδη.' );
      }
    }
  }
});