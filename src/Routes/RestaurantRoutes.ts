import { Router } from "express";
import { restaurantController } from "../controllers/RestaurantController";

export const restaurantRoutes = ( ): Router => {
    
    const router = Router();

    router.post('/restaurants', restaurantController.addRestaurant);
    router.get('/restaurants', restaurantController.getAllRestaurant);
    router.get('/:id/restaurantLocation:' , restaurantController.getRestaurantLocation);

    return router;
}

