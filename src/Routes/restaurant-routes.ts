import { Router } from "express";
import { restaurantController } from "../controllers/restaurant-controller";

export const restaurantRoutes = (): Router => {
  const router = Router();

  router.post("/restaurant", restaurantController.createRestaurant);
  router.post("/restaurants", restaurantController.createRestaurants);
  router.get("/restaurants", restaurantController.getAllRestaurants);
  router.get(
    "/restaurantLocation/:id",
    restaurantController.getRestaurantLocation
  );
  router.delete("/restaurant/:id", restaurantController.deleteRestaurant);
  router.patch("/restaurant/:id", restaurantController.updateRestaurant);

  return router;
};
