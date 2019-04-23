import express from 'express';

export default class Route {
    constructor() {
        this.router = express.Router();
    }

    getRouter() {
        return this.router;
    }
}
