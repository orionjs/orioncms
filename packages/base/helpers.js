/**
 * Orion Helpers
 */
orion.helpers = {};

/**
 * Searchs a object with a givin string
 * you can specify if you want the searcher to
 * take the first values of array if they are
 */
orion.helpers.searchObjectWithDots = function(object, key, selectFirstIfIsArray) {
  key = key.split('.');

  try {
    for (var i = 0; i < key.length; i++) {
      if (selectFirstIfIsArray && object.length && object.length > 0) {
        object = object[0];
      }
      if (key[i] in object) {
        object = object[key[i]];
      } else {
        return undefined;
      }
    }
  } catch(error) {
    return undefined;
  }

  return object;
};

/**
 * Deep extend
 */
orion.helpers.deepExtend = function(target, source) {
  for (var prop in source)
    if (prop in target && typeof(target[prop]) == 'object' && typeof(source[prop]) == 'object')
      orion.helpers.deepExtend(target[prop], source[prop]);
    else
      target[prop] = source[prop];
  return target;
};

/**
 * Returns a function that returns the translation
 * Useful for autoform
 */
orion.helpers.getTranslation = function(key) {
  return function() {
    return i18n(key);
  };
};
