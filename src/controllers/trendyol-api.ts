import axios from "axios";

export class TrendyolAPI{
    
    private supplierId? : string;
    private apiKey? : string;
    private secretKey?: string;
    private apiUrl = "https://api.trendyol.com/mealgw/suppliers/"

    constructor() {
        this.apiKey = process.env.TRENDYOL_API_KEY;
        this.secretKey = process.env.TRENDYOL_SECRET_KEY;
        this.supplierId = process.env.TRENDYOL_SUPPLIER_ID;

    }
    async getOrders(storeId: string) {
        const apiUrl = this.apiUrl + this.supplierId  + "/packages?storeId=" + storeId;
        const res = await axios.get(apiUrl,{
            auth: {
                username : this.apiKey!,
                password : this.secretKey!
            },
            headers: {
                "x-agentname": this.supplierId +'-'+'SelfIntegration', 
                "x-executor-user": 'deneme@gmail.com',
            }
        }) 
    return res.data;
    }

}