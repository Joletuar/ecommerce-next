import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';

export interface ContextProps {
    cart: ICartProduct[];
}

export const CartContext = createContext({} as ContextProps);
