# ember-cli-rollbar

Drop-in Rollbar error reporting integration. Just add your Rollbar client-side access token to your `config/environment.js`:

```js
var ENV = {
  //...
  rollbar: {
    accessToken: '<your token here>'
  }
};
```

The `rollbar` config object is used to configure Rollbar, and defaults to the following options:

```js
{
  enabled: environment !== 'development',
  captureUncaught: true,
  payload: {
    environment: environment
  }
}
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
