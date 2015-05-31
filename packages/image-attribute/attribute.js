orion.attributes.registerAttribute('image', {
  template: 'orionAttributesImage',
  previewTemplate: 'orionAttributesImagePreview',
  getSchema: function(options) {
    // Checking
    check(options, {
      cropper: Match.Optional({
        aspectRatio: Match.Optional(Number),
        crop: Match.Optional(Function),
        preview: Match.Optional(String),
        strict: Match.Optional(Boolean),
        responsive: Match.Optional(Boolean),
        checkImageOrigin: Match.Optional(Boolean),
        background: Match.Optional(Boolean),
        modal: Match.Optional(Boolean),
        guides: Match.Optional(Boolean),
        highlight: Match.Optional(Boolean),
        autoCrop: Match.Optional(Boolean),
        autoCropArea: Match.Optional(Number),
        dragCrop: Match.Optional(Boolean),
        movable: Match.Optional(Boolean),
        resizable: Match.Optional(Boolean),
        zoomable: Match.Optional(Boolean),
        mouseWheelZoom: Match.Optional(Boolean),
        touchDragZoom: Match.Optional(Boolean),
        rotatable: Match.Optional(Boolean),
        minContainerWidth: Match.Optional(Number),
        minContainerHeight: Match.Optional(Number),
        minCanvasWidth: Match.Optional(Number),
        minCanvasHeight:Match.Optional(Number),
        minCropBoxWidth: Match.Optional(Number),
        minCropBoxHeight: Match.Optional(Number),
        build: Match.Optional(Function),
        built: Match.Optional(Function),
        dragstart: Match.Optional(Function),
        dragmove: Match.Optional(Function),
        dragend: Match.Optional(Function),
        zoomin: Match.Optional(Function),
        zoomout: Match.Optional(Function)
      }),
      sizes: Match.Optional(Object)
    });

    var subSchema = {}

    subSchema.main = {
      type: new SimpleSchema({
        url: {
          type: String
        },
        fileId: {
          type: String
        }
      })
    }
    
    if (options.sizes) {
      // Check sizes
      _.each(_.values(options.sizes), function(size){
        check(size, {

        });
      });

      subSchema.sizes = {
        type: Object
      };

      _.each(_.keys(options.sizes), function(key){
        subSchema['sizes.' + key] = {
          type: new SimpleSchema({
            url: {
              type: String
            },
            fileId: {
              type: String
            }
          })
        }
      });
    }

    return {
      type: new SimpleSchema(subSchema),
      orion: {
        options: options
      }
    };
  },
  valueOut: function() {
    
  },
});