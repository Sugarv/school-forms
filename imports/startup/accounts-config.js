import { Accounts } from 'meteor/accounts-base';
import { T9n } from 'meteor/softwarerero:accounts-t9n';
import { AccountsTemplates } from 'meteor/useraccounts:core';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

T9n.setLanguage("el");

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
  
/*
  // Redirects
  homeRoutePath: '/home',
  redirectTimeout: 4000,

  // Hooks
  onLogoutHook: myLogoutFunc,
  onSubmitHook: mySubmitFunc,
  preSignUpHook: myPreSubmitFunc,
  postSignUpHook: myPostSubmitFunc,
  */
});