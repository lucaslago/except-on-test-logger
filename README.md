# Except on test logger


A really simple console.log wrapper that only logs to stdout if `process.env.NODE_ENV` is set to anythin different than `test`, so it does not pollute your test suite.

## Installation

`npm install except-on-test-logger --save`

## How to use

```javascript
process.env.NODE_ENV = 'test';
const logger = require('except-on-test-logger');

// this does not print to stdout
logger.log('hello');

process.env.NODE_ENV = 'production';
// this gets printed to to stdout
logger.log('hello');


```

## License

MIT