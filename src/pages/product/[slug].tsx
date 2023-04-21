import { GetServerSideProps, NextPage } from 'next';

import { ShopLayout } from '@/components/layouts';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import {
    ProductSelectSizesSelector,
    ProductSlideShow,
} from '@/components/products';

import { ItemCounter } from '@/components/ui';
import { useProducts } from '@/hooks';
import { IProduct } from '@/interfaces';

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
    // No se acostumbra a generar esta páginas así, dado que esto no tiene SEO

    // // Obtenemos los parametros de ruta
    // const { query } = useRouter();

    // // Realizamos la petición a la api
    // const { product, isLoading } = useProducts(`/products/${query}`);

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

// Vamos hacer que está página se genere en el servido en cada request que se haga
// Esto de aqui ya se encuentra del lado del servidor

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Obtenemos el parámetro dinámico de la ruta

    const { slug = '' } = ctx.params as { slug: string };

    // Con el slug obtenido de la ruta hacemos la consulta a la base de datos par obtener información del producto

    const data = await fetch(`http://localhost:3452/api/products/${slug}`);
    const { product } = (await data.json()) as {
        ok: boolean;
        product: IProduct;
    };

    // Si el producto no existe redireccionamos a la pág principal

    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false, // Al indicar como false se da la posibilidad que la página si puede llegar a existir en un futuro
            },
        };
    }

    // Devolvemos las props al componente principal

    return {
        props: { product },
    };
};
