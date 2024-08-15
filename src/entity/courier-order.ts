import { Collection, ObjectId } from "mongodb";
import { MongoDBClient } from "../db/MongoDBClient";

export interface CourierOrderEntity{
    courierId: ObjectId,
    orderId: ObjectId;
}

export class CourierOrder{
    private _db;

    constructor(
        private courierId?: ObjectId,
        private orderId?: ObjectId
    ){
        this._db = MongoDBClient.db;
    }

    async create(){
        if(this.courierId && this.orderId){
            const courierOrderCollections : Collection<CourierOrderEntity> = this._db.collection("CourierOrder");

            try{
                return courierOrderCollections.insertOne({
                    courierId: this.courierId,
                    orderId: this.orderId
                });
            }catch(e: any){
                console.error("Failed to save courier-order", e);
                throw new Error("Failed to save courier-order");
            }
        }else{
            throw new Error("Failed to save courier-order")
        }
    }
}