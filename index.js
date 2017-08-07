/* jshint node: true */
/* eslint no-var: "off", object-shorthand: "off" */
'use strict';

var merge = require('lodash/merge');
var replace = require('broccoli-string-replace');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cli-rollbar',
  options: {
    nodeAssets: {
      'rollbar': {
        enabled: this.enabled,
        import: {
          include: ['vendor/rollbar.js', 'vendor/rollbar-module.js'],
          processTree(input) {
            return fastbootTransform(input);
          }
        }
      }
    }
  },
  included(app) {
    var config = this.project.config(this.app.env).rollbar || {};
    var defaultEnabled = this.app.env !== 'development' && this.app.env !== 'test';
    this.enabled = config.enabled == null ? defaultEnabled : config.enabled;

    this._super.included.apply(this, arguments);
  },
  treeForVendor: function(vt) {
    var vendorTree = this._super.treeForVendor(vt);

    var config = this.project.config(this.app.env).rollbar || {};
    config = merge({
      enabled: this.app.env !== 'development' && this.app.env !== 'test',
      captureUncaught: true,
      payload: {
        environment: this.app.env
      }
    }, config);
    var clientTree = replace(path.join(__dirname, 'client'), {
      files: ['rollbar.js'],
      pattern: {
        match: /ROLLBAR_CONFIG/g,
        replacement: JSON.stringify(config)
      }
    });

    return mergeTrees([vendorTree, clientTree], {
      overwrite: true
    });
  }
};
