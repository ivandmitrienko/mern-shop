import store from "components/store";
import { Types } from 'mongoose';

export type Product =  {
    nameOfProduct: string,
    nameOfPrice: number,
    image: string,
    count: number,
    _id?:Types.ObjectId
}

export interface IProducts {
    products: Product[] | [],
}

export interface ICount {
    count:number,
}

export type RootState = ReturnType<typeof store.getState>



