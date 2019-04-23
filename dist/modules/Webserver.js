'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('../routes');

var _Register = require('../routes/Register');

var _Register2 = _interopRequireDefault(_Register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Webserver = function () {
	function Webserver() {
		_classCallCheck(this, Webserver);

		/* init express */
		this.app = (0, _express2.default)();

		/* init modules */
		this.app.use((0, _helmet2.default)());
		this.app.use((0, _compression2.default)());
		this.app.use((0, _cors2.default)());
		this.app.use((0, _morgan2.default)('dev'));
		this.app.use(_express2.default.json());
		this.app.use(_express2.default.urlencoded({ extended: true }));

		/* init routes */
		this.app.use('/login', new _routes.LoginRoute().getRouter());
		this.app.use('/register', new _Register2.default().getRouter());

		/* start server */
		this.listen();
	}

	_createClass(Webserver, [{
		key: 'listen',
		value: function listen() {
			this.server = this.app.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0');
		}
	}, {
		key: 'close',
		value: function close() {
			this.server.close();
		}
	}]);

	return Webserver;
}();

exports.default = Webserver;