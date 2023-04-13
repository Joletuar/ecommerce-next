import { FC } from 'react';

import Head from 'next/head';

import { Nabvar, SideMenu } from '../ui';

interface Props {
    children?: JSX.Element[] | JSX.Element;
    title: string;
    pageDescription: string;
    imageFullUrl?: string; // Debe ser un url completo, no parcial
}

export const ShopLayout: FC<Props> = ({
    children,
    title,
    pageDescription,
    imageFullUrl,
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>

                {/* Meta tags importantes para el SEO de la página */}

                <meta name='description' content={pageDescription} />

                {/* Etiquetas importantes que usan las redes sociales, y que tambien que permiten aumentar el SEO de la página */}

                <meta name='og:title' content={title} />
                <meta name='og:description' content={pageDescription} />

                {imageFullUrl && (
                    <meta name='og:image' content={imageFullUrl} />
                )}
            </Head>

            <header>
                <nav>
                    <Nabvar />
                </nav>
            </header>

            <SideMenu />

            <main
                style={{
                    margin: '80px auto',
                    maxWidth: '1440px',
                    padding: '0px 30px',
                }}
            >
                {children}
            </main>

            <footer>{/* Custom Footer */}</footer>
        </>
    );
};
