/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var merge = require('lodash-node/modern/object/merge');
var template = require('lodash-node/modern/string/template');

module.exports = {
  name: 'ember-cli-rollbar',
  contentFor: function(type, config) {
    var environment = this.app.env;
    config = config.rollbar || {};
    var isProductionEnv = ['development', 'test'].indexOf(environment) === -1;
    var includeScript = isProductionEnv || config.enabled;
    if (type === 'head' && includeScript) {
      var rollbarConfig = merge({
        enabled: isProductionEnv,
        captureUncaught: true,
        payload: {
          environment: environment
        }
      }, config);
      var snippetPath = path.join(__dirname, 'addon', 'rollbar-snippet.html');
      var snippetContent = fs.readFileSync(snippetPath, 'utf-8');
      return template(snippetContent)({ rollbarConfig: JSON.stringify(rollbarConfig) });
    }
  }
};
