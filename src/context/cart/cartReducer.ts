import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type CartActionType =
    | {
          type: '[Cart] - LoadCart from cookies | storage';
          payload: ICartProduct;
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
            };

        case '[Cart] - Add Product':
            let productsTemp: ICartProduct[] = state.cart.map((product) => {
                if (
                    product.slug === action.payload.slug &&
                    product.size === action.payload.size
                ) {
                    product.quantity += action.payload.quantity;
                    return product;
                } else {
                    return action.payload;
                }
            });

            !state.cart.length && productsTemp.push(action.payload);

            return {
                ...state,
                cart: [...productsTemp],
            };

        default:
            return state;
    }
};
