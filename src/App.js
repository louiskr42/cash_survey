import {
    Database,
    Webserver,
    WebToken,
} from './modules';

let instance = null;
export default class App {
    constructor() {
        instance = this;

        this.bootstrap();
    }

    async bootstrap() {
        this.database = new Database();
        this.webServer = new Webserver();
        this.webToken = new WebToken();
    }

    getDatabase() {
        return this.database;
    }

    getWebserver() {
        return this.webServer;
    }

    getWebToken() {
        return this.webToken;
    }

    static getInstance() {
        return instance;
    }
}
