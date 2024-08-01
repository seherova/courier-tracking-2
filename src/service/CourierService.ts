import { Courier } from "../entity/Courier";


class CourierService{
    private couriers : Courier[] = [];

    constructor(couriers: Courier[]){
        this.couriers = couriers;
    }

    addCourier(courier: Courier): void{
        this.couriers.push(courier);
    }

    //deleteCourier(courier: Courier): void{}

    getAllCouriers(): Courier[]{
        return this.couriers;
    }

    getCourierLocation(){
    }

    //kuryenin konumları gelecek
}

export {CourierService};