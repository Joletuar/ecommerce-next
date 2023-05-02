import { ICartProduct, ICartOrder } from '@/interfaces';
import { createContext } from 'react';

export interface ContextProps {
    cart: ICartProduct[];
    order: ICartOrder;
    isLoaded: boolean;

    // Métodos
    onAddProductCart: (producto: ICartProduct) => void;
    updatedCartQuantity: (product: ICartProduct) => void;
    deleteCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
