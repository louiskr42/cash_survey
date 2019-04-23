'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database = function () {
    function Database() {
        _classCallCheck(this, Database);

        this.url = process.env.DB || 'mongodb://localhost/test';
        this.db = null;

        this.connect();
    }

    _createClass(Database, [{
        key: 'connect',
        value: function connect() {
            var _this = this;

            console.log('Connecting to db...');

            return new Promise(function (resolve, reject) {
                if (_this.db) resolve(_this.db);else {
                    console.log('New connection');
                    _mongoose2.default.connect(_this.url, { useNewUrlParser: true });
                    console.log('New connection finished');

                    _this.db = _mongoose2.default.connection;

                    _this.db.on('error', console.error.bind(console, 'connection error:'));
                    _this.db.on('open', resolve);
                }
            });
        }
    }]);

    return Database;
}();

exports.default = Database;