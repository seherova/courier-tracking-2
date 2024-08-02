import { Request,Response } from "express";
import { CourierService } from "../service/CourierService";
import { ICourier } from "../entity/Courier";


class CourierController{
    //private courierService: CourierService;
  /*  constructor(courierService: CourierService){
        this.courierService = courierService;
    }
*/
    public addCourier = (req: Request, res: Response): void => {
        console.log(req.body);
        const {name, surname, latitude, longitude, isAvailable} = req.body as ICourier;

    };

    public getAllCouriers = (req : Request, res : Response): void => {

    }

    public getCourierLocation = (req : Request, res : Response): void => {

    }
  

}

export const courierController = new CourierController();