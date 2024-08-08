import { Router } from "express";
import { customerController } from "../controllers/CustomerController";

export const customerRoutes = (): Router => {
  const router = Router();

  router.post("/customers", customerController.addCustomer);
  router.get("/customer", customerController.getAllCustomers);
  router.patch("/customer", customerController.updateCustomers);
  router.delete("/customer/:id", customerController.deleteCustomer);

  return router;
};
