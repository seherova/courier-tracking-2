import { Restaurant, RestaurantEntity } from "../Restaurant";

 

export class CreateRestaurantCommand implements Command{

    constructor(private restaurant: Restaurant){}
    async execute(): Promise<void> {
        await this.restaurant.create();
    }
}

export class DeleteRestaurantCommand implements Command{

    constructor(private restaurant: Restaurant,private id: string){}
    async execute(): Promise<void> {
        await this.restaurant.delete(this.id);
    }
}

export class UpdateRestaurantCommand implements Command{
    constructor(private restaurant: Restaurant,private id: string,private updateData: Partial<RestaurantEntity>){}
    async execute(): Promise<void> {
        await this.restaurant.update(this.id, this.updateData)
    }
}

export class FindAllRestaurantCommand implements Command{
    constructor(private restaurant: Restaurant){}

    async execute(): Promise<void> {
        const restaurants = await this.restaurant.findAll();
        console.log(restaurants);
    }
    
}

export class Restaurant_LocationByIdCommand implements Command { //isimlendirme hatalı mı
    constructor(private restaurant: Restaurant, private id: string){}
    
    async execute(): Promise<void> {
        const location = await this.restaurant.locationById(this.id)
        console.log(location);
    }

    
}