/* global Rollbar */
import Ember from 'ember';

export default {
  name: 'rollbar',
  initialize: function() {
    if (typeof FastBoot === 'undefined') {
      var errorLogger = Ember.Logger.error;
      Ember.Logger.error = function() {
        var args = Array.prototype.slice.call(arguments),
          err = isError(args[0]) ? args[0] : new Error(stringify(args));

        if (window.Rollbar) {
          Rollbar.error.call(Rollbar, err);
        }
        errorLogger.apply(this, arguments);
      };
      var warnLogger = Ember.Logger.warn;
      Ember.Logger.warn = function() {
        if (window.Rollbar) {
          Rollbar.warning.apply(Rollbar, arguments);
        }
        warnLogger.apply(this, arguments);
      };
      var infoLogger = Ember.Logger.info;
      Ember.Logger.info = function() {
        if (window.Rollbar) {
          Rollbar.info.apply(Rollbar, arguments);
        }
        infoLogger.apply(this, arguments);
      };
      var debugLogger = Ember.Logger.debug;
      Ember.Logger.debug = function() {
        if (window.Rollbar) {
          Rollbar.debug.apply(Rollbar, arguments);
        }
        debugLogger.apply(this, arguments);
      };
    }
  }
};

var stringify = function(object){
  return JSON ? JSON.stringify(object) : object.toString();
};

var isError = function(object){
  return Ember.typeOf(object) === 'error';
};
