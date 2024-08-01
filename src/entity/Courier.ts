export interface Courier{ // Kurye bilgisini dakika başında almak için istek atacağım
    id : String;
    name : String;
    surname : String;
    longitude : number;
    latitude : number;
    isAvailable: boolean;
}