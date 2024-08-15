
import { ObjectId } from "mongodb";
import { CourierOrder } from "../entity/courier-order";

import { Request, Response } from "express";
import { IUpdateOrderStatusParams } from "../entity/order-status";
import { TrendyolAPI } from "./trendyol-api";

import { CommandInvoker } from "../entity/commands/command-invoker";
import { CreateOrderCommand, FindAllOrderCommand, FindOrderByIdCommand, UpdateOrderCommand } from "../entity/commands/order-command";
import { Order, OrderEntity } from "../entity/Order";

class OrderController {
  

  createOrder = async (req: Request, res: Response) => {
     console.log(req.body);
     const orderData = req.body as OrderEntity;

     const order = new Order(
      orderData.customerId,
      orderData.restaurantId,
      orderData.status     
     )

    try {
      
      await CommandInvoker.executeCommand(new CreateOrderCommand(order));
      res.status(201).send("Order created successfully.");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  public updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const order = new Order();
      await CommandInvoker.executeCommand(new UpdateOrderCommand(order, id, status));
      res.status(200).send("Order status updated successfully!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  public getAllOrders = async (req: Request, res: Response) => {
    try {
      const order = new Order();
      const orders = await CommandInvoker.executeCommand(new FindAllOrderCommand(order));
      res.status(200).send(orders);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  public getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const order = new Order();
      const orderDetails = await CommandInvoker.executeCommand(new FindOrderByIdCommand(order, id));
      res.status(200).send(orderDetails);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };


  assignOrderToCourier = async (req: Request, res: Response) => {

    try {
    const { courierId, orderId } = req.body as {courierId: string, orderId: string};
    const courierOrder = new CourierOrder( new ObjectId(courierId),  new ObjectId(orderId));
    const result = await courierOrder.create();
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
  }

  getTrendyolOrders = async(req: Request, res: Response) => {
    const {storeId } = req.body;
   
    const ty = new TrendyolAPI();
    const result = await ty.getOrders(storeId);
    res.status(200).json(result);

  }
}

export const orderController = new OrderController();
