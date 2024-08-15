import { Collection, ObjectId } from "mongodb";
import { MongoDBClient } from "../db/MongoDBClient";
import { CourierEntity } from "./courier";

export interface RestaurantEntity {
  name: string;
  latitude: number;
  longitude: number;
}

export class Restaurant {
  private _db;
  id?: string;
  constructor(
    public name?: string,
    public latitude?: number,
    public longitude?: number
  ) {
    this._db = MongoDBClient.db;
  }

  create() {
    if (this.name && this.latitude && this.longitude) {
      //const courierCollections = db.collection('Restaurant')
      const restaurantCollections: Collection<RestaurantEntity> =
        this._db.collection("Restaurant");

      try {
        return restaurantCollections.insertOne({
          name: this.name,
          latitude: this.latitude,
          longitude: this.longitude,
        });
      } catch (e: any) {
        // let ids = e.result.result.insertedIds;
        console.error("Failed to save restaurant", e);
        throw new Error("Failed to save restaurant");
      }
    } else {
      throw new Error("Failed to save restaurant");
    }
  }
  /*
  async delete(id: string){
    const rest = await this._db.findOne({
      id
    })
  }
  */
  async delete(id: string) {
    const restaurantCollections: Collection<RestaurantEntity> =
      this._db.collection("Restaurant");

    try {
      const objectId = new ObjectId(id);
      const result = await restaurantCollections.deleteOne({ _id: objectId }); //mongodb deki _id si objectId eşleştiğinde o restoran siliniyor

      if (result.deletedCount === 0) {
        throw new Error("Failed to delete restaurant: Not found");
      }
    } catch (e: any) {
      console.error("Failed to delete restaurant ", e);
      throw new Error("Failed to delete restaurant");
    }
  }

  async update(
    id: string,
    updateData: Partial<RestaurantEntity>
  ): Promise<void> {
    const restaurantCollections: Collection<RestaurantEntity> =
      this._db.collection("Restaurant");

    try {
      const objectId = new ObjectId(id);

      const result = await restaurantCollections.updateOne(
        { _id: objectId },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        throw new Error("Failed to updated restaurant: Not found");
      }
    } catch (e: any) {
      console.error("Failed to updated courier:", e);
      throw new Error("Failed to update courier");
    }
  }

  async findAll(): Promise<RestaurantEntity[]> {
    const restaurantCollections: Collection<RestaurantEntity> =
      this._db.collection("Restaurant");

    try {
      const restaurants = await restaurantCollections.find().toArray();
      return restaurants;
    } catch (e: any) {
      console.error("Failed to fetch restaurants", e);
      throw new Error("Failed to fetch restaurants");
    }
  }

  async locationById(id: string): Promise<Partial<RestaurantEntity>> {
    const restaurantCollections: Collection<RestaurantEntity> =
      this._db.collection("Restaurant");
    try {
      const objectId = new ObjectId(id);
      const restaurants = await restaurantCollections.findOne({
        _id: objectId,
      });
      if (!restaurants) {
        throw new Error("Restaurants not found!!");
      }
      return {
        latitude: restaurants.latitude,
        longitude: restaurants.longitude,
      };
    } catch (e: any) {
      console.error("Failed to fetch restaurant location:", e);
      throw new Error("Failed to fetch restaurant location");
    }
  }
}
