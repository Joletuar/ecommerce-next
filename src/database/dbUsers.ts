import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';

export const checkUserEmailPassword = async (
    email: string = '',
    password: string = ''
) => {
    try {
        // Realizamos la petición a nuestro edpoint
        const { data } = await tesloApi.post<{
            user: IUser;
            ok: boolean;
        }>('/user/login', {
            email,
            password,
        });

        // Obtenemos los datos
        const { user, ok } = data;

        // Si no es ok entonces retornamos false
        if (!ok) {
            return null;
        }

        return user;
    } catch (error) {
        return null;
    }
};
