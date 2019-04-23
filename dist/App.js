'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modules = require('./modules');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var App = function () {
    function App() {
        _classCallCheck(this, App);

        instance = this;

        this.bootstrap();
    }

    _createClass(App, [{
        key: 'bootstrap',
        value: async function bootstrap() {
            this.database = new _modules.Database();
            this.webServer = new _modules.Webserver();
            this.webToken = new _modules.WebToken();
        }
    }, {
        key: 'getDatabase',
        value: function getDatabase() {
            return this.database;
        }
    }, {
        key: 'getWebserver',
        value: function getWebserver() {
            return this.webServer;
        }
    }, {
        key: 'getWebToken',
        value: function getWebToken() {
            return this.webToken;
        }
    }], [{
        key: 'getInstance',
        value: function getInstance() {
            return instance;
        }
    }]);

    return App;
}();

exports.default = App;