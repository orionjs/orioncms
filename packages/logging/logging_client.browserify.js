RotatingFileStream = null; // see: https://github.com/trentm/node-bunyan/issues/223
bunyan = require('bunyan');
WritableStream = require('stream').Writable;
inherits = require('util').inherits;
logStyle = require('log-with-style');

inherits(BrowserStdout, WritableStream);

function BrowserStdout() {
  if (!(this instanceof BrowserStdout)) {
    return new BrowserStdout();
  }
  WritableStream.call(this);
}

BrowserStdout.prototype._write = function(chunks, encoding, cb) {
  var output = JSON.parse(chunks.toString ? chunks.toString() : chunks);
  var color = '[c="color: green"]';
  var level = 'INFO';
  if (output.level > 40) {
    color = '[c="color: red"]';
    if (output.level === 60) {
      level = 'FATAL';
    } else {
      level = 'ERROR';
    }
  } else if (output.level === 40) {
    color = '[c="color: orange"]';
    level = 'WARNING';
  } else if (output.level === 20) {
    level = 'DEBUG';
  } else if (output.level === 10) {
    level = 'TRACE';
  }
  logStyle(color + level + '[c] ' + '[c="color: blue"]' + output.name + '[c] ' + output.msg);
  process.nextTick(cb);
};

// Import process.stdout and process.stderr
process = require('process');
process.stdout = BrowserStdout();
process.stderr = BrowserStdout();

orion.logFormatter = BrowserStdout();
