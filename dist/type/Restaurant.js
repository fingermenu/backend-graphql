'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRestaurant = undefined;

var _immutable = require('immutable');

var _graphql = require('graphql');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _GeoLocation = require('./GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _Phone = require('./Phone');

var _Phone2 = _interopRequireDefault(_Phone);

var _Language = require('./Language');

var _Language2 = _interopRequireDefault(_Language);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _interface = require('../interface');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getTableCriteria = function getTableCriteria(restaurantId) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      restaurantId: restaurantId
    })
  });
};

var getTablesMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(restaurantId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.TableService().search(getTableCriteria(restaurantId).set('limit', 1000), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTablesMatchCriteria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getRestaurant = exports.getRestaurant = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(restaurantId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.RestaurantService().read(restaurantId, (0, _immutable.Map)({ include_parentRestaurant: true, include_menus: true }), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getRestaurant(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var ParentRestaurant = new _graphql.GraphQLObjectType({
  name: 'ParentRestaurant',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_, args, _ref3) {
        var language = _ref3.language;

        var allValues = _.get('name');

        return allValues ? allValues.get(language + '_name') : null;
      }
    },
    websiteUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _.get('websiteUrl'));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x5) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _.get('imageUrl'));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x6) {
          return _ref5.apply(this, arguments);
        };
      }()
    },
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    },
    geoLocation: {
      type: _GeoLocation2.default,
      resolve: function resolve(_) {
        var geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return (0, _immutable.Map)({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      }
    },
    phones: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Phone2.default)),
      resolve: function resolve(_) {
        var phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
      }
    },
    status: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('status');
      }
    },
    googleMapUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('googleMapUrl');
      }
    },
    inheritParentRestaurantMenus: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('inheritParentRestaurantMenus');
      }
    },
    pin: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', _.get('pin'));

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x7) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    menus: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Menu2.default)),
      resolve: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref8) {
          var dataLoaders = _ref8.dataLoaders;
          var menuIds;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  menuIds = _.get('menuIds');
                  return _context6.abrupt('return', !menuIds || menuIds.isEmtpy() ? [] : dataLoaders.menuLoaderById.loadMany(menuIds.toArray()));

                case 2:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x8, _x9, _x10) {
          return _ref7.apply(this, arguments);
        };
      }()
    },
    languages: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Language2.default)),
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args, _ref10) {
          var dataLoaders = _ref10.dataLoaders;
          var languageIds;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  languageIds = _.get('languageIds');
                  return _context7.abrupt('return', !languageIds || languageIds.isEmtpy() ? [] : dataLoaders.languageLoaderById.loadMany(languageIds.toArray()));

                case 2:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x11, _x12, _x13) {
          return _ref9.apply(this, arguments);
        };
      }()
    },
    tables: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Table2.default)),
      resolve: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, args, _ref12) {
          var sessionToken = _ref12.sessionToken;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return getTablesMatchCriteria(_.get('id'), sessionToken);

                case 2:
                  return _context8.abrupt('return', _context8.sent.toJS());

                case 3:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve(_x14, _x15, _x16) {
          return _ref11.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'Restaurant',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_, args, _ref13) {
        var language = _ref13.language;

        var allValues = _.get('name');

        return allValues ? allValues.get(language + '_name') : null;
      }
    },
    websiteUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt('return', _.get('websiteUrl'));

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, undefined);
        }));

        return function resolve(_x17) {
          return _ref14.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt('return', _.get('imageUrl'));

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, undefined);
        }));

        return function resolve(_x18) {
          return _ref15.apply(this, arguments);
        };
      }()
    },
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    },
    geoLocation: {
      type: _GeoLocation2.default,
      resolve: function resolve(_) {
        var geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return (0, _immutable.Map)({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      }
    },
    phones: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Phone2.default)),
      resolve: function resolve(_) {
        var phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
      }
    },
    status: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('status');
      }
    },
    googleMapUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('googleMapUrl');
      }
    },
    inheritParentRestaurantMenus: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('inheritParentRestaurantMenus');
      }
    },
    pin: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_) {
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt('return', _.get('pin'));

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, undefined);
        }));

        return function resolve(_x19) {
          return _ref16.apply(this, arguments);
        };
      }()
    },
    menus: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Menu2.default)),
      resolve: function () {
        var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_, args, _ref18) {
          var dataLoaders = _ref18.dataLoaders;
          var menuIds;
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  menuIds = _.get('menuIds');
                  return _context12.abrupt('return', !menuIds || menuIds.isEmtpy() ? [] : dataLoaders.menuLoaderById.loadMany(menuIds.toArray()));

                case 2:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, undefined);
        }));

        return function resolve(_x20, _x21, _x22) {
          return _ref17.apply(this, arguments);
        };
      }()
    },
    languages: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Language2.default)),
      resolve: function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_, args, _ref20) {
          var dataLoaders = _ref20.dataLoaders;
          var languageIds;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  languageIds = _.get('languageIds');
                  return _context13.abrupt('return', !languageIds || languageIds.isEmtpy() ? [] : dataLoaders.languageLoaderById.loadMany(languageIds.toArray()));

                case 2:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, undefined);
        }));

        return function resolve(_x23, _x24, _x25) {
          return _ref19.apply(this, arguments);
        };
      }()
    },
    tables: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Table2.default)),
      resolve: function () {
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, args, _ref22) {
          var sessionToken = _ref22.sessionToken;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.next = 2;
                  return getTablesMatchCriteria(_.get('id'), sessionToken);

                case 2:
                  return _context14.abrupt('return', _context14.sent.toJS());

                case 3:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, undefined);
        }));

        return function resolve(_x26, _x27, _x28) {
          return _ref21.apply(this, arguments);
        };
      }()
    },
    parentRestaurant: {
      type: ParentRestaurant,
      resolve: function resolve(_, args, _ref23) {
        var dataLoaders = _ref23.dataLoaders;

        var parentRestaurantId = _.get('parentRestaurantId');

        if (parentRestaurantId) {
          return dataLoaders.restaurantLoaderById.load(parentRestaurantId);
        }

        var parentRestaurant = _.get('parentRestaurant');

        if (parentRestaurant) {
          return parentRestaurant;
        }

        return null;
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});