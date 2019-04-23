'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hash = function () {
    function Hash(data) {
        _classCallCheck(this, Hash);

        this.data = data;
    }

    _createClass(Hash, [{
        key: 'gen',
        value: function gen() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _bcryptjs2.default.genSalt(10, function (err, salt) {
                    // TODO: handle error
                    _bcryptjs2.default.hash(_this.data, salt, function (err, hash) {
                        // TODO: handle error
                        resolve(hash);
                    });
                });
            });
        }
    }, {
        key: 'compare',
        value: function compare(hash) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _bcryptjs2.default.compare(_this2.data, hash, function (err, res) {
                    resolve(res);
                });
            });
        }
    }]);

    return Hash;
}();

exports.default = Hash;