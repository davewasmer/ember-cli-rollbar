/* eslint-env node */
/* eslint-disable object-shorthand */

module.exports = {
  description: 'Default ember-cli-rollbar blueprint.',
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'rollbar' }
    ]);
  }
};
