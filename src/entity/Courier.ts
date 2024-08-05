import { Collection, ObjectId } from "mongodb";
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
  private _db;
  id?: string;

  constructor(
    public name?: string,
    public surname?: string,
    public longitude?: number,
    public latitude?: number,
    public isAvailable?: boolean
  ) {
    this._db = MongoDBClient.db;
  }

  save(){
    if( this.name && this.surname && this.longitude && this.latitude && this.isAvailable){

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
  else{
    throw new Error("Failed to save courier");
  }
  }

  async delete(id: string){
    const courierCollections : Collection<CourierEntity> = this._db.collection('Courier');

    try{
      const objectId = new ObjectId(id)
      const result = await courierCollections.deleteOne({_id : objectId});
      if(result.deletedCount === 0){
        throw new Error("Failed to deleted courier: Not found ");
      }
    }catch(err: any){
      console.error('Failed to error courier ', err)
      throw new Error('Failed to delete courier')

    }
    
  }
}
