import fs from 'fs';
import jwt from 'jsonwebtoken';

export default class WebToken {
    constructor() {
        try {
			this.privateKey = fs.readFileSync('keys/private.key', 'utf8');
			this.publicKey = fs.readFileSync('keys/public.key', 'utf8');
		} catch (err) {
			console.log('Could not init JWT: ' + err.message);
        }
    }

    sign (payload) {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, this.privateKey, {
                expiresIn: '24h',
                algorithm: 'RS256',
            }, (err, token) => {
				if (err) reject(err);
				resolve(token);
			});
		});
	}

	verify (token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, this.publicKey, (err, decoded) => {
				if (err) resolve(null);
				resolve(decoded);
			});
		});
    }
}
