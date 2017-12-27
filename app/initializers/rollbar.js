/* global Rollbar */
import Ember from 'ember';

const { typeOf, Logger } = Ember;

function stringify(object) {
  return JSON ? JSON.stringify(object) : object.toString();
}

function isError(object) {
  return typeOf(object) === 'error';
}

function initialize() {
  let errorLogger = Logger.error;
  Logger.error = function() {
    let args = Array.prototype.slice.call(arguments);
    let err = isError(args[0]) ? args[0] : new Error(stringify(args));

    if (window.Rollbar) {
      Rollbar.error.call(Rollbar, err);
    }
    errorLogger.apply(this, arguments);
  };
  let warnLogger = Logger.warn;
  Logger.warn = function() {
    if (window.Rollbar) {
      Rollbar.warning(...arguments);
    }
    warnLogger.apply(this, arguments);
  };
  let infoLogger = Logger.info;
  Logger.info = function() {
    if (window.Rollbar) {
      Rollbar.info(...arguments);
    }
    infoLogger.apply(this, arguments);
  };
  let debugLogger = Logger.debug;
  Logger.debug = function() {
    if (window.Rollbar) {
      Rollbar.debug(...arguments);
    }
    debugLogger.apply(this, arguments);
  };
}

export default {
  name: 'rollbar',
  initialize
};
