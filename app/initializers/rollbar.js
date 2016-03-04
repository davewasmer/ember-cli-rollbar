/* global Rollbar */
import Ember from 'ember';

export default {
  name: 'rollbar',
  initialize() {
    let errorLogger = Ember.Logger.error;
    Ember.Logger.error = function() {
      if (window.Rollbar) {
        Rollbar.error(...arguments);
      }
      errorLogger(...arguments);
    };
    let warnLogger = Ember.Logger.warn;
    Ember.Logger.warn = function() {
      if (window.Rollbar) {
        Rollbar.warning(...arguments);
      }
      warnLogger(...arguments);
    };
    let infoLogger = Ember.Logger.info;
    Ember.Logger.info = function() {
      if (window.Rollbar) {
        Rollbar.info(...arguments);
      }
      infoLogger(...arguments);
    };
    let debugLogger = Ember.Logger.debug;
    Ember.Logger.debug = function() {
      if (window.Rollbar) {
        Rollbar.debug(...arguments);
      }
      debugLogger(...arguments);
    };
  }
};
