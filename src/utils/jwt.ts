// Función de validación de JWT

import * as jose from 'jose';

export const isValidToken = async (token: string = '') => {
    const semilla = process.env.SECRET_JWT_SEDD;

    if (!semilla) {
        throw new Error('No hay semilla de JWT, revisar variables de entorno');
    }

    if (token.length <= 10) {
        return Promise.reject('JWT no es válido');
    }

    const secret = new TextEncoder().encode(semilla);
    const { payload } = await jose.jwtVerify(token, secret);

    return payload;
};
