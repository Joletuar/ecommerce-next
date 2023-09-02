import { IDataFetched } from '@/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

// El argumento config se pasa de manera automática a traves del contexto del SWR Provider

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  // Mediante este hook podemos hacer el fetching de nuestra data

  /**
     * 
    const { data, error } = useSWR<IDataFetched>(
        `http://localhost:3452/api${url}`,
        fetcher,
        config
        );
    */

  const { data, error } = useSWR<IDataFetched>(
    process.env.NEXT_PUBLIC_BACKEND_URL + `${url}`,
    config
  );

  return {
    products: data?.products || [],
    product: data?.product || {},
    isLoading: !error && !data?.ok,
    isError: error,
  };
};
