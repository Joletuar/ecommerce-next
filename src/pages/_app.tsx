import type { AppProps } from 'next/app';

import { SWRConfig } from 'swr';
import { lightTheme } from '@/themes';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { UiProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <SWRConfig
                value={{
                    fetcher: (resource, init) =>
                        fetch(resource, init).then((res) => res.json()),
                }}
            >
                <UiProvider>
                    <ThemeProvider theme={lightTheme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </UiProvider>
            </SWRConfig>
        </>
    );
}
