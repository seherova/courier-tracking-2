export interface ICourier{ // Kurye bilgisini dakika başında almak için istek atacağım
    id? : string;
    name : string;
    surname : string;
    longitude : number;
    latitude : number;
    isAvailable: boolean;
}

export class Courier implements ICourier{
    id?: string;
    

    constructor(public name: string, public surname: string, public longitude: number, public latitude: number, public isAvailable: boolean){
        
    }
}