import userRepository from "../repository/UserRepository.js";
import * as HttpStatus from "../../config/constants/HttpStatus.js"
import UserException from "../user/exception/UserException.js";

class UserService {

    async findByEmail(req) {
        try {
            const {email} = req.params;
            this.validateRequestData(email); 
            let user = await userRepository.findByEmail(email);
            this.validateUserNotFound(user);
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
                message: error.message
            }
        }
    }

    validateRequestData(email) {
        if (!email) {
            throw new UserException( HttpStatus.BAD_REQUEST, "User email was not informed." );
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new Error( HttpStatus.BAD_REQUEST, "User was not found !" );
        }
    }

}

export default new UserService();
