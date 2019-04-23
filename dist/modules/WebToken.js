'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebToken = function () {
	function WebToken() {
		_classCallCheck(this, WebToken);

		try {
			this.privateKey = _fs2.default.readFileSync('keys/private.key', 'utf8');
			this.publicKey = _fs2.default.readFileSync('keys/public.key', 'utf8');
		} catch (err) {
			console.log('Could not init JWT: ' + err.message);
		}
	}

	_createClass(WebToken, [{
		key: 'sign',
		value: function sign(payload) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				_jsonwebtoken2.default.sign(payload, _this.privateKey, {
					expiresIn: '24h',
					algorithm: 'RS256'
				}, function (err, token) {
					if (err) reject(err);
					resolve(token);
				});
			});
		}
	}, {
		key: 'verify',
		value: function verify(token) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_jsonwebtoken2.default.verify(token, _this2.publicKey, function (err, decoded) {
					if (err) resolve(null);
					resolve(decoded);
				});
			});
		}
	}]);

	return WebToken;
}();

exports.default = WebToken;