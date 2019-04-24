import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import {
    LoginRoute,
	RegisterRoute,
} from '../routes';

export default class Webserver {
	constructor() {
		/* init express */
		this.app = express();

		/* init modules */
		this.app.use(helmet());
		this.app.use(compression());
		if (process.env.DEBUG)
			this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

        /* init routes */
        this.app.use('/login', new LoginRoute().getRouter());
        this.app.use('/register', new RegisterRoute().getRouter());

		/* start server */
		this.listen();
	}

	listen() {
		this.server = this.app.listen(8080);
	}

	close() {
		this.server.close();
	}
}
