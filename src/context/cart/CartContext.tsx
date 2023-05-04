import { ICartProduct, ICartOrder } from '@/interfaces';
import { createContext } from 'react';
import { shippignAddress } from './CartProvider';

export interface ContextProps {
    cart: ICartProduct[];
    order: ICartOrder;
    isLoaded: boolean;

    shippignAddress?: shippignAddress;

    // Métodos
    onAddProductCart: (producto: ICartProduct) => void;
    updatedCartQuantity: (product: ICartProduct) => void;
    deleteCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: shippignAddress) => void;
}

export const CartContext = createContext({} as ContextProps);
