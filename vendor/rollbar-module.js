(function() {
  /* globals define */

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';

      return values;
    });
  }

  generateModule('rollbar', { 'default': window.Rollbar });
})();
