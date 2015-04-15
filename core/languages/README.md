# Languages

You can activate languages and make your dictionary localizable.
Support for entities will be added soon.

## Activate Languages

Languages are deactivated by default, you must set the **default language** and
a **additional language** in order to activate the functionality.

Orion will automatically detect the browser language and set it, if the browser language
is not in the sistem, it will set the default language.

On the **dictionary** you will be able to edit it with the default language
and also with aditional languages. If a value is set in the default language and
not the current it will take the default language value.

### Set Default Language

To set the default language call

```js
orion.languages.setDefaultLanguage(options)
```

***Options***

- ```name``` **String**. The display name of the language.

### Add a Aditional Language

To add a aditional language call

```js
orion.languages.addLanguage(options)
```

***Options***

- ```identifier``` **String**. The identifier of the language, Ex: en, es, it, etc.

- ```name``` **String**. The display name of the language.

### Set current language

To set the current language call

```js
orion.languages.setCurrentLanguage(identifier)
```

- ```identifier``` **String**. The identifier of the language. To set the default language dont specify identifier.

### Get current language

To get the current language call. If the current is the default it will return ```undefined```

```js
orion.languages.getCurrentLanguage()
```
