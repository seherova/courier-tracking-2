import { Request,Response } from "express";
import { CourierService } from "../service/CourierService";

class CourierController{
    private courierService: CourierService;

    constructor(courierService: CourierService){
        this.courierService = courierService;
    }

    public addCourier = (req: Request, res: Response): void => {
        

    };

    public getAllCouriers = (req : Request, res : Response): void => {

    }

    public getCourierLocation = (req : Request, res : Response): void => {

    }
  

}

export {CourierController};