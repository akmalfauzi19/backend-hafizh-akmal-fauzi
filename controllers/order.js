import { createError } from '../utils/error.js';
import jwt from "jsonwebtoken";
import db from '../models/index.js';
const { Order, Product, User, sequelize } = db;

export const order = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const auth = req.cookies;
        const { productId, quantity } = req.body;

        const checkProduct = await Product.findOne({ where: { id: productId }, lock: t.LOCK.UPDATE, transaction: t });

        if (!checkProduct || checkProduct.stock <= 0) {
            await t.rollback();
            return next(createError(404, 'Product not found'));
        }

        if (quantity < 0) {
            await t.rollback();
            return next(createError(400, 'Quantity must be greater than 0'));
        }

        if (checkProduct.stock < quantity) {
            await t.rollback();
            return next(createError(400, 'Not enough stock'));
        }

        let total = checkProduct.price * quantity;
        let shipping = false;
        let discount = 0;

        if (total > 50000) {
            discount = total * 0.1;
            total -= discount;
        }
        if (total > 15000) {
            shipping = true;
        }

        const getDetailUser = jwt.verify(auth.access_token, process.env.JWT_TOKEN_SECRET);

        await checkProduct.update({ stock: checkProduct.stock - quantity }, { transaction: t });

        const order = await Order.create({
            productId, customerId: getDetailUser.id, quantity, total, shipping, discount
        }, { transaction: t });

        await t.commit();

        return res.status(201).json({
            success: true,
            message: 'Order success',
            data: order
        });
    } catch (error) {
        await t.rollback();
        next(error);
    }

}

export const mytransaction = async (req, res, next) => {
    try {
        const auth = req.cookies;

        const getDetailUser = jwt.verify(auth.access_token, process.env.JWT_TOKEN_SECRET);


        const orders = await Order.findAll({
            include: {
                model: Product,
                as: 'product',
                where: { userId: getDetailUser.id },
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: 'List of transaction',
            data: orders
        });
    } catch (error) {
        next(error);
    }
}