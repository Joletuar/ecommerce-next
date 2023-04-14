import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';

import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    Box,
    Typography,
    Link,
} from '@mui/material';

import { IProduct } from '@/interfaces';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
            ? `products/${product.images[1]}`
            : `products/${product.images[0]}`;
    }, [isHovered]);

    return (
        <>
            {/* onMouseEnter: es un evento que se dispara si el mouse se posiciona sobre el elemento
            onMouseLeave: es un evento que se dispara si el mouse sale fuera del elemento */}
            <Grid
                item
                xs={6}
                sm={4}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Card className='fadeIn'>
                    <NextLink
                        href='/product/slug'
                        passHref
                        legacyBehavior
                        // Con esto evitamos que cargue en cache la info de los productos
                        prefetch={false}
                    >
                        <Link>
                            {/* El "CardActionArea" permite que se pueda hacer click sobre una card, es decri, da ese efecto de que es clickable, hoover, resaltado, ect.*/}
                            <CardActionArea>
                                {/* Aqui renderizamos componentes media */}
                                {/* El "CardMedia" tambien permite cargar los elementos bajo demanda */}
                                {/* CardMedia: posee el método onLoad, el cual se dispara cuando la imagen se termina de cargar */}
                                <CardMedia
                                    component='img'
                                    image={productImage}
                                    alt={product.title}
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                </Card>

                {/* Los components tambien soportan las clases que nosotros definimos de manera personalizada */}

                <Box sx={{ mt: 1 }} className='fadeIn'>
                    <Typography fontWeight={700}>{product.title}</Typography>
                    <Typography fontWeight={500}>${product.price}</Typography>
                </Box>
            </Grid>
        </>
    );
};
