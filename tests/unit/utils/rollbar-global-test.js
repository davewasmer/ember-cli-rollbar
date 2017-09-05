import rollbar from 'rollbar';
import { module, test } from 'qunit';

module('Unit | Utility | rollbar ES2015 module');

test('it exists', function(assert) {
  assert.ok(rollbar);
});

test('it looks like the Rollbar.js API', function(assert) {
  assert.ok(rollbar.critical, 'critical exists');
  assert.ok(rollbar.debug, 'debug exists');
  assert.ok(rollbar.warning, 'warning exists');
  assert.ok(rollbar.info, 'info exists');
  assert.ok(rollbar.error, 'error exists');
  assert.ok(rollbar.configure, 'configure exists');
});
