import NextLink from 'next/link';

import {
    Box,
    Button,
    CardActionArea,
    CardMedia,
    Grid,
    Link,
    Typography,
} from '@mui/material';

import { initialData } from '@/database/products';
import { ItemCounter } from '../ui';
import { FC } from 'react';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
    return (
        <>
            {productsInCart.map((product) => (
                // Se utiliza container porque va a tener varios elementos iternos

                <Grid container sx={{ mb: 1 }} key={product.slug}>
                    {/* Item correspondiente a las images de los productos del carrito */}

                    {/* A los Grid "item" siempre se les debe de definir el num. columnas que va a ocupar dentro del Grid */}
                    <Grid item xs={3}>
                        {/* TODO: llevar a la pag. del producto */}

                        <NextLink
                            href={'/product/slug'}
                            passHref
                            legacyBehavior
                        >
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={`/products/${product.images[0]}`}
                                        component='img'
                                        sx={{ borderRadius: 2 }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>

                    {/* Item con la información de cada producto */}
                    <Grid item xs={7} pl={4}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>
                                {product.title}
                            </Typography>

                            <Typography variant='body1'>
                                Talla: <strong>M</strong>
                            </Typography>

                            {/* Condicional */}

                            {editable ? (
                                <ItemCounter />
                            ) : (
                                <Typography variant='h6'>3 items</Typography>
                            )}
                        </Box>
                    </Grid>

                    {/* Item con información del path */}

                    <Grid
                        item
                        xs={2}
                        display='flex'
                        alignItems='center'
                        flexDirection='column'
                    >
                        <Typography variant='subtitle1'>
                            ${product.price}
                        </Typography>

                        {/* Editable */}

                        {editable && (
                            <Button color='error' variant='text'>
                                Borrar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            ))}
        </>
    );
};
