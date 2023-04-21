import { IProduct } from './products';

export interface IDataFetched {
    ok: true;
    products: IProduct[];
}
