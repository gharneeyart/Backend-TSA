import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById, orderStatus, searchOrdersByDate } from '../controllers/order.js';

const router = express.Router();


// orders
router.post('/create', createOrder)
router.put("/order-status/:orderId", orderStatus)
router.get("/all", getAllOrders)
router.get("/orders/:orderId", getOrderById)
router.delete("/orders/:orderId", deleteOrder)
router.get("/orders/search", searchOrdersByDate)
export default router;