export interface IRestaurant {
    id?: string;
    name: string;
    latitude: number;
    longitude: number;
}


export class Restaurant implements IRestaurant {
    id?: string;
   
   constructor(public name: string,
    public latitude: number,
    public longitude: number){}
    
}
/*


class Test {
   name?: string;
    age?: number;
}


class Test2 {
    private _name?: string;
    private _age: number;


    get age() {
        return this._age
    }

    set age(value: number) {
        this.age = value
    }
 }
 

const t = new Test();
t.name = "aaaa"



export default class Game_Old {
    public name: string;
     public price: number; 
     public category: string;
      public id?: Objestrstring;ingctId
    constructor(name: string,  price: number,  category: string) {
        this.name = name
    }
}

export default class Game {
    constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
}


const g = new Game("aaaa",11,"bbb")

console.log(g.name)

*/