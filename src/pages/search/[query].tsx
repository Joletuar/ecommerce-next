import { GetServerSideProps, NextPage } from 'next';

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';

import { IProduct } from '@/interfaces';
import { Box, Typography } from '@mui/material';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
    return (
        <ShopLayout
            title='Teslo Shop | Search'
            pageDescription='Productos de ropas'
        >
            {/* El prop "component" es importante para el SEO, ya que especifica como el componente será renderizado dentro del documento html */}

            <Typography variant='h1' component='h1'>
                Buscar producto
            </Typography>

            {foundProducts ? (
                <Box display='flex' flexDirection='row' gap={1} mt={2} mb={2}>
                    <Typography variant='h2' sx={{ mb: 1 }}>
                        Productos para:
                    </Typography>
                    <Typography
                        variant='h2'
                        sx={{ mb: 1 }}
                        color='secondary'
                        fontWeight='bold'
                        textTransform='capitalize'
                    >
                        {query}
                    </Typography>
                </Box>
            ) : (
                <Box display='flex' flexDirection='row' gap={1} mt={2} mb={2}>
                    <Typography variant='h2' sx={{ mb: 1 }}>
                        No se encontraron productos para:
                    </Typography>
                    <Typography
                        variant='h2'
                        sx={{ mb: 1 }}
                        color='secondary'
                        fontWeight='bold'
                        textTransform='capitalize'
                    >
                        {query}
                    </Typography>
                </Box>
            )}

            {/* Contenedor principal de nuestro aplicación */}
            <ProductList products={products} />
        </ShopLayout>
    );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { query = '' } = ctx.params as { query: string };

    if (query.length <= 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        };
    }
    const resp = await fetch(`http://localhost:3452/api/search/${query}`);

    let { products } = (await resp.json()) as {
        products: IProduct[];
        ok: boolean;
    };

    const foundProducts = products.length > 0;

    // Si no se encuentra ningun producto, realizamos una petición para obtener todos los productos

    if (!foundProducts) {
        const resp = await fetch(`http://localhost:3452/api/products`);
        const { products: allProducts } = (await resp.json()) as {
            products: IProduct[];
            ok: boolean;
        };

        products = allProducts;
    }

    // TODO: retornar otros productos

    return {
        props: {
            products,
            foundProducts,
            query,
        },
    };
};
