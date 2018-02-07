'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuItemPrice = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _graphql = require('graphql');

var _interface = require('../interface');

var _ChoiceItemPrice = require('./ChoiceItemPrice');

var _ChoiceItemPrice2 = _interopRequireDefault(_ChoiceItemPrice);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Size = require('./Size');

var _Size2 = _interopRequireDefault(_Size);

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
    size: {
      type: _Size2.default,
      resolve: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args, _ref9) {
          var sizeLoaderById = _ref9.dataLoaders.sizeLoaderById;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt('return', _.get('sizeId') ? sizeLoaderById.load(_.get('sizeId')) : null);

                case 1:
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
    choiceItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_ChoiceItemPrice2.default)),
      resolve: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, args, _ref11) {
          var choiceItemPriceLoaderById = _ref11.dataLoaders.choiceItemPriceLoaderById;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (!(_.get('choiceItemPriceIds') && !_.get('choiceItemPriceIds').isEmpty())) {
                    _context8.next = 7;
                    break;
                  }

                  _context8.next = 3;
                  return choiceItemPriceLoaderById.loadMany(_.get('choiceItemPriceIds').toArray());

                case 3:
                  _context8.t1 = function (choiceItemPrice) {
                    return !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser');
                  };

                  _context8.t0 = _context8.sent.filter(_context8.t1);
                  _context8.next = 8;
                  break;

                case 7:
                  _context8.t0 = [];

                case 8:
                  return _context8.abrupt('return', _context8.t0);

                case 9:
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
    size: {
      type: _Size2.default,
      resolve: function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, args, _ref19) {
          var sizeLoaderById = _ref19.dataLoaders.sizeLoaderById;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.abrupt('return', _.get('sizeId') ? sizeLoaderById.load(_.get('sizeId')) : null);

                case 1:
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
    toBeServedWithMenuItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(BeServedWithMenuItemPrice)),
      resolve: function () {
        var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_, args, _ref21) {
          var menuItemPriceLoaderById = _ref21.dataLoaders.menuItemPriceLoaderById;
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  if (!(_.get('toBeServedWithMenuItemPriceIds') && !_.get('toBeServedWithMenuItemPriceIds').isEmpty())) {
                    _context15.next = 7;
                    break;
                  }

                  _context15.next = 3;
                  return menuItemPriceLoaderById.loadMany(_.get('toBeServedWithMenuItemPriceIds').toArray());

                case 3:
                  _context15.t1 = function (menuItemPrice) {
                    return !menuItemPrice.has('removedByUser') || !menuItemPrice.get('removedByUser');
                  };

                  _context15.t0 = _context15.sent.filter(_context15.t1);
                  _context15.next = 8;
                  break;

                case 7:
                  _context15.t0 = [];

                case 8:
                  return _context15.abrupt('return', _context15.t0);

                case 9:
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
    choiceItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_ChoiceItemPrice2.default)),
      resolve: function () {
        var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, args, _ref23) {
          var choiceItemPriceLoaderById = _ref23.dataLoaders.choiceItemPriceLoaderById;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  if (!(_.get('choiceItemPriceIds') && !_.get('choiceItemPriceIds').isEmpty())) {
                    _context16.next = 7;
                    break;
                  }

                  _context16.next = 3;
                  return choiceItemPriceLoaderById.loadMany(_.get('choiceItemPriceIds').toArray());

                case 3:
                  _context16.t1 = function (choiceItemPrice) {
                    return !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser');
                  };

                  _context16.t0 = _context16.sent.filter(_context16.t1);
                  _context16.next = 8;
                  break;

                case 7:
                  _context16.t0 = [];

                case 8:
                  return _context16.abrupt('return', _context16.t0);

                case 9:
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
    }
  },
  interfaces: [_interface.NodeInterface]
});