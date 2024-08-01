import { Restaurant } from "../entity/Restaurant";

class RestaurantService{
    private restaurants: Restaurant[] = []

    constructor(restaurants: Restaurant[]){
        this.restaurants = restaurants;
    }

    addRestaurant(restaurant: Restaurant){
        this.restaurants.push(restaurant);
    }

    getAllRestaurants(){
        return this.restaurants;
    }

    deleteRestaurant(){

    }

    //restoranın konumları gelecek
}
export {RestaurantService};