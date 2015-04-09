/**
 * Reactive options for orion
 */
_options = {
  _values: {},
  _deps: {},
}

/**
 * Initialize a option variable.
 * You can set a unique string o a array of string
 */
_options.init = function(key, initialValue) {
  check(key, String);
  _options._deps[key] = new Tracker.Dependency;
  _options._values[key] = initialValue;
}

/**
 * Method for setting options
 */
_options.set = function(key, value) {
  if (!_.has(_options._deps, key)) throw 'Option "' + key + '" is not initalized';
  _options._values[key] = value;
  _options._deps[key].changed();
}

/**
 * Push values to options
 */
_options.arrayPush = function(key, value) {
  if (!_.has(_options._deps, key)) throw 'Option "' + key + '" is not initalized';
  if (!_.isArray(_options._values[key])) throw 'Option "' + key + '" is not an array';
  _options._values[key].push(value);
  _options._deps[key].changed();
}

/**
 * Returns the value of the definition.
 * If the definition doesn't exists it 
 * returns the defaultValue
 */
_options.get = function(key, defaultValue) {
  if (!_.has(_options._deps, key)) throw 'Option "' + key + '" is not initalized';
  _options._deps[key].depend();
  return _options._values[key] || defaultValue;
};