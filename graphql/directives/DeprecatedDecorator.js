const { SchemaDirectiveVisitor } = require('graphql-tools');

class DeprecatedDecorator extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    field.isDeprecated = true;
    field.deprecationReason = this.args.reason;
  }

  visitEnumValue(value) {
    value.isDeprecated = true;
    value.deprecationReason = this.args.reason;
  }
}


module.exports = { DeprecatedDecorator }