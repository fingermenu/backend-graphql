'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _ChoiceItemPrice = require('./ChoiceItemPrice');

var _ChoiceItemPrice2 = _interopRequireDefault(_ChoiceItemPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'OrderChoiceItemPrice',
  fields: {
    choiceItemPrice: {
      type: new _graphql.GraphQLNonNull(_ChoiceItemPrice2.default),
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref2) {
          var dataLoaders = _ref2.dataLoaders;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', _.get('choiceItemPriceId') ? dataLoaders.choiceItemPriceLoaderById.load(_.get('choiceItemPriceId')) : null);

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function resolve(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    quantity: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve: function resolve(_) {
        return _.get('quantity');
      }
    }
  }
});