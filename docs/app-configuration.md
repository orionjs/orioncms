# App Configuration

**orion.config** is like "enviroment vars" editable in the admin interface.
When the server starts it fetches the variables from the database
and each time the admin updates the settings the server is **restarted**.

*Only the admin can see and edit this variables, unless you specify otherwise*.

## Adding variables

To add variables to the config, call in shared code:

```js
orion.config.add(name, category, options);
```

- ```name``` **String**. This is the name of the variable.
When you want to access the value of the variable you have to
use the **name**.

- ```category``` **String**. The only purpose of the category is to
organize the variables in the admin panel.


***Options***

- ```type``` **type**. The type, it can be ```String```, ```Boolean```, etc.

- ```label``` **String**. Optional. The label that will be shown in the admin panel.

- ```secret``` **Boolean**. Default: ```false```. If ```true```, the content will be
hidden in the input (```type="password"```) unless the admin is editing it.

- ```public``` **Boolean**. Default: ```false```. If ```true```, This variable will
be passed to the client.

## Using the variables

To get the value of the variable, call in the server:

```js
orion.config.get(name);
```

- ```name``` **String**. The name of the variable.

## Example

In previous versions of orion, to upload with s3 you had to set the AWS keys in the code.
Now ```orionjs:s3``` is made to work with ```orion.config```. This is how it's done:

```js
/**
 * Before
 *
 * In yourapp/server/s3.js
 */

S3.config = {
  key: /* Hard coded key */,
  secret: /* Hard coded secret key */,
  bucket: /* Hard coded bucket name */
};

/**
 * After
 *
 * In orionjs:s3 package
 * (you don't have to do nothing now)
 */

/**
 * Initializes the variables, so you can
 * edit them in the admin panel
 */
orion.config.add('AWS_API_KEY', 'aws');
orion.config.add('AWS_API_SECRET', 'aws', { secret: true });
orion.config.add('AWS_S3_BUCKET', 'aws');

/**
 * Sets the credentials when the server starts
 */
S3.config = {
  key: orion.config.get('AWS_API_KEY'),
  secret: orion.config.get('AWS_API_SECRET'),
  bucket: orion.config.get('AWS_S3_BUCKET')
};
```
