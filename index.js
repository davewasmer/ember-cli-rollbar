/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var merge = require('lodash/object/merge');
var template = require('lodash/string/template');

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
      var htmlPath = path.join(__dirname, 'addon', 'rollbar.html');
      var htmlContent = fs.readFileSync(htmlPath, 'utf-8');
      var snippetPath = path.join(__dirname, 'addon', 'snippet.js');
      var snippetContent = fs.readFileSync(snippetPath, 'utf-8');
      return template(htmlContent)({
        rollbarConfig: JSON.stringify(rollbarConfig),
        rollbarSnippet: snippetContent
      });
    }
  }
};
