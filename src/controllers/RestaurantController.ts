import { IRestaurant, Restaurant } from "../entity/Restaurant";
import { RestaurantService } from "../service/RestaurantService";
import { Request,Response } from "express";

class RestaurantController{
    //restauranService : RestaurantService;
    
/*
    constructor(restaurantService: RestaurantService){
       // this.restauranService  = restaurantService;
    }
    */

    public addRestaurant(req: Request, res : Response) {
        console.log(req.body);
        const {name, latitude, longitude} = req.body as IRestaurant;

    

        const rest = new Restaurant(name, latitude, longitude);

        console.log(rest);
        res.status(201).json(rest);

    }
    
    public getAllRestaurant = ( req : Request, res: Response): void => {

    }

    public getRestaurantLocation = (req:Request, res:Response): void => {

    }

}
export const restaurantController = new RestaurantController(); //instance oluşturduk. routes için (herhangi bi class)
