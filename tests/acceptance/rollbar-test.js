import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | header snippet', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('Rollbar is present', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(function() {
    assert.ok(window.Rollbar);
  });
});

test('Ember.Logger methods are patched', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(function() {
    assert.ok(Ember.Logger.info.toString().indexOf('Rollbar') > -1);
  });
});

