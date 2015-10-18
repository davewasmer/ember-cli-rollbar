'use strict';

module.exports = function(environment, appConfig) {
  // Override the default disabled state for testing this addon
  appConfig.rollbar = { enabled: true };
  return {};
};
