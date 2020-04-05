const { AuthenticationError } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');
const { SchemaDirectiveVisitor } = require('graphql-tools');

class AuthDecorator extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.checkAuthWrapper(type);
    type._isProtected = true;
  }

  visitFieldDefinition(field, details) {
    this.checkAuthWrapper(details.objectType);
    field._isProtected = true;
  }

  checkAuthWrapper(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    let fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async (...args) => {
        const isProtected = field._isProtected || objectType._isProtected;
        if (!isProtected) return resolve.apply(this, args);

        const context = args[2];
        if (!context.currentUser) {
          throw new AuthenticationError('User not authenticated');
        }
        return resolve.apply(this, args);
      }
    })

  }
}


module.exports = { AuthDecorator }