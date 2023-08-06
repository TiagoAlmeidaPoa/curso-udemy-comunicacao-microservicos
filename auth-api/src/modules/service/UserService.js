import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userRepository from "../repository/UserRepository.js";
import UserException from "../user/exception/UserException.js";
import User from "../user/model/User.js";
import UserRepository from "../repository/UserRepository.js";
import * as HttpStatus from "../../config/constants/HttpStatus.js"
import * as secrets from "../../config/constants/secrets.js"

class UserService {

    async findByEmail(req) {
        try {
            const { email } = req.params;
            const { authUser } = req;
            this.validateRequestData(email); 
            let user = await userRepository.findByEmail(email);            
            await this.validateUserNotFound(user);
            await this.validateAuthenticatedUser(user, authUser);
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

    validateAuthenticatedUser(user, authUser) {
        if( !authUser || user.id !== authUser.d ) {
            throw new UserException(HttpStatus.FORBIDDEN, "You can't see this user data.")
        };
    }

    async getAccessToken(req) {
        try {
            const {email, password} = req.body;
            this.validateAccessTokenData(email, password);        
            let user = await UserRepository.findByEmail(email); 
            this.validateUserNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = { d: user.id, name: user.name, email: user.email };
            const accessToken = jwt.sign({authUser}, secrets.API_SECRET ,{expiresIn: '1d'});
            return {
                status: HttpStatus.SUCCESS,
                accessToken
            }
        } catch (error) {
            return {
                status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }

    }

    validateAccessTokenData(email, password) {
        if(!email || !password) {
            throw new UserException(HttpStatus.UNAUTHORIZED, "Email and password must bee informed.");
        }
    }

    async validatePassword(password, hashPassword) {
        if (!await bcrypt.compare(password, hashPassword)) {
            throw new UserException(HttpStatus.UNAUTHORIZED, "Password doesn't match.")
        }
    }

}

export default new UserService();
