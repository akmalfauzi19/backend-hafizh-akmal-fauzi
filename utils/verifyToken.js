import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const { User } = db;
import { createError } from "../utils/error.js";


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(createError(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });

}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err);
        }

        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not Admin!"));
        }
    });
}