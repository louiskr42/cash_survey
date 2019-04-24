import Route from './Route';
import { UserController } from '../controllers';
import { Hash } from '../helpers';
import App from '../App';

export default class LoginRoute extends Route {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.router.post('/', (req, res, next) => {
            if (
                typeof req.body.email === 'undefined' ||
                typeof req.body.password === 'undefined'
            ) {
                res.status(400).json({
                    success: false,
                    error: 'invalidParams',
                });
				return;
            }

            const email = req.body.email;
            const password = req.body.password;

            // TODO: input validation!!

            new UserController().getUser(email)
                .then(user => {
                    if (!user) {
                        res.status(400).json({
                            success: false,
                            error: 'invalidCredentials',
                        });
                        return;
                    }

                    new Hash(password).compare(user.password)
                        .then(valid => {
                            if (!valid) {
                                res.status(400).json({
                                    success: false,
                                    error: 'invalidCredentials',
                                });
                                return;
                            }

                            App.getInstance().getWebToken().sign({
                                name: user.name,
                                email: user.email,
                            })
                                .then(token => {
                                    res.status(200).json({
                                        success: true,
                                        data: {
                                            sessionToken: token,
                                        },
                                    });
                                })
                                .catch(err => {
                                    // TODO: handle error
                                });
                        })
                        .catch(err => {
                            // TODO: handle error
                        });
                })
                .catch(err => {
                    // TODO: handle error
                });
        });
    }
}
