'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepartmentCategoryReports = undefined;

var _immutable = require('immutable');

var _graphql = require('graphql');

var _DepartmentCategory = require('./DepartmentCategory');

var _DepartmentCategory2 = _interopRequireDefault(_DepartmentCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//export const getDepartmentCategoryReports = async (restaurantId, searchArgs, dataLoaders, sessionToken) => {
var getDepartmentCategoryReports = exports.getDepartmentCategoryReports = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _immutable.List)());

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getDepartmentCategoryReports() {
    return _ref.apply(this, arguments);
  };
}();

var DepartmentSubCategoryReport = new _graphql.GraphQLObjectType({
  name: 'DepartmentSubCategoryReport',
  fields: {
    documentCategory: {
      type: _DepartmentCategory2.default,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
          var departmentCategoryLoaderById = _ref3.dataLoaders.departmentCategoryLoaderById;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', departmentCategoryLoaderById.load(_.get('departmentCategoryId')));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x, _x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    totalSale: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat),
      resolve: function resolve(_) {
        return _.get('totalSale');
      }
    }
  }
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'DepartmentCategoryReport',
  fields: {
    documentCategory: {
      type: _DepartmentCategory2.default,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref5) {
          var departmentCategoryLoaderById = _ref5.dataLoaders.departmentCategoryLoaderById;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', departmentCategoryLoaderById.load(_.get('departmentCategoryId')));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x4, _x5, _x6) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    totalSale: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat),
      resolve: function resolve(_) {
        return _.get('totalSale');
      }
    },
    departmentSubCategoryReport: {
      type: DepartmentSubCategoryReport,
      resolve: function resolve(_) {
        return _.get('departmentSubCategoryReport');
      }
    }
  }
});