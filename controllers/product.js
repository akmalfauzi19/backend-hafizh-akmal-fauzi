import { createError } from '../utils/error.js';
import jwt from "jsonwebtoken";
import db from '../models/index.js';
const { Product } = db;

export const getAll = async (req, res, next) => {
    try {
        const auth = req.cookies;

        const getDetailUser = jwt.verify(auth.access_token, process.env.JWT_TOKEN_SECRET);

        const product = await Product.findAll({ where: { userId: getDetailUser.id } });

        return res.status(200).send(product);
    } catch (error) {
        next(error);
    }

}

export const create = async (req, res, next) => {
    try {
        const auth = req.cookies;

        const { name, price, stock } = req.body;

        const productExist = await Product.findOne({ where: { name } });

        if (productExist) {
            return next(createError(409, 'Product already exists'));
        }

        if (stock < 0) {
            return next(createError(400, 'Stock must be greater than 0'));
        }

        const getDetailUser = jwt.verify(auth.access_token, process.env.JWT_TOKEN_SECRET);

        await Product.create({
            name, price, userId: getDetailUser.id, stock
        })

        return res.status(201).send('Create product successfuly');
    } catch (error) {
        next(error);
    }
}

export const edit = async (req, res, next) => {
    try {
        const auth = req.cookies;

        const { id } = req.params;
        const { name, price, stock } = req.body;

        const productExist = await Product.findOne({ where: { id } });

        if (!productExist) {
            return next(createError(404, 'Product not found'));
        }

        const checkNameProduct = await Product.findOne({ where: { name } });
        if (productExist.userId !== checkNameProduct.id) {
            if (checkNameProduct) {
                return next(createError(409, 'Name Product already exists'));
            }
        }
        if (stock < 0) {
            return next(createError(400, 'Stock must be greater than 0'));
        }

        const getDetailUser = jwt.verify(auth.access_token, process.env.JWT_TOKEN_SECRET);

        await Product.update({
            name, price, userId: getDetailUser.id, stock
        }, { where: { id } });

        return res.status(200).send('Edit product successfuly');
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const auth = req.cookies;

        const { id } = req.params;

        const productExist = await Product.findOne({ where: { id } });
        if (!productExist) {
            return next(createError(404, 'Product not found'));
        }

        const getDetailUser = jwt.verify(auth.access_token, process.env.JWT_TOKEN_SECRET);

        const getDetailProduct = await Product.findOne({ where: { id } });

        if (getDetailProduct.userId !== getDetailUser.id) {
            return next(createError(403, 'This not your product'));
        }

        await Product.destroy({ where: { id, userId: getDetailUser.id } });

        return res.status(200).send('Delete product successfuly');
    } catch (error) {
        next(error);
    }
}