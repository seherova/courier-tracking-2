import { Db, MongoClient } from "mongodb";

export class MongoDBClient {
  private static instance: MongoDBClient;
  // private _client: any;
  private _database: any;

  constructor() {
    // const collectionName = "recipes";
    //   const collection = database(collectionName);
    this.initDatabase();
  }

  private async initDatabase() {
    const uri =
      "mongodb+srv://ovaseher1:YEtF8GAZvxcidF8A@cluster0.lmaw3d4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0%22";

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
