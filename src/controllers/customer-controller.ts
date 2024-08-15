
import { Request, Response } from "express";
import { Customer, CustomerEntity } from "../entity/customer";
import { CommandInvoker } from "../entity/commands/command-invoker";
import { CreateCustomerCommand, Customer_LocationById, DeleteCustomerCommand, FindAllCustomersCommand, UpdateCustomerCommand } from "../entity/commands/customer-command";


class CustomerController {
 

  createCustomer = async (req: Request, res: Response) => {
    console.log(req.body);
    const customerData = req.body as CustomerEntity;

    const customer = new Customer(
      customerData.name,
      customerData.surname,
      customerData.phone,
      customerData.address
    );


    try {
      await CommandInvoker.executeCommand(new CreateCustomerCommand(customer));
      
      res.status(201).send("Ok");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const customer = new Customer();
      await CommandInvoker.executeCommand(new DeleteCustomerCommand(customer,id))
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
      await CommandInvoker.executeCommand(new UpdateCustomerCommand(customer, id, updateData));
      res.status(201).send("Customer updated succesfully");
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getAllCustomers = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Customer ID is required");
    }

    try {
      const customer = new Customer();
      const result = await CommandInvoker.executeCommand(new FindAllCustomersCommand(customer));
      console.log(result);
      if (!result) {
        return res.status(404).send("Customer not found");
      }
      res.status(201).json(res);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };

  getCustomerLocation = async (req: Request, res: Response) => {
    const{id} = req.params;
    try {
      const customer = new Customer();
      const location = await CommandInvoker.executeCommand(new Customer_LocationById(customer, id))
      console.log(location);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  };
}

export const customerController = new CustomerController();
