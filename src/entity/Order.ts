import { Collection, ObjectId } from "mongodb";
import { MongoDBClient } from "../db/MongoDBClient";
import { OrderStatus } from "./order-status";

export interface OrderEntity {
  //_id?: ObjectId;
  customerId: string;
  restaurantId: string;
  status: number; //// e.g., "active", "assigned", "in-progress", "completed", "cancelled"
}

export class Order {
  private _db;
  id?: string;

  constructor(
    public customerId?: string,
    public restaurantId?: string,
    public status?: number
  ) {
    this._db = MongoDBClient.db;
  }

  async create() {
    if ( this.customerId && this.restaurantId && this.status) {
      const orderCollection: Collection<OrderEntity> =
        this._db.collection("Order");

      try {
        return orderCollection.insertOne({
         
          customerId: this.customerId,
          restaurantId: this.restaurantId,
          status: this.status,
        });
      } catch (e: any) {
        console.error("Failed to save orders", e);
        throw new Error("Failed to save order");
      }
    } else {
      throw new Error("Failed to save order");
    }
  }

  // sonradan statusun sınırlayabilirsin
  //  "active", "assigned", "in-progress", "completed", "cancelled"

  async updateStatus(id: string, status:OrderStatus ) {
    const orderCollection: Collection<OrderEntity> =
      this._db.collection("Order");

    try {
      const objectId = new ObjectId(id);
      const result = await orderCollection.updateOne(
        { _id: objectId },
        { $set: { status } }
      );

      if (result.matchedCount === 0) {
        throw new Error("Failed to update order status: Not found");
      }
    } catch (e: any) {
      console.error("Failed to updated order:", e);
      throw new Error("Failed to update order");
    }
  }

  async findById(orderId: string): Promise<OrderEntity | null> {
    const orderCollection: Collection<OrderEntity> =
      this._db.collection("Order");
    try {
      const objectId = new ObjectId(orderId);
      const order = await orderCollection.findOne({ _id: objectId });
      if (!order) {
        throw new Error("Order not found!");
      }
      return order;
    } catch (e: any) {
      console.error("Failed to find order by ID:", e);
      throw new Error("Failed to find order");
    }
  }

  async findAll(): Promise<OrderEntity[]> {
    const orderCollection: Collection<OrderEntity> =
      this._db.collection("Order");
    try {
      const orders = orderCollection.find().toArray();
      return orders;
    } catch (e: any) {
      console.error("Failed to find all orders:", e);
      throw new Error("Failed to find orders");
    }
  }
}
