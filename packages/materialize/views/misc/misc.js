Template.orionMaterializeHasOneAttribute.events({
  'focus .selectize-input input': function (event, template) {
    var id = template.$('.orionAttributesHasOne').attr('id');
    $('label[for="' + id + '"]').addClass('active teal-text');
  },
  'blur .selectize-input input': function (event, template) {
    var id = template.$('.orionAttributesHasOne').attr('id');
    $('label[for="' + id + '"]').removeClass('teal-text');
    if (!template.$('.orionAttributesHasOne').val() &&
      !template.$('.orionAttributesHasOne .selectize-input').hasClass('focus')) {
      $('label[for="' + id + '"]').removeClass('active');
    }
  }
});