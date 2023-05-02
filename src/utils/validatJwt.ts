import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';

export const Axios = async (): Promise<boolean> => {
    try {
        const { data } = await tesloApi.get<{
            ok: boolean;
            user?: IUser;
            message?: string;
        }>('/user/validate-token', { adapter: 'http' });

        return data.ok;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const Fetch = async (): Promise<boolean> => {
    try {
        const resp = await fetch(
            `http://localhost:3452/api/user/validate-token`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        const { ok } = (await resp.json()) as {
            ok: boolean;
            user?: IUser;
            message?: string;
        };

        return ok;
    } catch (error) {
        console.log(error);
        return false;
    }
};
