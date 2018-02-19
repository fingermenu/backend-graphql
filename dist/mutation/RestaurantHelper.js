'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRestaurant = exports.addRestaurantForProvidedUser = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _parseServerCommon2 = require('@fingermenu/parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addRestaurantForProvidedUser = exports.addRestaurantForProvidedUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, user, sessionToken) {
    var name = _ref2.name,
        websiteUrl = _ref2.websiteUrl,
        imageUrl = _ref2.imageUrl,
        address = _ref2.address,
        googleMapUrl = _ref2.googleMapUrl,
        status = _ref2.status,
        inheritParentRestaurantMenus = _ref2.inheritParentRestaurantMenus,
        pin = _ref2.pin;
    var acl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            acl = _parseServerCommon.ParseWrapperService.createACL(user);


            acl.setRoleReadAccess('administrators', true);
            acl.setRoleWriteAccess('administrators', true);

            return _context.abrupt('return', new _parseServerCommon2.RestaurantService().create((0, _immutable.Map)({
              ownedByUser: user,
              name: _immutable2.default.fromJS(name).reduce(function (reduction, languageValue) {
                return reduction.set(languageValue.language, languageValue.value);
              }, (0, _immutable.Map)()),
              websiteUrl: websiteUrl,
              imageUrl: imageUrl,
              address: address,
              googleMapUrl: googleMapUrl,
              status: status,
              inheritParentRestaurantMenus: inheritParentRestaurantMenus,
              pin: pin
            }), acl, sessionToken));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addRestaurantForProvidedUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var addRestaurant = exports.addRestaurant = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(info, dataLoaders, sessionToken) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            user = _context2.sent;
            return _context2.abrupt('return', addRestaurantForProvidedUser(info, user, sessionToken));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addRestaurant(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();