(function() {
  /* globals define, Rollbar */

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';

      return values;
    });
  }

  generateModule('rollbar', { 'default': Rollbar });
})();
