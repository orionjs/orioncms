Package.describe({
    name: 'orionjs:lang-zh_CN',
    version: '1.1.0',
    summary: 'Orion - Default simplify Chinese language',
    git: 'https://github.com/xi3/orion',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');

    api.use([
        'msgfmt:core@2.0.0-preview.7'
    ]);

    api.imply(['msgfmt:core']);

    api.addFiles('lang-zh_CN.js', 'server');

    api.export(['msgfmt', 'mfPkg']);
});
