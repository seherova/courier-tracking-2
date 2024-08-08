import { Collection, ObjectId } from "mongodb";
import { MongoDBClient } from "../db/MongoDBClient";

export interface Address {
  //addresId: string,
  addresName: string;
  city: string;
  neighbourhood: string;
  street: string;
  homeNumber: string;
  zipCode: string;
  phone: string;
}

export interface CustomerEntity {
  //customerId: string,
  name: string;
  surname: string;
  phone: string;
  address: Address[];
}

export class Customer {
  private _db;
  id?: string;

  constructor(
    // private customerId: string,
    private name?: string,
    private surname?: string,
    private phone?: string,
    private address?: Address[]
  ) {
    this._db = MongoDBClient.db;
  }

  async save() {
    if (this.name && this.surname && this.phone && this.address) {
      const customerCollections: Collection<CustomerEntity> =
        this._db.collection("Customer");

      try {
        return customerCollections.insertOne({
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          address: this.address,
        });
      } catch (e: any) {
        console.error("Failed to save restaurant", e);
        throw new Error("Failed to save restaurant");
      }
    } else {
      throw new Error("Failed to save Customer");
    }
  }

  async delete(id: string) {
    const customerCollections: Collection<CustomerEntity> =
      this._db.collection("Customer");

    try {
      const objectId = new ObjectId(id);
      const result = await customerCollections.deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        throw new Error("Failed to delete Customer: Not Found");
      }
    } catch (e: any) {
      console.error("Failed to delete customer", e);
      throw new Error("Failed to delete customer");
    }
  }

  async update(id: string, updateData: Partial<CustomerEntity>): Promise<void> {
    const customerCollections: Collection<CustomerEntity> =
      this._db.collection("Customer");

    try {
      const objectId = new ObjectId(id);
      const result = await customerCollections.updateOne(
        { _id: objectId },
        { $set: updateData }
      );
      if (result.matchedCount === 0) {
        throw new Error("Failed to updated customer: Not Found");
      }
    } catch (e: any) {
      console.error("Failed to updated customer", e);
      throw new Error("Failed to update customer");
    }
  }

  async findAll(): Promise<CustomerEntity[]> {
    const customerCollections: Collection<CustomerEntity> =
      this._db.collection("Customer");

    try {
      const customers = await customerCollections.find().toArray();
      return customers;
    } catch (e: any) {
      console.error("Failed to fetch customers", e);
      throw new Error("Failed to fetch customers");
    }
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    const customerCollection: Collection<CustomerEntity> =
      this._db.collection("Customer");
    try {
      const objectId = new ObjectId(id);
      const customer = await customerCollection.findOne({ _id: objectId });
      if (!customer) {
        throw new Error("Customer not found");
      }
      return customer;
    } catch (e: any) {
      console.error("Failed to find customer by ID");
      throw new Error("Failed to find customer");
    }
  }
}
