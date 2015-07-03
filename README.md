Orion
=====

[![Join the chat at https://gitter.im/orionjs/orion](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/orionjs/orion?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Orion is an open source framework built on Meteor that makes complex as well as simple apps possible with minimal effort. It's built, modified, used, and supported by an active community of people around the world.

## Getting Started

To start your orion instance the first thing you need to do is install the core package and an admin template.
Orion has two templates, one for [bootstrap](http://getbootstrap.com) and one for [materialize](http://materializecss.com).

```sh
meteor add orionjs:core
```

And now decide which one to use

```sh
meteor add twbs:bootstrap fortawesome:fontawesome orionjs:bootstrap
```

*Either `twbs:bootstrap` or similar*

*Either `fortawesome:fontawesome` or similar*

or

```sh
meteor add materialize:materialize orionjs:materialize
```

And now

```sh
meteor
```

And now go

[http://localhost:3000/admin](http://localhost:3000/admin)


#### Documentation

[orionjs.org](http://orionjs.org)

#### Preview

[orion-example.meteor.com](http://orion-example.meteor.com)

#### Docker fans
[There is a container for that](https://registry.hub.docker.com/u/gekkie/orion_meteor_cms/)

#### Roadmap

[trello.com/b/dQhi5dF9/orion-roadmap](https://trello.com/b/dQhi5dF9/orion-roadmap)

#### Newsletter

This project is very active. If you use orion you should definitely **[subscribe](http://eepurl.com/bbji3b)** to the newsletter.

#### Translate Orion

If you want to help translating Orion to your language follow the [instructions](https://github.com/orionjs/examples/tree/master/language).

#### Community Add-On Packages

*Submit a pull request to add your package to this list*

**Admin Themes:**

- [rwatts:orionjs-foundation](https://github.com/rwatts3/orionjs-contrib/blob/master/orionjs-foundation/README.md)

**Attributes:**

- [rwatts:orion-maps](https://atmospherejs.com/rwatts/orion-maps)

**Filesystem:**

- [vsivsi:orion-file-collection](https://atmospherejs.com/vsivsi/orion-file-collection) Lightweight MongoDB gridFS support

- [lc3t35:orion-filesystem-local](https://github.com/lc3t35/orion-filesystem-local)

- [brightbind:orion-gridfs](https://github.com/brightbind/orion-gridFS/)

**Languages:**

- [jorisroling:orion-lang-nl](https://github.com/jorisroling/orion-lang-nl) Dutch
- [pierreeric:orion-lang-fr](https://atmospherejs.com/pierreeric/orion-lang-fr) French
- [loongmxbt:orion-lang-zh-cn](https://github.com/loongmxbt/orion-lang-zh-cn) Simplified Chinese
- [goooseman:orion-lang-ru](https://github.com/goooseman/orion-lang-ru) Russian

**Integrations:**

- [nicolaslopezj:orion-ga](https://github.com/nicolaslopezj/orion-ga) Google analytics
