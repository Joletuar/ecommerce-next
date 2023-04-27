// Creamos una interfaz para definir como a venir estructurada nuestra data que mostraremos en la pantalla principal

import { ISize } from './';

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex';
    quantity: number;
}

export interface ICartOrder {
    quantity: number;
    subtotal: number;
    impuesto: number;
    total: number;
}
