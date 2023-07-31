import userRepository from "../repository/userRepository";
import * as HttpStatus from "../../config/constants/HttpStatus"

class UserService {

    async findByEmail(req) {
        try {
            const {email} = req.params;
            this.validateRequestData(email); 
            let user = userRepository.findByEmail(email);
            if (!user) {

            }
            return {
                status: HttpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        } catch (error) {
            return {
                status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.status
            }
        }
    }

    validateRequestData(email) {
        if (!email) {
            throw new Error("User email was not informed.");
        }
    }

}

export default new UserService();