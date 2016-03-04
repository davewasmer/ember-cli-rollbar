/* jshint node: true */
'use strict';

let fs = require('fs');
let path = require('path');
let merge = require('lodash/object/merge');
let template = require('lodash/string/template');

module.exports = {
  name: 'ember-cli-rollbar',
  contentFor: function(type, config) {
    let environment = this.app.env;
    config = config.rollbar || {};
    let isProductionEnv = ['development', 'test'].indexOf(environment) === -1;
    let includeScript = isProductionEnv || config.enabled;
    if (type === 'head' && includeScript) {
      let rollbarConfig = merge({
        enabled: isProductionEnv,
        captureUncaught: true,
        payload: {
          environment: environment
        }
      }, config);
      let htmlPath = path.join(__dirname, 'addon', 'rollbar.html');
      let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
      let snippetPath = path.join(__dirname, 'addon', 'snippet.js');
      let snippetContent = fs.readFileSync(snippetPath, 'utf-8');
      return template(htmlContent)({
        rollbarConfig: JSON.stringify(rollbarConfig),
        rollbarSnippet: snippetContent
      });
    }
  }
};
