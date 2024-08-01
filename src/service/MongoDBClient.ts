import { Db, MongoClient } from "mongodb";



class MongoDBClient {
  private static instance: MongoDBClient;
 // private _client: any;
  private _database: any;

  constructor() {
    // const collectionName = "recipes";
    //   const collection = database.collection(collectionName);
    this.initDatabase();
  }

  private async initDatabase() {
    const uri =
      "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

    const dbName = "myDatabase";

    const client = new MongoClient(uri);
    this._database = client.db(dbName);
    await client.connect();
  }



  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new MongoDBClient();
  }


  static get db() {
    return this.getInstance()._database;
  }
}

restCollection
const restCollection = MongoDBClient.db.collection("restaurants")

try {
    const insertManyResult = await restCollection.insertMany({
        restName: "sdasa"
    });
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }