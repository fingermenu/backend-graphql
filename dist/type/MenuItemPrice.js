'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuItemPrice = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _graphql = require('graphql');

var _immutable = require('immutable');

var _interface = require('../interface');

var _ChoiceItemPrice = require('./ChoiceItemPrice');

var _ChoiceItemPrice2 = _interopRequireDefault(_ChoiceItemPrice);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _MenuItemPriceRules = require('./MenuItemPriceRules');

var _MenuItemPriceRules2 = _interopRequireDefault(_MenuItemPriceRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getMenuItemPrice = exports.getMenuItemPrice = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(menuItemPriceId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.MenuItemPriceService().read(menuItemPriceId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMenuItemPrice(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var BeServedWithMenuItemPrice = new _graphql.GraphQLObjectType({
  name: 'BeServedWithMenuItemPrice',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    currentPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _.get('currentPrice'));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x3) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    wasPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _.get('wasPrice'));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x4) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    validFrom: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _.get('validFrom'));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x5) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    validUntil: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', _.get('validUntil'));

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x6) {
          return _ref5.apply(this, arguments);
        };
      }()
    },
    menuItem: {
      type: _MenuItem2.default,
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref7) {
          var menuItemLoaderById = _ref7.dataLoaders.menuItemLoaderById;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', _.get('menuItemId') ? menuItemLoaderById.load(_.get('menuItemId')) : null);

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x7, _x8, _x9) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    choiceItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_ChoiceItemPrice2.default)),
      resolve: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args, _ref9) {
          var _ref9$dataLoaders = _ref9.dataLoaders,
              menuItemPriceLoaderById = _ref9$dataLoaders.menuItemPriceLoaderById,
              choiceItemPriceLoaderById = _ref9$dataLoaders.choiceItemPriceLoaderById;
          var choiceItemPriceIds, choiceItemPrices, choiceItemPriceSortOrderIndices;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  choiceItemPriceIds = _.get('choiceItemPriceIds');

                  if (!(!choiceItemPriceIds || choiceItemPriceIds.isEmpty())) {
                    _context7.next = 3;
                    break;
                  }

                  return _context7.abrupt('return', []);

                case 3:
                  _context7.next = 5;
                  return choiceItemPriceLoaderById.loadMany(choiceItemPriceIds.toArray());

                case 5:
                  _context7.t0 = function (choiceItemPrice) {
                    return !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser');
                  };

                  choiceItemPrices = _context7.sent.filter(_context7.t0);

                  if (!(choiceItemPrices.length === 0)) {
                    _context7.next = 9;
                    break;
                  }

                  return _context7.abrupt('return', []);

                case 9:
                  _context7.next = 11;
                  return menuItemPriceLoaderById.load(_.get('id'));

                case 11:
                  choiceItemPriceSortOrderIndices = _context7.sent.get('choiceItemPriceSortOrderIndices');
                  return _context7.abrupt('return', choiceItemPrices.map(function (_) {
                    return _.set('sortOrderIndex', choiceItemPriceSortOrderIndices.get(_.get('id')));
                  }));

                case 13:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x10, _x11, _x12) {
          return _ref8.apply(this, arguments);
        };
      }()
    },
    defaultChoiceItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_ChoiceItemPrice2.default)),
      resolve: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, args, _ref11) {
          var choiceItemPriceLoaderById = _ref11.dataLoaders.choiceItemPriceLoaderById;
          var choiceItemPriceIds;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  choiceItemPriceIds = _.get('defaultChoiceItemPriceIds');

                  if (!(!choiceItemPriceIds || choiceItemPriceIds.isEmpty())) {
                    _context8.next = 3;
                    break;
                  }

                  return _context8.abrupt('return', []);

                case 3:
                  _context8.next = 5;
                  return choiceItemPriceLoaderById.loadMany(choiceItemPriceIds.toArray());

                case 5:
                  _context8.t0 = function (choiceItemPrice) {
                    return !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser');
                  };

                  return _context8.abrupt('return', _context8.sent.filter(_context8.t0));

                case 7:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve(_x13, _x14, _x15) {
          return _ref10.apply(this, arguments);
        };
      }()
    },
    rules: {
      type: _MenuItemPriceRules2.default,
      resolve: function resolve(_) {
        return _.get('rules') ? _.get('rules') : (0, _immutable.Map)();
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'MenuItemPrice',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    currentPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt('return', _.get('currentPrice'));

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, undefined);
        }));

        return function resolve(_x16) {
          return _ref12.apply(this, arguments);
        };
      }()
    },
    wasPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt('return', _.get('wasPrice'));

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, undefined);
        }));

        return function resolve(_x17) {
          return _ref13.apply(this, arguments);
        };
      }()
    },
    validFrom: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_) {
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt('return', _.get('validFrom'));

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, undefined);
        }));

        return function resolve(_x18) {
          return _ref14.apply(this, arguments);
        };
      }()
    },
    validUntil: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_) {
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.abrupt('return', _.get('validUntil'));

                case 1:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, undefined);
        }));

        return function resolve(_x19) {
          return _ref15.apply(this, arguments);
        };
      }()
    },
    menuItem: {
      type: _MenuItem2.default,
      resolve: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_, args, _ref17) {
          var menuItemLoaderById = _ref17.dataLoaders.menuItemLoaderById;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.abrupt('return', _.get('menuItemId') ? menuItemLoaderById.load(_.get('menuItemId')) : null);

                case 1:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, undefined);
        }));

        return function resolve(_x20, _x21, _x22) {
          return _ref16.apply(this, arguments);
        };
      }()
    },
    sortOrderIndex: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('sortOrderIndex');
      }
    },
    toBeServedWithMenuItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(BeServedWithMenuItemPrice)),
      resolve: function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, args, _ref19) {
          var _ref19$dataLoaders = _ref19.dataLoaders,
              menuItemPriceLoaderById = _ref19$dataLoaders.menuItemPriceLoaderById,
              toBeServedWithMenuItemPricePriceLoaderById = _ref19$dataLoaders.toBeServedWithMenuItemPricePriceLoaderById;
          var toBeServedWithMenuItemPricePriceIds, toBeServedWithMenuItemPricePrices, toBeServedWithMenuItemPricePriceSortOrderIndices;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  toBeServedWithMenuItemPricePriceIds = _.get('toBeServedWithMenuItemPricePriceIds');

                  if (!(!toBeServedWithMenuItemPricePriceIds || toBeServedWithMenuItemPricePriceIds.isEmpty())) {
                    _context14.next = 3;
                    break;
                  }

                  return _context14.abrupt('return', []);

                case 3:
                  _context14.next = 5;
                  return toBeServedWithMenuItemPricePriceLoaderById.loadMany(_.get('toBeServedWithMenuItemPricePriceIds').toArray());

                case 5:
                  _context14.t0 = function (toBeServedWithMenuItemPricePrice) {
                    return !toBeServedWithMenuItemPricePrice.has('removedByUser') || !toBeServedWithMenuItemPricePrice.get('removedByUser');
                  };

                  toBeServedWithMenuItemPricePrices = _context14.sent.filter(_context14.t0);

                  if (!(toBeServedWithMenuItemPricePrices.length === 0)) {
                    _context14.next = 9;
                    break;
                  }

                  return _context14.abrupt('return', []);

                case 9:
                  _context14.next = 11;
                  return menuItemPriceLoaderById.load(_.get('id'));

                case 11:
                  toBeServedWithMenuItemPricePriceSortOrderIndices = _context14.sent.get('toBeServedWithMenuItemPricePriceSortOrderIndices');
                  return _context14.abrupt('return', toBeServedWithMenuItemPricePrices.map(function (_) {
                    return _.set('sortOrderIndex', toBeServedWithMenuItemPricePriceSortOrderIndices.get(_.get('id')));
                  }));

                case 13:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, undefined);
        }));

        return function resolve(_x23, _x24, _x25) {
          return _ref18.apply(this, arguments);
        };
      }()
    },
    choiceItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_ChoiceItemPrice2.default)),
      resolve: function () {
        var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_, args, _ref21) {
          var _ref21$dataLoaders = _ref21.dataLoaders,
              menuItemPriceLoaderById = _ref21$dataLoaders.menuItemPriceLoaderById,
              choiceItemPriceLoaderById = _ref21$dataLoaders.choiceItemPriceLoaderById;
          var choiceItemPriceIds, choiceItemPrices, choiceItemPriceSortOrderIndices;
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  choiceItemPriceIds = _.get('choiceItemPriceIds');

                  if (!(!choiceItemPriceIds || choiceItemPriceIds.isEmpty())) {
                    _context15.next = 3;
                    break;
                  }

                  return _context15.abrupt('return', []);

                case 3:
                  _context15.next = 5;
                  return choiceItemPriceLoaderById.loadMany(choiceItemPriceIds.toArray());

                case 5:
                  _context15.t0 = function (choiceItemPrice) {
                    return !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser');
                  };

                  choiceItemPrices = _context15.sent.filter(_context15.t0);

                  if (!(choiceItemPrices.length === 0)) {
                    _context15.next = 9;
                    break;
                  }

                  return _context15.abrupt('return', []);

                case 9:
                  _context15.next = 11;
                  return menuItemPriceLoaderById.load(_.get('id'));

                case 11:
                  choiceItemPriceSortOrderIndices = _context15.sent.get('choiceItemPriceSortOrderIndices');
                  return _context15.abrupt('return', choiceItemPrices.map(function (_) {
                    return _.set('sortOrderIndex', choiceItemPriceSortOrderIndices.get(_.get('id')));
                  }));

                case 13:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, undefined);
        }));

        return function resolve(_x26, _x27, _x28) {
          return _ref20.apply(this, arguments);
        };
      }()
    },
    defaultChoiceItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_ChoiceItemPrice2.default)),
      resolve: function () {
        var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, args, _ref23) {
          var choiceItemPriceLoaderById = _ref23.dataLoaders.choiceItemPriceLoaderById;
          var choiceItemPriceIds;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  choiceItemPriceIds = _.get('defaultChoiceItemPriceIds');

                  if (!(!choiceItemPriceIds || choiceItemPriceIds.isEmpty())) {
                    _context16.next = 3;
                    break;
                  }

                  return _context16.abrupt('return', []);

                case 3:
                  _context16.next = 5;
                  return choiceItemPriceLoaderById.loadMany(choiceItemPriceIds.toArray());

                case 5:
                  _context16.t0 = function (choiceItemPrice) {
                    return !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser');
                  };

                  return _context16.abrupt('return', _context16.sent.filter(_context16.t0));

                case 7:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, undefined);
        }));

        return function resolve(_x29, _x30, _x31) {
          return _ref22.apply(this, arguments);
        };
      }()
    },
    tags: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Tag2.default)),
      resolve: function () {
        var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_, args, _ref25) {
          var tagLoaderById = _ref25.dataLoaders.tagLoaderById;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  return _context17.abrupt('return', tagLoaderById.loadMany(_.get('tagIds').toArray()));

                case 1:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, undefined);
        }));

        return function resolve(_x32, _x33, _x34) {
          return _ref24.apply(this, arguments);
        };
      }()
    },
    rules: {
      type: _MenuItemPriceRules2.default,
      resolve: function resolve(_) {
        return _.get('rules') ? _.get('rules') : (0, _immutable.Map)();
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});