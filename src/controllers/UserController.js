import { Hash } from '../helpers';
import { UserModel } from '../models';
import App from '../App';

export default class UserController {
    static async getUsers() {
        await App.getInstance().getDatabase().connect();

        return await UserModel.find();
    }

    static async getUser(email) {
        await App.getInstance().getDatabase().connect();

        return await UserModel.findOne({ email: email });
    }

    static async addUser(name, email, password) {
        await App.getInstance().getDatabase().connect();

        const passwordHash = await new Hash(password).gen();
        const user = new UserModel({
            name: name,
            email: email,
            password: passwordHash,
        });

        return await user.save();
    }

    static async delUser(email) {
        await App.getInstance().getDatabase().connect();

        return await UserModel.findOneAndDelete({ email: email });
    }
}
