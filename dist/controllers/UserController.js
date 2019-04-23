'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('../helpers');

var _models = require('../models');

var _App = require('../App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);
    }

    _createClass(UserController, null, [{
        key: 'getUsers',
        value: async function getUsers() {
            await _App2.default.getInstance().getDatabase().connect();

            return await _models.UserModel.find();
        }
    }, {
        key: 'getUser',
        value: async function getUser(email) {
            await _App2.default.getInstance().getDatabase().connect();

            return await _models.UserModel.findOne({ email: email });
        }
    }, {
        key: 'addUser',
        value: async function addUser(name, email, password) {
            await _App2.default.getInstance().getDatabase().connect();

            var passwordHash = await new _helpers.Hash(password).gen();
            var user = new _models.UserModel({
                name: name,
                email: email,
                password: passwordHash
            });

            return await user.save();
        }
    }, {
        key: 'delUser',
        value: async function delUser(email) {
            await _App2.default.getInstance().getDatabase().connect();

            return await _models.UserModel.findOneAndDelete({ email: email });
        }
    }]);

    return UserController;
}();

exports.default = UserController;