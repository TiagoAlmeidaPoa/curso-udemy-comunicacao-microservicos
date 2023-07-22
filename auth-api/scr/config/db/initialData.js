import bcrypt from "bcrypt";
import User from "../modules/user/model/User.js";

export async function createInitialData() {
    try {

    }catch (err) {
        console.log(err);
    }
    await User.sync({ force: true });

    let password = await bcrypt.hash("123456", 10);

    let firstUser = await User.create({
        name: 'User Test',
        email: 'testuser@gmail.com',
        password: password,
    })
}