import { Restaurant } from "../entity/Restaurant";
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
        const {name, latitude, longitude} = restaurant

  
            const rest: Restaurant = new Restaurant(name, latitude, longitude);
            return rest.save();
            
            
          }
      

  public addRestaurants = async (req: Request, res: Response) => {
    console.log(req.body);
    const restaurants = req.body as Restaurant[]

    try {
        for (const restaurant of restaurants) {
         await this._innerRestaurantAddFn(restaurant)
        }
      

      // rest.save(); //bu fonksiyonun görevi mongo db ye kayıt yapmak.
      res.status(201).send("OK!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }

    // tryın içindekileri mongo db ye kaydedicem !!
  }


  public async addRestaurant(req: Request, res: Response) {
    return this._innerRestaurantAddFn(req.body);
  }

  public getAllRestaurant = (req: Request, res: Response): void => {};

  public getRestaurantLocation = (req: Request, res: Response): void => {};
}
export const restaurantController = new RestaurantController(); //instance oluşturduk. routes için (herhangi bi class)
