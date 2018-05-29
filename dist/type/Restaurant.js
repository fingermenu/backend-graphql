'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRestaurant = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _graphql = require('graphql');

var _GeoLocation = require('./GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _Phone = require('./Phone');

var _Phone2 = _interopRequireDefault(_Phone);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _RestaurantConfigurations = require('./RestaurantConfigurations');

var _RestaurantConfigurations2 = _interopRequireDefault(_RestaurantConfigurations);

var _PackageBundle = require('./PackageBundle');

var _PackageBundle2 = _interopRequireDefault(_PackageBundle);

var _interface = require('../interface');

var _SaleReport = require('./SaleReport');

var _SaleReport2 = _interopRequireDefault(_SaleReport);

var _DateRange = require('./DateRange');

var _DateRange2 = _interopRequireDefault(_DateRange);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

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
            return _context2.abrupt('return', new _parseServerCommon.RestaurantService().read(restaurantId, null, sessionToken));

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
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref4) {
          var language = _ref4.language,
              dataLoaders = _ref4.dataLoaders,
              fingerMenuContext = _ref4.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _Common2.default.getTranslationToDisplay(_, 'name', language, dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x5, _x6, _x7) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    nameToPrintOnKitchenReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref6) {
          var dataLoaders = _ref6.dataLoaders,
              fingerMenuContext = _ref6.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _Common2.default.getTranslationToPrintOnKitchenReceipt(_, 'name', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x8, _x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }()
    },
    nameToPrintOnCustomerReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args, _ref8) {
          var dataLoaders = _ref8.dataLoaders,
              fingerMenuContext = _ref8.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', _Common2.default.getTranslationToPrintOnCustomerReceipt(_, 'name', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x11, _x12, _x13) {
          return _ref7.apply(this, arguments);
        };
      }()
    },
    websiteUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', _.get('websiteUrl'));

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x14) {
          return _ref9.apply(this, arguments);
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
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_) {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt('return', _.get('pin'));

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x15) {
          return _ref10.apply(this, arguments);
        };
      }()
    },
    menus: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Menu2.default)),
      resolve: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, args, _ref12) {
          var _ref12$dataLoaders = _ref12.dataLoaders,
              menuLoaderById = _ref12$dataLoaders.menuLoaderById,
              restaurantLoaderById = _ref12$dataLoaders.restaurantLoaderById;
          var menuIds, menus, menuSortOrderIndices;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  menuIds = _.get('menuIds');

                  if (!(!menuIds || menuIds.isEmpty())) {
                    _context8.next = 3;
                    break;
                  }

                  return _context8.abrupt('return', []);

                case 3:
                  _context8.next = 5;
                  return menuLoaderById.loadMany(menuIds.toArray());

                case 5:
                  menus = _context8.sent;
                  _context8.next = 8;
                  return restaurantLoaderById.load(_.get('id'));

                case 8:
                  menuSortOrderIndices = _context8.sent.get('menuSortOrderIndices');
                  return _context8.abrupt('return', menus.map(function (_) {
                    return _.set('sortOrderIndex', menuSortOrderIndices.get(_.get('id')));
                  }));

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve(_x16, _x17, _x18) {
          return _ref11.apply(this, arguments);
        };
      }()
    },
    tables: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Table2.default)),
      resolve: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, args, _ref14) {
          var sessionToken = _ref14.sessionToken;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return getTablesMatchCriteria(_.get('id'), sessionToken);

                case 2:
                  return _context9.abrupt('return', _context9.sent.toArray());

                case 3:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, undefined);
        }));

        return function resolve(_x19, _x20, _x21) {
          return _ref13.apply(this, arguments);
        };
      }()
    },
    configurations: {
      type: new _graphql.GraphQLNonNull(_RestaurantConfigurations2.default),
      resolve: function resolve(_) {
        return _.get('configurations') ? _.get('configurations') : (0, _immutable.Map)();
      }
    },
    packageBundle: {
      type: _PackageBundle2.default,
      resolve: function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, args, _ref16) {
          var packageBundleLoaderByRestaurantId = _ref16.dataLoaders.packageBundleLoaderByRestaurantId;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt('return', packageBundleLoaderByRestaurantId.load(_.get('id')));

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, undefined);
        }));

        return function resolve(_x22, _x23, _x24) {
          return _ref15.apply(this, arguments);
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
      resolve: function () {
        var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, args, _ref18) {
          var language = _ref18.language,
              dataLoaders = _ref18.dataLoaders,
              fingerMenuContext = _ref18.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt('return', _Common2.default.getTranslationToDisplay(_, 'name', language, dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, undefined);
        }));

        return function resolve(_x25, _x26, _x27) {
          return _ref17.apply(this, arguments);
        };
      }()
    },
    nameToPrintOnKitchenReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_, args, _ref20) {
          var dataLoaders = _ref20.dataLoaders,
              fingerMenuContext = _ref20.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.abrupt('return', _Common2.default.getTranslationToPrintOnKitchenReceipt(_, 'name', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, undefined);
        }));

        return function resolve(_x28, _x29, _x30) {
          return _ref19.apply(this, arguments);
        };
      }()
    },
    nameToPrintOnCustomerReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_, args, _ref22) {
          var dataLoaders = _ref22.dataLoaders,
              fingerMenuContext = _ref22.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.abrupt('return', _Common2.default.getTranslationToPrintOnCustomerReceipt(_, 'name', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, undefined);
        }));

        return function resolve(_x31, _x32, _x33) {
          return _ref21.apply(this, arguments);
        };
      }()
    },
    websiteUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_) {
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.abrupt('return', _.get('websiteUrl'));

                case 1:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, undefined);
        }));

        return function resolve(_x34) {
          return _ref23.apply(this, arguments);
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
        var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_) {
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  return _context15.abrupt('return', _.get('pin'));

                case 1:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, undefined);
        }));

        return function resolve(_x35) {
          return _ref24.apply(this, arguments);
        };
      }()
    },
    menus: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Menu2.default)),
      resolve: function () {
        var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, args, _ref26) {
          var _ref26$dataLoaders = _ref26.dataLoaders,
              menuLoaderById = _ref26$dataLoaders.menuLoaderById,
              restaurantLoaderById = _ref26$dataLoaders.restaurantLoaderById;
          var menuIds, menus, menuSortOrderIndices;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  menuIds = _.get('menuIds');

                  if (!(!menuIds || menuIds.isEmpty())) {
                    _context16.next = 3;
                    break;
                  }

                  return _context16.abrupt('return', []);

                case 3:
                  _context16.next = 5;
                  return menuLoaderById.loadMany(menuIds.toArray());

                case 5:
                  menus = _context16.sent;
                  _context16.next = 8;
                  return restaurantLoaderById.load(_.get('id'));

                case 8:
                  menuSortOrderIndices = _context16.sent.get('menuSortOrderIndices');
                  return _context16.abrupt('return', menus.map(function (_) {
                    return _.set('sortOrderIndex', menuSortOrderIndices.get(_.get('id')));
                  }));

                case 10:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, undefined);
        }));

        return function resolve(_x36, _x37, _x38) {
          return _ref25.apply(this, arguments);
        };
      }()
    },
    tables: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Table2.default)),
      resolve: function () {
        var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_, args, _ref28) {
          var sessionToken = _ref28.sessionToken;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.next = 2;
                  return getTablesMatchCriteria(_.get('id'), sessionToken);

                case 2:
                  return _context17.abrupt('return', _context17.sent.toArray());

                case 3:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, undefined);
        }));

        return function resolve(_x39, _x40, _x41) {
          return _ref27.apply(this, arguments);
        };
      }()
    },
    configurations: {
      type: new _graphql.GraphQLNonNull(_RestaurantConfigurations2.default),
      resolve: function resolve(_) {
        return _.get('configurations') ? _.get('configurations') : (0, _immutable.Map)();
      }
    },
    packageBundle: {
      type: _PackageBundle2.default,
      resolve: function () {
        var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(_, args, _ref30) {
          var packageBundleLoaderByRestaurantId = _ref30.dataLoaders.packageBundleLoaderByRestaurantId;
          return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  return _context18.abrupt('return', packageBundleLoaderByRestaurantId.load(_.get('id')));

                case 1:
                case 'end':
                  return _context18.stop();
              }
            }
          }, _callee18, undefined);
        }));

        return function resolve(_x42, _x43, _x44) {
          return _ref29.apply(this, arguments);
        };
      }()
    },
    saleReport: {
      type: _SaleReport2.default,
      args: {
        dateRange: { type: _DateRange2.default }
      },
      resolve: function () {
        var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(_, args, _ref32) {
          var packageBundleLoaderByRestaurantId = _ref32.dataLoaders.packageBundleLoaderByRestaurantId;
          return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  return _context19.abrupt('return', packageBundleLoaderByRestaurantId.load(_.get('id')));

                case 1:
                case 'end':
                  return _context19.stop();
              }
            }
          }, _callee19, undefined);
        }));

        return function resolve(_x45, _x46, _x47) {
          return _ref31.apply(this, arguments);
        };
      }()
    },
    parentRestaurant: {
      type: ParentRestaurant,
      resolve: function () {
        var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(_, args, _ref34) {
          var restaurantLoaderById = _ref34.dataLoaders.restaurantLoaderById;
          return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  return _context20.abrupt('return', _.get('parentRestaurantId') ? restaurantLoaderById.load(_.get('parentRestaurantId')) : null);

                case 1:
                case 'end':
                  return _context20.stop();
              }
            }
          }, _callee20, undefined);
        }));

        return function resolve(_x48, _x49, _x50) {
          return _ref33.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});