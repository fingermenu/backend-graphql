'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _AddChoiceItem = require('./AddChoiceItem');

var _AddChoiceItem2 = _interopRequireDefault(_AddChoiceItem);

var _AddMenuItem = require('./AddMenuItem');

var _AddMenuItem2 = _interopRequireDefault(_AddMenuItem);

var _AddRestaurant = require('./AddRestaurant');

var _AddRestaurant2 = _interopRequireDefault(_AddRestaurant);

var _UpdateTable = require('./UpdateTable');

var _UpdateTable2 = _interopRequireDefault(_UpdateTable);

var _PlaceOrder = require('./PlaceOrder');

var _PlaceOrder2 = _interopRequireDefault(_PlaceOrder);

var _UpdateOrder = require('./UpdateOrder');

var _UpdateOrder2 = _interopRequireDefault(_UpdateOrder);

var _CancelOrder = require('./CancelOrder');

var _CancelOrder2 = _interopRequireDefault(_CancelOrder);

var _SubmitUserFeedback = require('./SubmitUserFeedback');

var _SubmitUserFeedback2 = _interopRequireDefault(_SubmitUserFeedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addChoiceItem: _AddChoiceItem2.default,
    addMenuItem: _AddMenuItem2.default,
    addRestaurant: _AddRestaurant2.default,
    updateTable: _UpdateTable2.default,
    placeOrder: _PlaceOrder2.default,
    updateOrder: _UpdateOrder2.default,
    cancelOrder: _CancelOrder2.default,
    submitUserFeedback: _SubmitUserFeedback2.default
  }
});