import Route from './Route';
import { UserController } from '../controllers';
import { InputValidation } from '../helpers';
import App from '../App';

export default class RegisterRoute extends Route {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.router.post('/', (req, res, next) => {
            if (
                typeof req.body.name === 'undefined' ||
                typeof req.body.email === 'undefined' ||
                typeof req.body.password === 'undefined'
            ) {
                res.status(400).json({
                    success: false,
                    error: 'invalidParams',
                });
				return;
            }

            const { name, email, password } = req.body;

            if (
                !new InputValidation(name).validName() ||
                !new InputValidation(email).validEmail() ||
                !new InputValidation(password).validPassword()
            ) {
                res.status(400).json({
                    success: false,
                    error: 'invalidParams',
                });
                return;
            }

            new UserController().getUser(email)
                .then(user => {
                    if (user) {
                        res.status(400).json({
                            success: false,
                            error: 'emailExists',
                        });
                        return;
                    }

                    new UserController().addUser(name, email, password)
                        .then(() => {
                            App.getInstance().getWebToken().sign({
                                name: name,
                                email: email,
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
