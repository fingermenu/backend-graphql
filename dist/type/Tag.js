'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTag = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _graphql = require('graphql');

var _interface = require('../interface');

var _StringWithLanguage = require('./StringWithLanguage');

var _StringWithLanguage2 = _interopRequireDefault(_StringWithLanguage);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getTag = exports.getTag = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tagId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.TagService().read(tagId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTag(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var ParentTag = new _graphql.GraphQLObjectType({
  name: 'ParentTag',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    key: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _.get('key'));

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

        return function resolve(_x4, _x5, _x6) {
          return _ref3.apply(this, arguments);
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

        return function resolve(_x7, _x8, _x9) {
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

        return function resolve(_x10, _x11, _x12) {
          return _ref7.apply(this, arguments);
        };
      }()
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref10) {
          var language = _ref10.language,
              dataLoaders = _ref10.dataLoaders,
              fingerMenuContext = _ref10.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', _Common2.default.getTranslationToDisplay(_, 'description', language, dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x13, _x14, _x15) {
          return _ref9.apply(this, arguments);
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
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args, _ref12) {
          var dataLoaders = _ref12.dataLoaders,
              fingerMenuContext = _ref12.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt('return', _Common2.default.getTranslationToPrintOnKitchenReceipt(_, 'description', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x16, _x17, _x18) {
          return _ref11.apply(this, arguments);
        };
      }()
    },
    descriptionToPrintOnCustomerReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, args, _ref14) {
          var dataLoaders = _ref14.dataLoaders,
              fingerMenuContext = _ref14.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.abrupt('return', _Common2.default.getTranslationToPrintOnCustomerReceipt(_, 'description', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve(_x19, _x20, _x21) {
          return _ref13.apply(this, arguments);
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
    level: {
      type: _graphql.GraphQLInt,
      resolve: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt('return', _.get('level'));

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, undefined);
        }));

        return function resolve(_x23) {
          return _ref16.apply(this, arguments);
        };
      }()
    },
    forDisplay: {
      type: _graphql.GraphQLBoolean,
      resolve: function () {
        var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_) {
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt('return', _.get('forDisplay'));

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, undefined);
        }));

        return function resolve(_x24) {
          return _ref17.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'Tag',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    key: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_) {
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.abrupt('return', _.get('key'));

                case 1:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, undefined);
        }));

        return function resolve(_x25) {
          return _ref18.apply(this, arguments);
        };
      }()
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_, args, _ref20) {
          var language = _ref20.language,
              dataLoaders = _ref20.dataLoaders,
              fingerMenuContext = _ref20.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.abrupt('return', _Common2.default.getTranslationToDisplay(_, 'name', language, dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, undefined);
        }));

        return function resolve(_x26, _x27, _x28) {
          return _ref19.apply(this, arguments);
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
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, args, _ref22) {
          var dataLoaders = _ref22.dataLoaders,
              fingerMenuContext = _ref22.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.abrupt('return', _Common2.default.getTranslationToPrintOnKitchenReceipt(_, 'name', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, undefined);
        }));

        return function resolve(_x29, _x30, _x31) {
          return _ref21.apply(this, arguments);
        };
      }()
    },
    nameToPrintOnCustomerReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_, args, _ref24) {
          var dataLoaders = _ref24.dataLoaders,
              fingerMenuContext = _ref24.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  return _context15.abrupt('return', _Common2.default.getTranslationToPrintOnCustomerReceipt(_, 'name', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, undefined);
        }));

        return function resolve(_x32, _x33, _x34) {
          return _ref23.apply(this, arguments);
        };
      }()
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, args, _ref26) {
          var language = _ref26.language,
              dataLoaders = _ref26.dataLoaders,
              fingerMenuContext = _ref26.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  return _context16.abrupt('return', _Common2.default.getTranslationToDisplay(_, 'description', language, dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, undefined);
        }));

        return function resolve(_x35, _x36, _x37) {
          return _ref25.apply(this, arguments);
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
        var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_, args, _ref28) {
          var dataLoaders = _ref28.dataLoaders,
              fingerMenuContext = _ref28.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  return _context17.abrupt('return', _Common2.default.getTranslationToPrintOnKitchenReceipt(_, 'description', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, undefined);
        }));

        return function resolve(_x38, _x39, _x40) {
          return _ref27.apply(this, arguments);
        };
      }()
    },
    descriptionToPrintOnCustomerReceipt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(_, args, _ref30) {
          var dataLoaders = _ref30.dataLoaders,
              fingerMenuContext = _ref30.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  return _context18.abrupt('return', _Common2.default.getTranslationToPrintOnCustomerReceipt(_, 'description', dataLoaders, fingerMenuContext));

                case 1:
                case 'end':
                  return _context18.stop();
              }
            }
          }, _callee18, undefined);
        }));

        return function resolve(_x41, _x42, _x43) {
          return _ref29.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(_) {
          return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  return _context19.abrupt('return', _.get('imageUrl'));

                case 1:
                case 'end':
                  return _context19.stop();
              }
            }
          }, _callee19, undefined);
        }));

        return function resolve(_x44) {
          return _ref31.apply(this, arguments);
        };
      }()
    },
    level: {
      type: _graphql.GraphQLInt,
      resolve: function () {
        var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(_) {
          return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  return _context20.abrupt('return', _.get('level'));

                case 1:
                case 'end':
                  return _context20.stop();
              }
            }
          }, _callee20, undefined);
        }));

        return function resolve(_x45) {
          return _ref32.apply(this, arguments);
        };
      }()
    },
    forDisplay: {
      type: _graphql.GraphQLBoolean,
      resolve: function () {
        var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(_) {
          return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  return _context21.abrupt('return', _.get('forDisplay'));

                case 1:
                case 'end':
                  return _context21.stop();
              }
            }
          }, _callee21, undefined);
        }));

        return function resolve(_x46) {
          return _ref33.apply(this, arguments);
        };
      }()
    },
    parentTag: {
      type: ParentTag,
      resolve: function () {
        var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(_, args, _ref35) {
          var tagLoaderById = _ref35.dataLoaders.tagLoaderById;
          return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  return _context22.abrupt('return', _.get('parentTagId') ? tagLoaderById.load(_.get('parentTagId')) : null);

                case 1:
                case 'end':
                  return _context22.stop();
              }
            }
          }, _callee22, undefined);
        }));

        return function resolve(_x47, _x48, _x49) {
          return _ref34.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});