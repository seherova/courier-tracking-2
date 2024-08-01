import { Router } from "express";
import { CourierController } from "../controllers/CourierController";

const courierRoutes = (courierController : CourierController): Router => {
    const router = Router();

    router.post('/', courierController.addCourier);
    router.get('/couriers', courierController.getAllCouriers);
    router.get('/:id/location', courierController.getCourierLocation);

    return router;
}
export {courierRoutes};
