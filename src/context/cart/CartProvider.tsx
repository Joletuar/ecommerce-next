import { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

import Cookie from 'js-cookie';

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

    useEffect(() => {
        //Establecemos el nombre de la cookie
        Cookie.set('Cart', JSON.stringify(state.cart)); // Lo serializamos porque dentro de las cokkies no se puden almacenar objetos, solo strings
    }, [state.cart]);

    useEffect(() => {
        onLoadProductsFromCookies();
    }, []);

    const onAddProductCart = (producto: ICartProduct) => {
        dispatch({ type: '[Cart] - Add Product', payload: producto });
    };

    const onLoadProductsFromCookies = () => {
        try {
            const cookiesProduct: ICartProduct[] = [
                JSON.parse(Cookie.get('Cart') ?? '{}'),
            ];

            dispatch({
                type: '[Cart] - LoadCart from cookies | storage',
                payload: cookiesProduct,
            });
        } catch (e) {
            dispatch({
                type: '[Cart] - LoadCart from cookies | storage',
                payload: [],
            });
        }
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
