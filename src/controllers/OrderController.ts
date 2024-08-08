import { Order, OrderEntity } from "../entity/Order";
import { Request, Response } from "express";

class OrderController {
  private _innerOrderAddFn = async (orderData: Partial<OrderEntity>) => {
    const { customerId, restaurantId, status } = orderData;

    if (!customerId || !restaurantId) {
      throw new Error("Missing required order fields");
    }
    const orderInstance: Order = new Order(
      //  orderId,
      customerId,
      restaurantId,
      status
    );
    return orderInstance.save();
  };

  addOrder = async (req: Request, res: Response) => {
    // console.log(req.body);
    // const orders = req.body as Order[];
    try {
      // for(const order of orders){
      //     await this._innerOrderAddFn(order);
      // }
      await this._innerOrderAddFn(req.body);
      res.status(201).send("Order created successfully.");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  updateOrderStatus = async (req: Request, res: Response) => {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).send("Order ID and status are required");
    }

    try {
      const order = new Order();
      await order.updateStatus(id, status);
      res.status(200).send("Order status updated successfully.");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Order ID is required");
    }

    try {
      const order = new Order();
      const result = await order.findById(id);

      if (!result) {
        return res.status(404).send("Order not found");
      }

      res.status(201).json(result);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getAllOrders = async (req: Request, res: Response) => {
    try {
      const order = new Order();
      const results = await order.findAll();

      res.status(200).json(results);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };
}

export const orderController = new OrderController();
