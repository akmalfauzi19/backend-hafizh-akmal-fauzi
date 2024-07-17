import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { create, deleteProduct, edit, getAll } from "../controllers/product.js";

const router = express.Router();

router.get('/', verifyAdmin, getAll);
router.post('/create', verifyAdmin, create);
router.patch('/edit/:id', verifyAdmin, edit);
router.delete('/delete/:id', verifyAdmin, deleteProduct);

export default router;