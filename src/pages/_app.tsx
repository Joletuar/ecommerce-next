import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { SWRConfig } from 'swr';
import { lightTheme } from '@/themes';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { AuthProvider, CartProvider, UiProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            {/* Provider de Auth de NextAuth*/}
            <SessionProvider>
                {/* Provider de Auth propio*/}
                <AuthProvider>
                    {/* Provider de Paypal */}
                    <PayPalScriptProvider
                        options={{
                            'client-id':
                                process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                        }}
                    >
                        {/* Provider de SWR para el manejo de peticiones AJAX */}
                        <SWRConfig
                            // Este será el objeto config que será pasado al hook
                            value={{
                                fetcher: (resource, init) =>
                                    fetch(resource, init).then((res) =>
                                        res.json()
                                    ),
                            }}
                        >
                            {/* Procvider del UI */}
                            <UiProvider>
                                {/* Provider del cart  */}
                                <CartProvider>
                                    {/* Provider del tema de la app */}
                                    <ThemeProvider theme={lightTheme}>
                                        {/* Componente que permite resetear todos los estilos CSS */}
                                        <CssBaseline />
                                        <Component {...pageProps} />
                                    </ThemeProvider>
                                </CartProvider>
                            </UiProvider>
                        </SWRConfig>
                    </PayPalScriptProvider>
                </AuthProvider>
            </SessionProvider>
        </>
    );
}
