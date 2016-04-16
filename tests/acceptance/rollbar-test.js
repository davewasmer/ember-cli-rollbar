import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | header snippet', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Rollbar is present', function(assert) {
  assert.expect(2);
  visit('/');
  andThen(function() {
    assert.ok(window.Rollbar);
  });
});

test('Ember.Logger methods are patched', function(assert) {
  assert.expect(2);
  visit('/');
  andThen(function() {
    assert.ok(Ember.Logger.info.toString().indexOf('Rollbar') > -1);
  });
});

