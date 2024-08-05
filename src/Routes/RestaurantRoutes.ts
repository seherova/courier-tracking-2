import { Router } from "express";
import { restaurantController } from "../controllers/RestaurantController";

export const restaurantRoutes = ( ): Router => {
    
    const router = Router();

   
    router.post('/restaurant', restaurantController.addRestaurant);
    router.post('/restaurants', restaurantController.addRestaurants);
    router.get('/restaurants', restaurantController.getAllRestaurant);
    router.get('/restaurantLocation/:id' , restaurantController.getRestaurantLocation);
    router.delete('/restaurant/:id', restaurantController.deleteRestaurant);
    router.patch('/restaurant/:id', restaurantController.updateRestaurant);

    return router;
}

