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
            {/* Aqui llamamos nuestro provdier de autenticación */}
            <SessionProvider>
                {/* Provider de Paypal */}
                <AuthProvider>
                    <PayPalScriptProvider
                        options={{
                            'client-id':
                                process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                        }}
                    >
                        <SWRConfig
                            value={{
                                fetcher: (resource, init) =>
                                    fetch(resource, init).then((res) =>
                                        res.json()
                                    ),
                            }}
                        >
                            <UiProvider>
                                <CartProvider>
                                    <ThemeProvider theme={lightTheme}>
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
