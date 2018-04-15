/* eslint-env node */
'use strict';

module.exports = function(environment, appConfig) {
  let csp = appConfig.contentSecurityPolicy = appConfig.contentSecurityPolicy || {};
  csp['script-src'] = csp['script-src'] || '';
  csp['script-src'] += ' https://d37gvrvc0wt4s1.cloudfront.net';
  return appConfig;
};
