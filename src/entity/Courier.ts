import { Collection } from "mongodb";
import { MongoDBClient } from "../db/MongoDBClient";

export interface CourierEntity {
  // Kurye bilgisini dakika başında almak için istek atacağım
  
  name: string;
  surname: string;
  longitude: number;
  latitude: number;
  isAvailable: boolean;
}

export class Courier{
  id?: string;

  constructor(
    public name: string,
    public surname: string,
    public longitude: number,
    public latitude: number,
    public isAvailable: boolean
  ) {}

  save(){
    const db = MongoDBClient.db;

    const courierCollections: Collection<CourierEntity> = db.collection("Courier");

    try{

      return courierCollections.insertOne({
        name: this.name,
        surname: this.surname,
        longitude: this.longitude,
        latitude:this.latitude,
        isAvailable: this.isAvailable,
      });
    } catch (e:any){
      console.error("Failed to save couriers", e);
      throw new Error("Failed to save couriers");
    }
  }
}
