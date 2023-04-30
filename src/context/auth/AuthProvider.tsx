import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';

import { AuthContext, authReducer } from '.';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';

import Cookies from 'js-cookie';
import axios from 'axios';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

interface Props {
    children?: JSX.Element;
}
export const AuthProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();

    // Revalidación del token

    useEffect(() => {
        const validateToken = async () => {
            if (!Cookies.get('token')) return;

            try {
                // Realizamos la petición a nuestro edpoint
                const { data } = await tesloApi.get<{
                    user: IUser;
                    token: string;
                    ok: boolean;
                }>('/user/validate-token');

                // Obtenemos los datos
                const { user, token, ok } = data;

                if (!ok) {
                    return;
                }

                // Guardamos en las cookies el token nuevo
                Cookies.set('token', token);

                dispatch({
                    type: '[Auth] - Login',
                    payload: user,
                });
            } catch (e) {
                console.log(e);
                Cookies.remove('token');
            }
        };

        validateToken();
    }, []);

    // Logeo de usuario
    const loginUser = async (
        email: string,
        password: string
    ): Promise<boolean> => {
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
            const { user, token, ok } = data;

            // Si no es ok entonces retornamos false
            if (!ok) {
                return false;
            }

            // Guardamos en las cookies el token
            Cookies.set('token', token);

            // Dispachamos la función en el reducer
            dispatch({ type: '[Auth] - Login', payload: user });

            return true;
        } catch (error) {
            return false;
        }
    };

    // Registro de usuario
    const registerUser = async (
        email: string,
        password: string,
        name: string
    ): Promise<{ hasError: boolean; message?: string }> => {
        try {
            // Definimos primero la url y despues el body
            const { data } = await tesloApi.post<{
                user: IUser;
                token: string;
                ok: boolean;
            }>('/user/register', {
                email,
                password,
                name,
            });

            // Obtenemos los datos
            const { user, token, ok } = data;

            // Si no es ok entonces retornamos false
            if (!ok) {
                return {
                    hasError: true,
                    message:
                        'Hubo un error al registrar, intenta luego de unos minutos',
                };
            }

            // Guardamos en las cookies el token
            Cookies.set('token', token);

            // Dispachamos la función en el reducer
            dispatch({ type: '[Auth] - Login', payload: user });

            return {
                hasError: false,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message,
                };
            }

            return {
                hasError: true,
                message:
                    'No se pude crear el usuario, intente de nuevo más tarde',
            };
        }
    };

    // Logout de usuario
    const logoutUser = () => {
        Cookies.remove('token');
        Cookies.remove('cart');

        // Mediante esto podemos hacer un full refresh de la aplicación
        // Cuando hacemos esto todo lo que no sea persistente se pierde
        router.reload();
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,

                // Methods
                loginUser,
                registerUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
