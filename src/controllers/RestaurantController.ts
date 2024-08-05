import { Collection } from "mongodb";
import { Restaurant, RestaurantEntity } from "../entity/Restaurant";
import { RestaurantService } from "../service/RestaurantService";
import { Request, Response } from "express";

class RestaurantController {
  //restauranService : RestaurantService;
  /*
    constructor(restaurantService: RestaurantService){
       // this.restauranService  = restaurantService;
    }
    */

  private _innerRestaurantAddFn = (restaurant: Restaurant) => {
    const { name, latitude, longitude } = restaurant;

    const rest: Restaurant = new Restaurant(name, latitude, longitude);
    return rest.save(); //mongodb'ye kaydoldu
  };

  public addRestaurants = async (req: Request, res: Response) => {
    console.log(req.body);
    const restaurants = req.body as Restaurant[];

    try {
      for (const restaurant of restaurants) {
        await this._innerRestaurantAddFn(restaurant);
      }
      res.status(201).send("OK!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  public addRestaurant = async (req: Request, res: Response) => {
    try {
      await this._innerRestaurantAddFn(req.body);
      res.status(201).send("OK!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };
  
  public deleteRestaurant = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const restaurant = new Restaurant();
      await restaurant.delete(id);
      res.status(200).send("Restaurant deleted successfully!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

 

  public getAllRestaurant = (req: Request, res: Response): void => {};

  public getRestaurantLocation = (req: Request, res: Response): void => {};
}
export const restaurantController = new RestaurantController(); //instance oluşturduk. routes için (herhangi bi class)
