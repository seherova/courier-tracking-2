import { Courier, CourierEntity } from "../courier";



export class CreateCourierCommand implements Command{
    
    constructor(private courier: Courier){}

    async execute(): Promise<void>{
        await this.courier.create();
    } 
}

export class DeleteCourierCommand implements Command{
    // private courier: Courier;
    // private id : string;

    constructor(private courier: Courier, private id: string){
        // this.courier = courier;
        // this.id = id;
    }

    async execute(): Promise<void>{
        await this.courier.delete(this.id); 
    } 
}

export class UpdateCourierCommand implements Command{

    constructor(private courier: Courier, private id: string,private updateData: Partial<CourierEntity>){}

    async execute(): Promise<void>{
        await this.courier.update(this.id,this.updateData);
    } 
}

export class FindAllCourierCommand implements Command{

    constructor(private courier: Courier){}

    async execute(): Promise<void>{
        const couriers = await this.courier.findAll();
        console.log(couriers);
        
    } 
}

export class Courier_LocationByIdCommand implements Command{
    
    constructor(private courier: Courier,private id: string){}

    async execute(): Promise<void>{
        const location = await this.courier.locationById(this.id);
        console.log(location);
    } 
}