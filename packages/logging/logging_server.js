bunyan = Npm.require('bunyan');
bunyanFormat = Npm.require('bunyan-format');

// Formatter
orion.logFormatter = bunyanFormat({outputMode: 'short', color: true});
