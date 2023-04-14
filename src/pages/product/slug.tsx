import { NextPage } from 'next';

import { ShopLayout } from '@/components/layouts';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { initialData } from '@/database/products';
import {
    ProductSelectSizesSelector,
    ProductSlideShow,
} from '@/components/products';
import { ItemCounter } from '@/components/ui';

const product = initialData.products[0];

const ProductPage: NextPage = () => {
    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideShow images={product.images} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* titulos */}

                        {/* El "variant" indica como material va a tratar al componente, mientras que el "component" indica como se mostrará en el html */}

                        <Typography variant='h1' component='h1'>
                            {product.title}
                        </Typography>

                        <Typography variant='subtitle1' component='h2'>
                            ${product.price}
                        </Typography>

                        {/* cantidad */}

                        <Box sx={{ my: 2 }}>
                            <Typography variant='subtitle2'>
                                <ItemCounter />
                                <ProductSelectSizesSelector
                                    sizes={product.sizes}
                                    selectedSize={product.sizes[1]}
                                />
                            </Typography>
                        </Box>

                        {/* Agregar al carrito */}

                        <Button
                            color='secondary'
                            className='circular-btn'
                            sx={{
                                ':hover': {
                                    backgroundColor: 'rgb(19, 143, 232)',
                                },
                            }}
                        >
                            Agregar al carrito
                        </Button>

                        {/* Este elemento permite mostrar información  */}

                        {/* <Chip
                            label='No hay stock de momento'
                            color='error'
                            variant='outlined'
                        /> */}

                        {/* Descripcion */}

                        <Box sx={{ mt: 3 }}>
                            {/* La variante "subtitle2" pone en negrita el texto */}

                            <Typography variant='subtitle1'>
                                Descripción:
                            </Typography>

                            {/* La variante "body2" permite mostrar texto de manera compacta */}

                            <Typography variant='body2'>
                                {product.description}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default ProductPage;
