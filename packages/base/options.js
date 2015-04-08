/**
 * Reactive options for orion
 */
orion.options = {
  _values: {},
  _deps: {},
}

/**
 * Initialize a option variable.
 * You can set a unique string o a array of string
 */
orion.options.init = function(keys) {
  var keys = !_.isArray(keys) ? [keys] : keys;

  check(keys, [String]);

  keys.forEach(function (key) {
    orion.options._deps[key] = new Tracker.Dependency;
  });
}

/**
 * Method for setting options
 */
orion.options.set = function(key, value) {
  if (!_.has(orion.options._deps, key)) throw 'Option "' + key + '" is not initalized';
  orion.options._values[key] = value;
  orion.options._deps[key].changed();
}

/**
 * Push values to options
 */
orion.options.arrayPush = function(key, value) {
  if (!_.has(orion.options._deps, key)) throw 'Option "' + key + '" is not initalized';
  if (!_.isArray(orion.options._values[key])) throw 'Option "' + key + '" is not an array';
  orion.options._values[key].push(value);
  orion.options._deps[key].changed();
}

/**
 * Returns the value of the definition.
 * If the definition doesn't exists it 
 * returns the defaultValue
 */
orion.options.get = function(key, defaultValue) {
  if (!_.has(orion.options._deps, key)) throw 'Option "' + key + '" is not initalized';
  orion.options._deps[key].depend();
  return orion.options._values[key] || defaultValue;
};