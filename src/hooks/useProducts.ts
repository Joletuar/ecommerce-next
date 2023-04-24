import { IDataFetched } from '@/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

// const fetcher = (...args: [key: string]) =>
//     fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    // Mediante este hook podemos hacer el fetching de nuestra data

    // const { data, error } = useSWR<IDataFetched>(
    //     `http://localhost:3452/api${url}`,
    //     fetcher,
    //     config
    // );

    const { data, error } = useSWR<IDataFetched>(
        `http://localhost:3452/api${url}`,
        config
    );

    return {
        products: data?.products || [],
        product: data?.product || {},
        isLoading: !error && !data?.ok,
        isError: error,
    };
};
