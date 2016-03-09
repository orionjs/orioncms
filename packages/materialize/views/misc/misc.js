Template.orionMaterializeHasOneAttribute.onRendered(function() {
  if (this.$('.orionAttributesHasOne').val()) {
    var id = this.$('.orionAttributesHasOne').attr('id');
    $('label[for="' + id + '"]').addClass('active');
  }
});

ReactiveTemplates.onRendered('attribute.froala', function() {
  var id = this.$('.orionFroala').attr('id');
  this.$('.orionFroala').css({ 'margin-top': '2rem' });
  Meteor.setTimeout(function() {
    $('label[for="' + id + '"]').addClass('active');
    $('label[for="' + id + '"]').css({ top: '0' });
  }, 100);
});

Template.orionMaterializeHasOneAttribute.events({
  'focus .selectize-input input': function(event, template) {
    var id = template.$('.orionAttributesHasOne').attr('id');
    $('label[for="' + id + '"]').addClass('active teal-text');
  },

  'blur .selectize-input input': function(event, template) {
    var id = template.$('.orionAttributesHasOne').attr('id');
    $('label[for="' + id + '"]').removeClass('teal-text');
    if (!template.$('.orionAttributesHasOne').val()) {
      $('label[for="' + id + '"]').removeClass('active');
    }
  },

  'keyup .selectize-input input': function(event, template) {
    if ($(event.currentTarget).val() || template.$('.orionAttributesHasOne').val()) {
      var id = template.$('.orionAttributesHasOne').attr('id');
      $('label[for="' + id + '"]').addClass('active');
    }
  },
});

Template.orionMaterializeHasManyAttribute.onRendered(function() {
  if (this.$('.orionAttributesHasMany').val()) {
    var id = this.$('.orionAttributesHasMany').attr('id');
    $('label[for="' + id + '"]').addClass('active');
  }
});

Template.orionMaterializeHasManyAttribute.events({
  'focus .selectize-input input': function(event, template) {
    var id = template.$('.orionAttributesHasMany').attr('id');
    $('label[for="' + id + '"]').addClass('active teal-text');
  },

  'blur .selectize-input input': function(event, template) {
    var id = template.$('.orionAttributesHasMany').attr('id');
    $('label[for="' + id + '"]').removeClass('teal-text');
    if (!template.$('.orionAttributesHasMany').val()) {
      $('label[for="' + id + '"]').removeClass('active');
    }
  },

  'keyup .selectize-input input': function(event, template) {
    if ($(event.currentTarget).val() || template.$('.orionAttributesHasMany').val()) {
      var id = template.$('.orionAttributesHasMany').attr('id');
      $('label[for="' + id + '"]').addClass('active');
    }
  },
});
