import { NextPage } from 'next';

import { useProducts } from '@/hooks';

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products/ProductList';
import { FullScreenLoading } from '@/components/ui';
import { Typography } from '@mui/material';

const WomenPage: NextPage = () => {
    const { products, isLoading } = useProducts(`/products?gender=women`);

    return (
        <ShopLayout
            title='Categoría - Women'
            pageDescription='Página con las prendas para mujeres'
        >
            <Typography variant='h1' component='h1'>
                Tienda
            </Typography>

            <Typography variant='h2' sx={{ mb: 1 }}>
                Todos los productos para mujeres
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

export default WomenPage;
