import '../imports/api/oloimera.js';
import '../imports/api/users.js';
import { Accounts } from 'meteor/accounts-base';

// Assign 'user' role to new users
Accounts.onCreateUser((options, user) => {
   user.roles = ['user'];
   return user;
 });
