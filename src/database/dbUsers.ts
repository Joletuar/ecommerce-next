import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';
import axios from 'axios';

// Realiza el login del usuario con email y password
export const checkUserEmailPassword = async (
    email: string = '',
    password: string = ''
) => {
    try {
        // Realizamos la petición a nuestro edpoint
        const { data } = await tesloApi.post<{
            user: IUser;
            token: string;
            ok: boolean;
        }>('/user/login', {
            email,
            password,
        });

        // Obtenemos los datos
        const { user, ok, token } = data;

        // Si no es ok entonces retornamos false
        if (!ok) {
            return null;
        }

        return { user, token };
    } catch (error) {
        return null;
    }
};

// Crea o verifica un usuario si esque no existe en la bd cuando se logeo con una red social
// El oAuthEmail y oAuthName siempre vienen indepediente del proveedor
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    try {
        // Realizamos la petición a nuestro edpoint
        const { data } = await tesloApi.post<{
            user: IUser;
            token: string;
            ok: boolean;
        }>('/user/login', {
            email: oAuthEmail,
            password: '@',
        });

        // Obtenemos los datos
        const { user, ok, token } = data;

        // Si el usuario ya existe retornamos los valores de la bd
        if (ok) {
            const { _id, name, email, role } = user;
            return {
                id: _id,
                name,
                email,
                role,
                token,
            };
        }

        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Si no existe entonces lo registramos usando los datos que vienen del proveedor que usó para registrarse

            if (error.response?.data.message === 'EL USUARIO NO EXISTE') {
                const data = await createNewUserWithProviders(
                    oAuthEmail,
                    oAuthName
                );

                return data;
            }
        }
    }
};

const createNewUserWithProviders = async (
    oAuthEmail: string,
    oAuthName: string
) => {
    try {
        // Definimos primero la url y despues el body
        const { data } = await tesloApi.post<{
            user: IUser;
            token: string;
            ok: boolean;
        }>('/user/register', {
            email: oAuthEmail,
            password: '@',
            name: oAuthName,
            role: 'client',
        });

        // Obtenemos los datos
        const { user, ok, token } = data;

        // Si no es ok entonces retornamos false
        if (ok) {
            const { _id, name, email, role } = user;
            return {
                id: _id,
                name,
                email,
                role,
                token,
            };
        }

        return null;
    } catch (error) {
        return null;
    }
};
