import { Courier } from "./Courier";
import { Restaurant } from "./Restaurant";

export class Order{
    public restaurant: Restaurant;
    public courier: Courier;
    orderLocation: String;


    constructor(restaurant: Restaurant, courier: Courier){
        this.courier = courier;
        this.restaurant = restaurant;
    }  
}