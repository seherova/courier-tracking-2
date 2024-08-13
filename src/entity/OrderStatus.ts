export enum OrderStatus{
    ACCEPTED = 100,
    READY = 200,
    SHIPPED = 300,
    DELIVERED = 400,
    REJECTED = 500

}

export interface IUpdateOrderStatusParams{
    id : string,
    status : OrderStatus
}