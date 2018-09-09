'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _LinkedPrinter = require('./LinkedPrinter');

var _LinkedPrinter2 = _interopRequireDefault(_LinkedPrinter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'DocumentTemplate',
  fields: {
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    maxLineWidthDivisionFactor: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        var maxLineWidthDivisionFactor = _.get('maxLineWidthDivisionFactor');

        return maxLineWidthDivisionFactor ? maxLineWidthDivisionFactor : 1.0;
      }
    },
    template: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve: function resolve(_) {
        return _.get('template');
      }
    },
    linkedPrinters: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_LinkedPrinter2.default)),
      resolve: function resolve(_) {
        return _.get('linkedPrinters') ? _.get('linkedPrinters').toArray() : [];
      }
    }
  }
});