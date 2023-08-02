import User from "../user/model/User.js"

class UserRepository {

    async findById(id) {
        try {
            return await User.findOne({ where:{ id } })
        } catch (error) {
            console.error(error.message);
        }
    }

    async findByEmail(email) {
        try {
            return await User.findOne({ where:{ email } })
        } catch (error) {
            console.error(error.message);
        }
    }

}

export default new UserRepository();