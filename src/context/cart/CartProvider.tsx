import { FC, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
};

interface Props {
    children?: JSX.Element;
}
export const CartProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    const onAddProductCart = (producto: ICartProduct) => {
        dispatch({ type: '[Cart] - Add Product', payload: producto });
    };

    return (
        <CartContext.Provider
            value={{
                ...state,

                // Métodos
                onAddProductCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
