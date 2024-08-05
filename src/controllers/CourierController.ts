import { Request, Response } from "express";
import { CourierService } from "../service/CourierService";
import { Courier, CourierEntity } from "../entity/Courier";

class CourierController {
  //private courierService: CourierService;
  /*  constructor(courierService: CourierService){
        this.courierService = courierService;
    }
*/

private _innerCourierAddFn = (courier: Courier) => {
  
  const{name, surname, latitude, longitude, isAvailable} = courier;

  const courier_ : Courier = new Courier(name, surname, latitude, longitude, isAvailable);
  return courier_.save();
};

  public addCouriers = async (req: Request, res: Response) => {
   
    console.log(req.body);
    const couriers = req.body as Courier[];

    try{
      for(const courier of couriers){
         
          await this._innerCourierAddFn(courier)
      }
      res.status(201).send("OK");
    } catch (err:any){
      res.status(400).send(err.message);
    }
  };

  public addCourier= async(req: Request, res: Response)=> { 
    try{
      await this._innerCourierAddFn(req.body);
      res.status(201).send("OK");
    } catch(err: any){
      res.status(400).send(err.message);
    }
  };

  deleteCourier = async(req:Request, res: Response) => {
    const {id} = req.params;

    try{
      const courier = new Courier;
      await courier.delete(id);
      res.status(200).send('Courier deleted succesfully!')
    } catch(err: any){
      res.status(400).send(err.message);
    }
  }

  public getAllCouriers = (req: Request, res: Response): void => {};

  public getCourierLocation = (req: Request, res: Response): void => {};
  
}

export const courierController = new CourierController();
