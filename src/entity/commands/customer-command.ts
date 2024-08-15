
import { Customer, CustomerEntity } from "../customer";

export class CreateCustomerCommand implements Command{

    constructor(private customer: Customer){}

   async execute(): Promise<void> {
        await this.customer.create();
    }
    
}

export class DeleteCustomerCommand implements Command{
    constructor(private customer: Customer, private id: string){}
    
    async execute(): Promise<void> {
        await this.customer.delete(this.id);
    }
}

export class UpdateCustomerCommand implements Command{
    constructor(private customer: Customer, private id: string, private updateData: Partial<CustomerEntity>){}
    async execute(): Promise<void> {
        await this.customer.update(this.id, this.updateData);

    }
}

export class FindAllCustomersCommand implements Command{
    constructor(private customer: Customer){}
    
    async execute(): Promise<void> {
        const customers = await this.customer.findAll()
        console.log(customers);
    };
}

export class Customer_LocationById implements Command{
    constructor(private customer: Customer, private id: string){}
    
    async execute(): Promise<void> {
        const location = await this.customer.findById(this.id);
        console.log(location);
    };
}