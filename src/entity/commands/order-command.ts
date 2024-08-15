import { Order } from "../order";

export class CreateOrderCommand implements Command {
  constructor(private order: Order) {}

  async execute(): Promise<void> {
    await this.order.create();
  }
}

export class UpdateOrderCommand implements Command {
  constructor(private order: Order, private id: string, private status: number) {}

  async execute(): Promise<void> {
    await this.order.updateStatus(this.id, this.status);
  }
}

export class FindAllOrderCommand implements Command {
  constructor(private order: Order) {}

  async execute(): Promise<void> {
    const orders = await this.order.findAll();
    console.log(orders)
  }
}

export class FindOrderByIdCommand implements Command {
  constructor(private order: Order, private id: string) {}

  async execute(): Promise<void> {
    const locId = await this.order.findById(this.id);
    console.log(locId);
  }
}
