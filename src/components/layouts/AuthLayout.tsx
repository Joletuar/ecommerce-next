import { FC } from 'react';

import Head from 'next/head';

import { Box } from '@mui/material';

interface Props {
    children?: JSX.Element[] | JSX.Element;
    title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <main>
                {/* El BOX por defecto toma el tamaño de sus hijos, por lo cual, si queremos un tamaño especifico debemos de especificar su width y heigth respectivamente */}

                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='calc(100vh - 200px)'
                >
                    {children}
                </Box>
            </main>
        </>
    );
};
