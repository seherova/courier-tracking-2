import { Collection, ObjectId } from "mongodb";
import { MongoDBClient } from "../db/MongoDBClient";

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


  save() {
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
  async delete(id: string){
    const restaurantCollections: Collection<RestaurantEntity> =this._db.collection('Restaurant');

    try{
      const objectId = new ObjectId(id);
      const result = await restaurantCollections.deleteOne({_id: objectId}); //mongodb deki _id si objectId eşleştiğinde o restoran siliniyor

      if(result.deletedCount === 0 ){
        throw new Error('Failed to delete restaurant: Not found')
      }
    }catch(e: any){
      console.error("Failed to delete restaurant ", e);
      throw new Error('Failed to delete restaurant');
    }

  }
}

/*


class Test {
   name?: string;
    age?: number;
}


class Test2 {
    private _name?: string;
    private _age: number;


    get age() {
        return this._age
    }

    set age(value: number) {
        this.age = value
    }
 }
 

const t = new Test();
t.name = "aaaa"



export default class Game_Old {
    public name: string;
     public price: number; 
     public category: string;
      public id?: Objestrstring;ingctId
    constructor(name: string,  price: number,  category: string) {
        this.name = name
    }
}

export default class Game {
    constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
}


const g = new Game("aaaa",11,"bbb")

console.log(g.name)

*/
