import { ICartOrder, ICartProduct } from '@/interfaces';
import { CartState } from './';

type CartActionType =
    | {
          type: '[Cart] - LoadCart from cookies | storage';
          payload: ICartProduct[];
      }
    | {
          type: '[Cart] - Add Product';
          payload: ICartProduct[];
      }
    | {
          type: '[Cart] - Change cart quantity';
          payload: ICartProduct;
      }
    | {
          type: '[Cart] - Remove cart product';
          payload: ICartProduct;
      }
    | {
          type: '[Cart] - Update order values';
          payload: ICartOrder;
      };

export const cartReducer = (
    state: CartState,
    action: CartActionType
): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload],
            };

        case '[Cart] - Add Product':
            return {
                ...state,
                cart: [...action.payload],
            };

        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if (product._id != action.payload._id) return product;
                    if (product.size != action.payload.size) return product;

                    return action.payload;
                }),
            };

        case '[Cart] - Remove cart product':
            return {
                ...state,
                cart: state.cart.filter(
                    (product) =>
                        product._id != action.payload._id &&
                        product.size != action.payload.size
                ),
            };

        case '[Cart] - Update order values':
            return {
                ...state,
                order: { ...action.payload },
            };

        default:
            return state;
    }
};
