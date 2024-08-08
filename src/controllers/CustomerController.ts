import { Customer, CustomerEntity } from "../entity/Customer";
import { Request, Response } from "express";

class CustomerController {
  private _innerCustomerFn = (customer: CustomerEntity) => {
    const { name, surname, phone, address } = customer;

    const cust: Customer = new Customer(name, surname, phone, address);
    return cust.save();
  };

  addCustomer = async (req: Request, res: Response) => {
    try {
      await this._innerCustomerFn(req.body);
      res.status(201).send("Ok");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const customer = new Customer();
      await customer.delete(id);
      res.status(201).send("Customer deleted successfully!");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };
  updateCustomers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body as Partial<CustomerEntity>;

    try {
      const customer = new Customer();
      await customer.update(id, updateData);
      res.status(201).send("Customer updated succesfully");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Customer ID is required");
    }

    try {
      const customer = new Customer();
      const result = await customer.findById(id);

      if (!result) {
        return res.status(404).send("Customer not found");
      }
      res.status(201).json(res);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getAllCustomers = async (req: Request, res: Response) => {
    try {
      const customer = new Customer();
      const customers = await customer.findAll();
      res.status(201).send("Getting all customers is succesfully!");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };
}

export const customerController = new CustomerController();
