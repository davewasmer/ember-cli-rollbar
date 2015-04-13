/* global Rollbar */
import Ember from 'ember';

export default {
  name: 'rollbar',
  initialize: function() {
    var errorLogger = Ember.Logger.error;
    Ember.Logger.error = function() {
      if (Rollbar) {
        Rollbar.error.apply(Rollbar, arguments);
      }
      errorLogger.apply(this, arguments);
    };
    var warnLogger = Ember.Logger.warn;
    Ember.Logger.warn = function() {
      if (Rollbar) {
        Rollbar.warning.apply(Rollbar, arguments);
      }
      warnLogger.apply(this, arguments);
    };
    var infoLogger = Ember.Logger.info;
    Ember.Logger.info = function() {
      if (Rollbar) {
        Rollbar.info.apply(Rollbar, arguments);
      }
      infoLogger.apply(this, arguments);
    };
    var debugLogger = Ember.Logger.debug;
    Ember.Logger.debug = function() {
      if (Rollbar) {
        Rollbar.debug.apply(Rollbar, arguments);
      }
      debugLogger.apply(this, arguments);
    };
  }
};
