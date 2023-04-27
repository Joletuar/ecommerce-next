import { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct, IProduct } from '@/interfaces';

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
        try {
            // Obtenemos las cookies, si existen las serializamos, sino entonces retornamos un array vacío
            const cookiesProduct = Cookie.get('cart')
                ? JSON.parse(Cookie.get('cart')!)
                : [];

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
    }, []);

    useEffect(() => {
        // Verificamos que no esté vacío
        if (!state.cart.length) return;

        // Almacenamos la cookie con el nombre "cart"
        Cookie.set('cart', JSON.stringify(state.cart)); // Lo serializamos porque dentro de las cokkies no se puden almacenar objetos, solo strings
    }, [state.cart]);

    const onAddProductCart = (product: ICartProduct) => {
        // Verificamos que exista el productos
        const productInCart = state.cart.some((p) => p._id === product._id);

        // Si no existe lo agregamos
        if (!productInCart)
            return dispatch({
                type: '[Cart] - Add Product',
                payload: [...state.cart, product],
            });

        // Si existe, verificamos si tiene ya la talla agregada
        const productInCartButDifferent = state.cart.some(
            (p) => p._id === product._id && p.size === product.size
        );

        // Si no la tiene la agregamos
        if (!productInCartButDifferent)
            return dispatch({
                type: '[Cart] - Add Product',
                payload: [...state.cart, product],
            });

        // Actualizamos el quantity del producto si existe ya una talla que coincida
        const updatedProduct = state.cart.map((p) => {
            if (!(p._id === product._id)) return p;
            if (!(p.size === product.size)) return p; // Acumulamos la cantidad

            p.quantity += product.quantity;
            return p;
        });

        dispatch({
            type: '[Cart] - Add Product',
            payload: [...updatedProduct],
        });
    };

    const updatedCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    };

    return (
        <CartContext.Provider
            value={{
                ...state,

                // Métodos
                onAddProductCart,
                updatedCartQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
