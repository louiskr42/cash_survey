import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import {
    LoginRoute,
} from '../routes';
import RegisterRoute from '../routes/Register';

export default class Webserver {
	constructor() {
		/* init express */
		this.app = express();

		/* init modules */
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(cors());
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
		this.server = this.app.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0');
	}

	close() {
		this.server.close();
	}
}
