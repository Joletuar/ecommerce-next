import { NextPage } from 'next';

import { useProducts } from '@/hooks';

import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { FullScreenLoading } from '@/components/ui';
import { ProductList } from '@/components/products';

const MenPage: NextPage = () => {
    const { products, isLoading } = useProducts(`/products?gender=men`);

    return (
        <ShopLayout
            title='Categoría - Men'
            pageDescription='Página con las prendas para hombres'
        >
            <Typography variant='h1' component='h1'>
                Tienda
            </Typography>

            <Typography variant='h2' sx={{ mb: 1 }}>
                Todos los productos para hombre
            </Typography>

            {/* Contenedor principal de nuestro aplicación */}

            {isLoading ? (
                <FullScreenLoading />
            ) : (
                <ProductList products={products} />
            )}
        </ShopLayout>
    );
};

export default MenPage;
