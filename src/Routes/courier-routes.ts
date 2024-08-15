import { Router } from "express";
import { courierController } from "../controllers/courier-controller";

export const courierRoutes = (): Router => {
  const router = Router();

  router.post("/couriers", courierController.createCouriers);
  router.post("/courier", courierController.createCourier);
  router.get("/couriers", courierController.getAllCouriers);
  router.get("/courierlocation/:id", courierController.getCourierLocationById);
  router.delete("/courier/:id", courierController.deleteCourier);
  router.patch("/courier/:id", courierController.updateCourier);

  return router;
};
