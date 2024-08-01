import { RestaurantService } from "../service/RestaurantService";
import { Request,Response } from "express";

class RestaurantController{
    restauranService : RestaurantService;
    

    constructor(restaurantService: RestaurantService){
        this.restauranService  = restaurantService;
    }

    public addRestaurant = (req: Request, res : Response) : void => {

    }
    
    public getAllRestaurant = ( req : Request, res: Response): void => {

    }

    public getRestaurantLocation = (req:Request, res:Response): void => {

    }

}
export {RestaurantController};
