import { ICartOrder, ICartProduct } from '@/interfaces';
import { CartState, shippingAddress } from './';

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
      }
    | {
          type: '[Cart] - Load address from cookies';
          payload: shippingAddress;
      }
    | {
          type: '[Cart] - Update address from cookies';
          payload: shippingAddress;
      }
    | {
          type: '[Cart] - Order complete';
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

        // De esta forma hacemos que los 2 cases ejecuten la misma operación
        case '[Cart] - Load address from cookies':
        case '[Cart] - Update address from cookies':
            return {
                ...state,
                shippingAddress: { ...action.payload },
            };

        case '[Cart] - Order complete':
            return {
                ...state,
                cart: [],
                order: {
                    quantity: 0,
                    subtotal: 0,
                    tax: 0,
                    total: 0,
                },
            };

        default:
            return state;
    }
};
