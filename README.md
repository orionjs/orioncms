Orion
=====

http://orion.meteor.com

This is a simple and useful cms for meteor. 
Creates automatically a admin panel for your 
collections and gives you the ability to have
key/value definitions for your site.

![alt tag](http://i.imgur.com/aTG9iF5.png)

## Features

#### Dictionary:
The dictionary is where you can save key/value definitions, allowing the admin to change things like the site logo or the content of a page.

#### Entities:
Orion generates the full crud for your collections.

#### Custom attributes:
In orion you can add custom attributes like images to entities and dictionary with just a line of code.

- [orionjs:image-attribute](http://orion.meteor.com/docs/attributes/image)
Save images easily in the dictionary or entities, uploading them to a S3 bucket.

- [orionjs:summernote](http://orion.meteor.com/docs/attributes/summernote)
Use the powerful summernote editor. The images uploaded are saved in a S3 bucket.

- Add one yourself
It's very easy to add custom attributes to orion. You can start by forking https://atmospherejs.com/orionjs/summernote.

#### Custom Admin Panel:
You can make your own admin panel. Start by forking https://atmospherejs.com/orionjs/admin.

## Getting Started

#### Install the package

```
meteor add orionjs:admin
```

#### Add bootstrap (if you haven't)

Orion admin is styled with bootstrap. Choose the bootstrap theme or make one your one.
For example, use this theme created by bootswatch

```
meteor add mrt:bootswatch-yeti
```

#### Create a new user

Users can access to orion admin. You need to create one manually
Add this code to a file in ```server/```

```js
if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        email: 'your email',
        password: 'your password'
    });
}
```

#### Read the docs!

Go to the [documentation](http://orion.meteor.com/docs/dictionary) and learn how to be an expert in orion

#### Browse the example

View the [example blog](https://github.com/orionjs/example-blog) made with orion
