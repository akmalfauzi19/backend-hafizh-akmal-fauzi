import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import db from '../models/index.js';
import { createError } from '../utils/error.js';
const { User } = db;

export const register = async (req, res, next) => {
    try {
        const { name, email, password, typeAccount } = req.body;

        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
            return next(createError(409, 'User already exists'));
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (typeAccount !== 'admin' && typeAccount !== 'user') {
            return next(createError(400, 'Invalid account type'));
        }

        await User.create({ name, email, password: hashedPassword, type: typeAccount });
        return res.status(200).send('Registration successful');
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const checkUser = await User.findOne({ where: { email } });

        if (!checkUser) {
            return next(createError(404, 'User not found'));
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            checkUser.password
        );

        if (!isPasswordCorrect) {
            return next(createError(401, 'Invalid password'));
        }
        const token = jwt.sign(
            { id: checkUser.id, email: checkUser.email, isAdmin: checkUser.type === 'admin' },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        const { id, name, email: emailUser, type: isAdmin } = checkUser

        return res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }).status(200)
            .json({
                account: {
                    id,
                    name,
                    email: emailUser,
                },
                isAdmin: isAdmin === 'admin',
                access_token: token
            });
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        const auth = req.cookies;
        const token = jwt.verify(auth.access_token, process.env.JWT_TOKEN_SECRET);

        if (!token && !auth) return next(createError(400, "You are not logged in"));

        return res.clearCookie("access_token").status(200).send("Logged out");
    } catch (error) {
        next(error);
    }
}