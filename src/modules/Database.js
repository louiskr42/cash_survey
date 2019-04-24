import mongoose from 'mongoose';

export default class Database {
    constructor() {
        this.url = process.env.DB || 'mongodb://localhost/test';
        this.db = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.db) resolve(this.db);
            else {
                mongoose.connect(this.url, { useNewUrlParser: true });

                this.db = mongoose.connection;

                this.db.on('error', reject);
                this.db.on('open', resolve);
            }
        });
    }
}