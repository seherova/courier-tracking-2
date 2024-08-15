import { Router } from "express";
import { customerController } from "../controllers/customer-controller";

export const customerRoutes = (): Router => {
  const router = Router();

  router.post("/customers", customerController.createCustomer);
  router.get("/customer", customerController.getAllCustomers);
  router.patch("/customer", customerController.updateCustomers);
  router.delete("/customer/:id", customerController.deleteCustomer);

  return router;
};
