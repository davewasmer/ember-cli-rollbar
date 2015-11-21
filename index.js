/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-rollbar',
  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    var config = this.project.config(this.app.env);
    if (config.rollbar) {
      target.import("vendor/rollbar-snippet.js")
    }
  }
};
