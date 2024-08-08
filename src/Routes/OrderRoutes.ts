import { Router } from "express";
import { orderController } from "../controllers/OrderController";

export const orderRoutes = (): Router =>{
    const router = Router();

    router.post('/orders', orderController.createOrder);
    router.get('/orders', orderController.getAllOrders);
    return router;
};