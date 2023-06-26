import { ISuperMarkets } from "./markets";

export interface IProduct {
    name: string,
    price: string,
    superMarkets: ISuperMarkets[],
};