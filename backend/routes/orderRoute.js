import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder, updatStatus, userOrders, verifyPayment } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/placeOrder',authMiddleware,placeOrder);
orderRouter.post('/verifyPayment',verifyPayment);
orderRouter.get('/userorders',authMiddleware,userOrders);
orderRouter.get('/allorders',listOrders);
orderRouter.post('/status',updatStatus);

export default orderRouter;