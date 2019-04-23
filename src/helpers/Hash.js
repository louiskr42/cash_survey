import bcrypt from 'bcryptjs';

export default class Hash {
    constructor(data) {
        this.data = data;
    }

    gen() {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                // TODO: handle error
                bcrypt.hash(this.data, salt, (err, hash) => {
                    // TODO: handle error
                    resolve(hash);
                })
            })
        });
    }

    compare(hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(this.data, hash, (err, res) => {
                resolve(res);
            });
        });
    }
}
