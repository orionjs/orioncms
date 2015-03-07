orion.dictionary.getSchema = function(name) {
	name = name.replace('.', '.$.');
	return orion.dictionary.schema[name];
};

orion.dictionary.getType = function(name) { 
	return typeof orion.dictionary.getSchema(name).type();
}