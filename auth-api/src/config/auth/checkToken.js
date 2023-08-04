import jwt from "jsonwebtoken";
import { promisify } from "util";

import AuthException from "./AuthException.js";

import * as secrets from "../constants/secrets.js";
import * as HttpStatus from "../constants/HttpStatus.js";

const emptySpace = " ";

export default async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new AuthException(HttpStatus.UNAUTHORIZED, "Access token was not informed.");
        }
        let accessToken = authorization;
        if (accessToken.includes(emptySpace)) {
            accessToken = accessToken.split(emptySpace)[1];
        }else{
            accessToken = authorization;
        }
        const decoded = await promisify(jwt.verify)(
            accessToken, 
            secrets.API_SECRET
            );
            req.authUser = decoded.authUser;
            return next();
    } catch (error) {
        return res.status(error.status || 500).json({
            status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
   
};