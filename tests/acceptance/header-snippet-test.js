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

test('the header-snippet is present', function(assert) {
  assert.expect(2);
  visit('/');
  andThen(function() {
    let script = Ember.$('head script').html();
    console.log(script);
    assert.ok(script.match(/_rollbarConfig = \{/));
    // Check that the snippet made it in - since the snippet changes frequently,
    // just check that the word function appears (since it's always going to at
    // least have that).
    assert.ok(script.match(/function/));
  });
});
