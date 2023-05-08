import { ICartProduct, ICartOrder } from '@/interfaces';
import { createContext } from 'react';
import { shippingAddress } from './CartProvider';

interface ContextProps {
    cart: ICartProduct[];
    order: ICartOrder;
    isLoaded: boolean;

    shippingAddress?: shippingAddress;

    // Métodos
    onAddProductCart: (producto: ICartProduct) => void;
    updatedCartQuantity: (product: ICartProduct) => void;
    deleteCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: shippingAddress) => void;

    // Orders
    createOrder: () => Promise<{
        hasError: boolean;
        message: string;
    }>;
}

export const CartContext = createContext({} as ContextProps);
