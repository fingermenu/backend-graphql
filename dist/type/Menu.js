'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenu = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _graphql = require('graphql');

var _interface = require('../interface');

var _MenuItemPrice = require('./MenuItemPrice');

var _MenuItemPrice2 = _interopRequireDefault(_MenuItemPrice);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _StringWithLanguage = require('./StringWithLanguage');

var _StringWithLanguage2 = _interopRequireDefault(_StringWithLanguage);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getMenu = exports.getMenu = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(menuId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.MenuService().read(menuId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMenu(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = new _graphql.GraphQLObjectType({
  name: 'Menu',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
          var language = _ref3.language,
              dataLoaders = _ref3.dataLoaders,
              fingerMenuContext = _ref3.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _Common2.default.getTranslationToDisplay(_, 'name', language, dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x3, _x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    nameWithLanguages: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_StringWithLanguage2.default)),
      resolve: function resolve(_) {
        return _Common2.default.mapMultilanguagesStringToStringWithLanguageCollection(_, 'name');
      }
    },
    nameToPrintOnKitchenReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref5) {
          var dataLoaders = _ref5.dataLoaders,
              fingerMenuContext = _ref5.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _Common2.default.getTranslationToPrintOnKitchenReceipt(_, 'name', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x6, _x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    nameToPrintOnCustomerReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref7) {
          var dataLoaders = _ref7.dataLoaders,
              fingerMenuContext = _ref7.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _Common2.default.getTranslationToPrintOnCustomerReceipt(_, 'name', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x9, _x10, _x11) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args, _ref9) {
          var language = _ref9.language,
              dataLoaders = _ref9.dataLoaders,
              fingerMenuContext = _ref9.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', _Common2.default.getTranslationToDisplay(_, 'description', language, dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x12, _x13, _x14) {
          return _ref8.apply(this, arguments);
        };
      }()
    },
    descriptionWithLanguages: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_StringWithLanguage2.default)),
      resolve: function resolve(_) {
        return _Common2.default.mapMultilanguagesStringToStringWithLanguageCollection(_, 'description');
      }
    },
    descriptionToPrintOnKitchenReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref11) {
          var dataLoaders = _ref11.dataLoaders,
              fingerMenuContext = _ref11.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', _Common2.default.getTranslationToPrintOnKitchenReceipt(_, 'description', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x15, _x16, _x17) {
          return _ref10.apply(this, arguments);
        };
      }()
    },
    descriptionToPrintOnCustomerReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args, _ref13) {
          var dataLoaders = _ref13.dataLoaders,
              fingerMenuContext = _ref13.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt('return', _Common2.default.getTranslationToPrintOnCustomerReceipt(_, 'description', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x18, _x19, _x20) {
          return _ref12.apply(this, arguments);
        };
      }()
    },
    menuPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_) {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.abrupt('return', _.get('menuPageUrl'));

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve(_x21) {
          return _ref14.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt('return', _.get('imageUrl'));

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, undefined);
        }));

        return function resolve(_x22) {
          return _ref15.apply(this, arguments);
        };
      }()
    },
    sortOrderIndex: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('sortOrderIndex');
      }
    },
    menuItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_MenuItemPrice2.default)),
      resolve: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, args, _ref17) {
          var _ref17$dataLoaders = _ref17.dataLoaders,
              menuLoaderById = _ref17$dataLoaders.menuLoaderById,
              menuItemPriceLoaderById = _ref17$dataLoaders.menuItemPriceLoaderById;
          var menuItemPriceIds, menuItemPrices, menuItemPriceSortOrderIndices;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  menuItemPriceIds = _.get('menuItemPriceIds');

                  if (!(!menuItemPriceIds || menuItemPriceIds.isEmpty())) {
                    _context10.next = 3;
                    break;
                  }

                  return _context10.abrupt('return', []);

                case 3:
                  _context10.next = 5;
                  return menuItemPriceLoaderById.loadMany(_.get('menuItemPriceIds').toArray());

                case 5:
                  _context10.t0 = function (menuItemPrice) {
                    return !menuItemPrice.has('removedByUser') || !menuItemPrice.get('removedByUser');
                  };

                  menuItemPrices = _context10.sent.filter(_context10.t0);

                  if (!(menuItemPrices.length === 0)) {
                    _context10.next = 9;
                    break;
                  }

                  return _context10.abrupt('return', []);

                case 9:
                  _context10.next = 11;
                  return menuLoaderById.load(_.get('id'));

                case 11:
                  menuItemPriceSortOrderIndices = _context10.sent.get('menuItemPriceSortOrderIndices');
                  return _context10.abrupt('return', menuItemPrices.map(function (_) {
                    return _.set('sortOrderIndex', menuItemPriceSortOrderIndices.get(_.get('id')));
                  }));

                case 13:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, undefined);
        }));

        return function resolve(_x23, _x24, _x25) {
          return _ref16.apply(this, arguments);
        };
      }()
    },
    tags: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Tag2.default)),
      resolve: function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, args, _ref19) {
          var tagLoaderById = _ref19.dataLoaders.tagLoaderById;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt('return', _.get('tagIds') && !_.get('tagIds').isEmpty() ? tagLoaderById.loadMany(_.get('tagIds').toArray()) : []);

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, undefined);
        }));

        return function resolve(_x26, _x27, _x28) {
          return _ref18.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});