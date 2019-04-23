'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Route2 = require('./Route');

var _Route3 = _interopRequireDefault(_Route2);

var _controllers = require('../controllers');

var _helpers = require('../helpers');

var _App = require('../App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginRoute = function (_Route) {
    _inherits(LoginRoute, _Route);

    function LoginRoute() {
        _classCallCheck(this, LoginRoute);

        var _this = _possibleConstructorReturn(this, (LoginRoute.__proto__ || Object.getPrototypeOf(LoginRoute)).call(this));

        _this.init();
        return _this;
    }

    _createClass(LoginRoute, [{
        key: 'init',
        value: function init() {
            this.router.post('/', function (req, res, next) {
                if (typeof req.body.email === 'undefined' || typeof req.body.password === 'undefined') {
                    res.status(400).json({
                        success: false,
                        error: 'invalidParams'
                    });
                    return;
                }

                var email = req.body.email;
                var password = req.body.password;

                // TODO: input validation!!

                _controllers.UserController.getUser(email).then(function (user) {
                    if (!user) {
                        res.status(400).json({
                            success: false,
                            error: 'invalidCredentials'
                        });
                        return;
                    }

                    new _helpers.Hash(password).compare(user.password).then(function (valid) {
                        if (!valid) {
                            res.status(400).json({
                                success: false,
                                error: 'invalidCredentials'
                            });
                            return;
                        }

                        _App2.default.getInstance().getWebToken().sign({
                            name: user.name,
                            email: user.email
                        }).then(function (token) {
                            res.status(200).json({
                                success: true,
                                data: {
                                    sessionToken: token
                                }
                            });
                        }).catch(function (err) {
                            // TODO: handle error
                        });
                    }).catch(function (err) {
                        // TODO: handle error
                    });
                }).catch(function (err) {
                    // TODO: handle error
                });
            });
        }
    }]);

    return LoginRoute;
}(_Route3.default);

exports.default = LoginRoute;