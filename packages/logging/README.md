# OrionJS - Logging
Provide an isomorphic logging capabilities for OrionJS.

## Installation
```bash
meteor add orionjs:logging
```

## Introduction
This package exposes [Bunyan](https://github.com/trentm/node-bunyan) within OrionJS.

It declares a reusable logger in OrionJS as `orion.log` and a default formatter
as `orion.log.logFormatter`. However in order to separate your application's logs
from the one of OrionJS, we recommend you to instantiate your own logger like so:

```js
// Client and server side
myAppLog = new bunyan.createLogger({
  name: 'myApp',
  stream: orion.logFormatter,
  level: 'info'
});
...
// And using it this way within your app
myAppLog.info('Info level logs');
myAppLog.warn('Warning level logs');
myAppLog.error('Error level logs');
...
```

## Links
* Inspired from [Ongoworks's Bunyan](https://github.com/ongoworks/meteor-bunyan)
* [Bunyan](https://github.com/trentm/node-bunyan)
* [Comparison between Winston and Bunyan](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/)
* [Log with style](https://www.npmjs.com/package/log-with-style)
