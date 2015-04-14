/**
 * Ensure mongo index
 */
Roles._collection._ensureIndex('userId', { unique: true });

/**
 * Publish user roles
 */
Meteor.publish(null, function () {
  return Roles._collection.find({ userId: this.userId });
})