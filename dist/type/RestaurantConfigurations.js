'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _RestaurantImages = require('./RestaurantImages');

var _RestaurantImages2 = _interopRequireDefault(_RestaurantImages);

var _RestaurantLanguages = require('./RestaurantLanguages');

var _RestaurantLanguages2 = _interopRequireDefault(_RestaurantLanguages);

var _Printer = require('./Printer');

var _Printer2 = _interopRequireDefault(_Printer);

var _DocumentTemplate = require('./DocumentTemplate');

var _DocumentTemplate2 = _interopRequireDefault(_DocumentTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'RestaurantConfigurations',
  fields: {
    images: {
      type: _RestaurantImages2.default,
      resolve: function resolve(_) {
        return _.get('images') ? _.get('images') : (0, _immutable.Map)();
      }
    },
    languages: {
      type: _RestaurantLanguages2.default,
      resolve: function resolve(_) {
        return _.get('languages') ? _.get('languages') : (0, _immutable.Map)();
      }
    },
    printers: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Printer2.default)),
      resolve: function resolve(_) {
        return _.get('printers') ? _.get('printers').toArray() : [];
      }
    },
    documentTemplates: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_DocumentTemplate2.default)),
      resolve: function resolve(_) {
        return _.get('documentTemplates') ? _.get('documentTemplates').toArray() : [];
      }
    },
    numberOfPrintCopiesForKitchen: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('numberOfPrintCopiesForKitchen') ? _.get('numberOfPrintCopiesForKitchen') : 1;
      }
    },
    gstPercentage: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('gstPercentage');
      }
    }
  }
});