import { Collection } from "mongodb";

import { Request, Response } from "express";
import { Courier } from "../entity/courier";
import { Restaurant, RestaurantEntity } from "../entity/restaurant";
import { CommandInvoker } from "../entity/commands/command-invoker";
import { CreateRestaurantCommand, DeleteRestaurantCommand, FindAllRestaurantCommand, Restaurant_LocationByIdCommand, UpdateRestaurantCommand } from "../entity/commands/restaurant-command";


class RestaurantController {
  //restauranService : RestaurantService;
  /*
    constructor(restaurantService: RestaurantService){
       // this.restauranService  = restaurantService;
    }
    */

  // private _innerRestaurantAddFn = (restaurant: Restaurant) => {
  //   const { name, latitude, longitude } = restaurant;

  //   const rest: Restaurant = new Restaurant(name, latitude, longitude);
  //   return rest.create(); //mongodb'ye kaydoldu
  // };

  public createRestaurants = async (req: Request, res: Response) => {
    console.log(req.body);
    const restaurants = req.body as Restaurant[];

    try {
      for (const restaurant of restaurants) {
        //await this._innerRestaurantAddFn(restaurant);
        const {
          name,
          latitude,
          longitude} = restaurant;

        const restaurantInstance : Restaurant = new Restaurant(
          name,
          latitude,
          longitude);

        await CommandInvoker.executeCommand(new CreateRestaurantCommand(restaurantInstance));
      }
      res.status(201).send("Restaurant added succesfully!");
      
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  public createRestaurant = async (req: Request, res: Response) => {
    const restaurantData = req.body as RestaurantEntity;

    const restaurant = new Restaurant(
      restaurantData.name,
      restaurantData.latitude,
      restaurantData.longitude
    );
    try {
      await CommandInvoker.executeCommand(new CreateRestaurantCommand(restaurant));
      res.status(201).send("OK!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  deleteRestaurant = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const restaurant = new Restaurant();
      await CommandInvoker.executeCommand(new DeleteRestaurantCommand(restaurant, id));
      res.status(200).send("Restaurant deleted successfully!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  updateRestaurant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body as Partial<RestaurantEntity>;

    try {
      const restaurant = new Restaurant();
      await CommandInvoker.executeCommand(new UpdateRestaurantCommand(restaurant, id, updateData))
      res.status(200).send("Restaurant updated succesfully!");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getAllRestaurants = async (req: Request, res: Response) => {
    try {
      const restaurant = new Restaurant();
      const restaurants = await CommandInvoker.executeCommand(new FindAllRestaurantCommand(restaurant));
      console.log(restaurants);
      res.status(200).send(restaurants);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getRestaurantLocation = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const restaurant = new Restaurant();
      const restaurantLocation = await CommandInvoker.executeCommand(new Restaurant_LocationByIdCommand(restaurant, id))
      res.status(200).send(restaurantLocation);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };


}
export const restaurantController = new RestaurantController(); //instance oluşturduk. routes için (herhangi bi class)
