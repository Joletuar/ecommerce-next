import { FC } from 'react';

import { IProduct } from '@/interfaces';

import { Grid } from '@mui/material';
import { ProductCard } from './ProductCard';

interface Props {
    // children?: JSX.Element[] | JSX.Element;
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
    return (
        <>
            {/* Contenedor principal de nuestro aplicación */}

            {/* La prop "spacing" indica la separación entre los "Grid Item"  */}

            <Grid container spacing={4}>
                {products.map((product) => (
                    <ProductCard product={product} key={product.slug} />
                ))}
            </Grid>
        </>
    );
};
