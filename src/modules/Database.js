import mongoose from 'mongoose';

export default class Database {
    constructor() {
        this.url = process.env.DB || 'mongodb://localhost/test';
        this.db = null;

        this.connect();
    }

    connect() {
        console.log('Connecting to db...');

        return new Promise((resolve, reject) => {
            if (this.db) resolve(this.db);
            else {
                console.log('New connection');
                mongoose.connect(this.url, { useNewUrlParser: true });
                console.log('New connection finished');

                this.db = mongoose.connection;

                this.db.on('error', console.error.bind(console, 'connection error:'));
                this.db.on('open', resolve);
            }
        });
    }
}