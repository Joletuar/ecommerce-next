import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';

export interface ContextProps {
    cart: ICartProduct[];

    // Métodos
    onAddProductCart: (producto: ICartProduct) => void;
    updatedCartQuantity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
