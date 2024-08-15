import { request, Request, Response } from "express";
import { create } from "ts-node";
import { Courier_LocationByIdCommand, CreateCourierCommand, DeleteCourierCommand, FindAllCourierCommand, UpdateCourierCommand } from "../entity/commands/courier-commands";
import { Courier, CourierEntity } from "../entity/courier";
import { CommandInvoker } from "../entity/commands/command-invoker";

class CourierController {
  //private courierService: CourierService;
  /*  constructor(courierService: CourierService){
        this.courierService = courierService;
     }
*/

  // private _innerCourierAddFn = (courier: Courier) => {
  //   const { name, surname, latitude, longitude, isAvailable } = courier;

  //   const courierInstance: Courier = new Courier(
  //     name,
  //     surname,
  //     latitude,
  //     longitude,
  //     isAvailable
  //   );
  //   return courierInstance.create();
  // };

  createCouriers = async (req: Request, res: Response) => {
    console.log(req.body);
    const couriers = req.body as Courier[];
    try {
      for (const courier of couriers) {
       // await this._innerCourierAddFn(courier);
       const { name,
       surname,
       latitude,
       longitude,
       isAvailable} = courier;

       const courierInstance: Courier = new Courier(
        name,
        surname,
        latitude,
        longitude,
        isAvailable
      );

        await CommandInvoker.executeCommand(new CreateCourierCommand(courierInstance)) //!!!!!!!!!!!!!!!
      }
      res.status(201).send("Courier added succesfully!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  createCourier = async (req: Request, res: Response) => {
    
      const courierData = req.body as CourierEntity;
      const courier = new Courier(
        courierData.name,
        courierData.surname,
        courierData.latitude,
        courierData.longitude,
        courierData.isAvailable
      );

    try {

      //await this._innerCourierAddFn(req.body);

      await CommandInvoker.executeCommand(new CreateCourierCommand(courier))
    } catch (err: any) {
      res.status(400).send(err.message);
    } 
}

  deleteCourier = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const courier = new Courier();
      await CommandInvoker.executeCommand(new DeleteCourierCommand(courier, id))
      res.status(200).send("Courier deleted succesfully!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  updateCourier = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body as Partial<CourierEntity>;

    try {
      const courier = new Courier();
      await CommandInvoker.executeCommand(new UpdateCourierCommand(courier, id, updateData));
      res.status(200).send("updated courier succesfully!");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getAllCouriers = async (req: Request, res: Response) => {
    try {
      const courier = new Courier();
      const couriers = await CommandInvoker.executeCommand(new FindAllCourierCommand(courier))
      console.log(couriers);
      res.status(200).json(couriers);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getCourierLocationById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const courier = new Courier();
      const courierlocation = await CommandInvoker.executeCommand(new Courier_LocationByIdCommand(courier, id));
      console.log(courier);
      res.status(200).json(courierlocation);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };
}

export const courierController = new CourierController();
