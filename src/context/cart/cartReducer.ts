import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type CartActionType =
    | {
          type: '[Cart] - LoadCart from cookies | storage';
          payload: ICartProduct[];
      }
    | {
          type: '[Cart] - Add Product';
          payload: ICartProduct;
      };

export const cartReducer = (
    state: CartState,
    action: CartActionType
): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                cart: [...action.payload]
            };

        case '[Cart] - Add Product':
            let productsTemp = [...state.cart];

            const productFound = state.cart.find(
                (product) =>
                    product.slug === action.payload.slug &&
                    product.size === action.payload.size
            );

            productFound
                ? (productFound.quantity -= action.payload.quantity)
                : productsTemp.push(action.payload);

            return {
                ...state,
                cart: [...productsTemp],
            };

        default:
            return state;
    }
};
