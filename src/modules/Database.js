import mongoose from 'mongoose';

export default class Database {
    constructor() {
        this.url = process.env.DB || 'mongodb://localhost/test';
        this.db = null;
    }

    connect() {
        console.log('Connecting to db...');

        return new Promise((resolve, reject) => {
            if (this.db) resolve(this.db);
            else {
                mongoose.connect(this.url, { useNewUrlParser: true });
                console.log('Started new connection.');

                this.db = mongoose.connection;

                this.db.on('error', console.error.bind(console, 'connection error:'));
                this.db.on('open', resolve);
            }
        });
    }
}