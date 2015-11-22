/* jshint node: true */
'use strict';

var fs = require('fs')

module.exports = {
  name: 'ember-cli-rollbar',
  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    var config = this.project.config(this.app.env);
    if (config.rollbar) {
      target.import("vendor/rollbar-snippet.js", {prepend: true});
      target.import(this.configFilePath(config), {prepend: true});
    }
  },
  configFilePath: function(config){
    var name = 'vendor/_rollbarConfig.js';
    fs.writeFileSync(__dirname+"/"+name, this.rollbarConfig(config));
    return name;
  },
  rollbarConfig: function(config) {
    return "var _rollbarConfig = "+JSON.stringify(Object.assign({
      captureUncaught: true,
      reportLevel: 'warning',
      payload: {
        environment: "development"
      }
    }, config.rollbar || {}));
  }
};
