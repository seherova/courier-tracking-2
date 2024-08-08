import { Router } from "express";
import { orderController } from "../controllers/OrderController";

export const orderRoutes = (): Router =>{
    const router = Router();

    router.post('/orders', orderController.addOrder);
    router.post('/ordersStatus/:id', orderController.updateOrderStatus);
    router.get('/orders', orderController.getAllOrders);
    router.get('/order/:id', orderController.getOrder);    
    return router;
};