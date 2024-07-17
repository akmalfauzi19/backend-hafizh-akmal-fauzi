import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { create, deleteProduct, edit, getAll, getMyProduct } from "../controllers/product.js";

const router = express.Router();

router.get('/', verifyUser, getAll);
router.get('/my-product', verifyAdmin, getMyProduct);
router.post('/create', verifyAdmin, create);
router.patch('/edit/:id', verifyAdmin, edit);
router.delete('/delete/:id', verifyAdmin, deleteProduct);

export default router;