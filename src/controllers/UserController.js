import { Hash } from '../helpers';
import { UserModel } from '../models';
import App from '../App';

export default class UserController {
    constructor() {
        App.getInstance().getDatabase().connect();
    }

    async getUsers() {
        return await UserModel.find();
    }

    async getUser(email) {
        return await UserModel.findOne({ email: email });
    }

    async addUser(name, email, password) {
        const passwordHash = await new Hash(password).gen();
        const user = new UserModel({
            name: name,
            email: email,
            password: passwordHash,
        });

        return await user.save();
    }

    async delUser(email) {
        return await UserModel.findOneAndDelete({ email: email });
    }
}
