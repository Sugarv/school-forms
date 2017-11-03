import { Accounts } from 'meteor/accounts-base';
import { T9n } from 'meteor/softwarerero:accounts-t9n';
import { i18n } from 'meteor/anti:i18n';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Roles } from 'meteor/alanning:roles';

const afterLogin = function(error, state){
  if (error){
    console.log(error);
    return;
  }
  // if admin, redirect to /admin
  if (Roles.userIsInRole( Meteor.userId(), 'admin' )) {
     Meteor.setTimeout(function() {
       FlowRouter.go('Admin_route');
     }, 300);
  }
}

// Set language for AutoForm
T9n.setLanguage("el");
// Set language for Reactive Table
i18n.setLanguage('gr');

AccountsTemplates.configure({
  // Behavior
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,
  focusFirstInput: true,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: false,
  positiveFeedback: true,
  showValidating: true,
  
  onSubmitHook: afterLogin,
});