'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _GeoLocation = require('./GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _Phone = require('./Phone');

var _Phone2 = _interopRequireDefault(_Phone);

var _interface = require('../interface');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ParentOwnedRestaurant = new _graphql.GraphQLObjectType({
  name: 'ParentOwnedRestaurant',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    websiteUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (_.has('id')) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return', '');

                case 2:
                  return _context.abrupt('return', _.get('websiteUrl'));

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function resolve(_x) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (_.has('id')) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt('return', '');

                case 2:
                  return _context2.abrupt('return', _.get('imageUrl'));

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x2) {
          return _ref2.apply(this, arguments);
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
    }
  },
  interfaces: [_interface.NodeInterface]
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'OwnedRestaurant',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    websiteUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (_.has('id')) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt('return', '');

                case 2:
                  return _context3.abrupt('return', _.get('websiteUrl'));

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x3) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (_.has('id')) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt('return', '');

                case 2:
                  return _context4.abrupt('return', _.get('imageUrl'));

                case 3:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x4) {
          return _ref4.apply(this, arguments);
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
    parentRestaurant: {
      type: ParentOwnedRestaurant,
      resolve: function resolve(_, args, _ref5) {
        var dataLoaders = _ref5.dataLoaders;

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