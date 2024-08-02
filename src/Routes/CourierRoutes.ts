import { Router } from "express";
import { courierController } from "../controllers/CourierController";

export const courierRoutes = (): Router => {
    const router = Router();

    router.post('/couriers', courierController.addCouriers);
    router.post('/courier', courierController.addCourier);
    router.get('/couriers', courierController.getAllCouriers);
    router.get('/:id/courierlocation', courierController.getCourierLocation);

    return router;
}

