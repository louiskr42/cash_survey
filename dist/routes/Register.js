'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Route2 = require('./Route');

var _Route3 = _interopRequireDefault(_Route2);

var _controllers = require('../controllers');

var _App = require('../App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegisterRoute = function (_Route) {
    _inherits(RegisterRoute, _Route);

    function RegisterRoute() {
        _classCallCheck(this, RegisterRoute);

        var _this = _possibleConstructorReturn(this, (RegisterRoute.__proto__ || Object.getPrototypeOf(RegisterRoute)).call(this));

        _this.init();
        return _this;
    }

    _createClass(RegisterRoute, [{
        key: 'init',
        value: function init() {
            this.router.post('/', function (req, res, next) {
                if (typeof req.body.name === 'undefined' || typeof req.body.email === 'undefined' || typeof req.body.password === 'undefined') {
                    res.status(400).json({
                        success: false,
                        error: 'invalidParams'
                    });
                    return;
                }

                var name = req.body.name;
                var email = req.body.email;
                var password = req.body.password;

                // TODO: input validation!!

                _controllers.UserController.getUser(email).then(function (user) {
                    if (user) {
                        res.status(400).json({
                            success: false,
                            error: 'emailExists'
                        });
                        return;
                    }

                    _controllers.UserController.addUser(name, email, password).then(function () {
                        _App2.default.getInstance().getWebToken().sign({
                            name: name,
                            email: email
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

    return RegisterRoute;
}(_Route3.default);

exports.default = RegisterRoute;