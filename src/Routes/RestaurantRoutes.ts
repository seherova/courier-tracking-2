import { Router } from "express";
import { RestaurantController } from "../controllers/RestaurantController";


const restaurantRoutes = ( restaurantController: RestaurantController): Router => {
    const router = Router();

    router.post('/', restaurantController.addRestaurant);
    router.get('/restaurants', restaurantController.getAllRestaurant);
    router.get('/:id/restaurantLocation:' , restaurantController.)

}
