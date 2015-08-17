// Default log informations
ORION_LOG_FRAMEWORK_NAME = 'OrionJS';
ORION_LOG_LEVEL = 'info';

// Instantiate logger
orion.log = bunyan.createLogger({
  name: ORION_LOG_FRAMEWORK_NAME,
  stream: orion.logFormatter,
  level: ORION_LOG_LEVEL
});

orion.log.info('Logger activated');
