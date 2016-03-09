# MaterialNote for Orionjs

This package is a bundling of the Materialnote from https://github.com/Cerealkillerway/materialNote


It works just like summernote as an attribute.

```
Posts.attachSchema(new SimpleSchema({
        title: {
            type: String
        },
    
        content: orion.attribute("materialnote",{
            label: "Blog Post"
        }),
    
        author: orion.attribute("createdBy"),
        createdAt: orion.attribute("createdAt"),
        updatedAt: orion.attribute("updatedAt"),
        image: orion.attribute("image", {
            label: "Top Image(Optional)",
            optional: true
        }),
    }));
    
```

BUGS

Seems taht some of the summernote features like font changing