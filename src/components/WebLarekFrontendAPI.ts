import { ICard, IOrder, IOrderSuccess } from "../types";
import { Api, ApiListResponse } from "./base/api";

export interface IWebLarekAPI {
    getCardsAPI: () => Promise<ICard[]>;
    addOrderAPI: (order: IOrder) => Promise<IOrderSuccess>;
}

export class WebLarekFrontendAPI extends Api{
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
// УДАЛИТЬ console.log
    getCardsAPI(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) => {
            //console.log('Данные с сервера:', data.items);
            return data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }));
        });
    }
    
    addOrderAPI(order: IOrder): Promise<IOrderSuccess> {
        return this.post('/order', order).then(
            (data: IOrderSuccess) => data
        );
    }
}