import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { ShopLayout } from '@/components/layouts';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import {
    ProductSelectSizesSelector,
    ProductSlideShow,
} from '@/components/products';

import { ItemCounter } from '@/components/ui';
import { IProduct } from '@/interfaces';

interface Props {
    producto: IProduct;
}

const ProductPage: NextPage<Props> = ({ producto }) => {
    // No se acostumbra a generar esta páginas así, dado que esto no tiene SEO

    // // Obtenemos los parametros de ruta
    // const { query } = useRouter();

    // // Realizamos la petición a la api
    // const { product, isLoading } = useProducts(`/products/${query}`);

    return (
        <ShopLayout
            title={producto.title}
            pageDescription={producto.description}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideShow images={producto.images} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* titulos */}

                        {/* El "variant" indica como material va a tratar al componente, mientras que el "component" indica como se mostrará en el html */}

                        <Typography variant='h1' component='h1'>
                            {producto.title}
                        </Typography>

                        <Typography variant='subtitle1' component='h2'>
                            ${producto.price}
                        </Typography>

                        {/* cantidad */}

                        <Box sx={{ my: 2 }}>
                            <Typography variant='subtitle2'>
                                <ItemCounter />
                                <ProductSelectSizesSelector
                                    sizes={producto.sizes}
                                    selectedSize={producto.sizes[1]}
                                />
                            </Typography>
                        </Box>

                        {/* Este elemento permite mostrar información  */}

                        {producto.inStock <= 0 ? (
                            <Chip
                                label='No hay stock de momento'
                                color='error'
                                variant='outlined'
                            />
                        ) : (
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
                        )}

                        {/* Descripcion */}

                        <Box sx={{ mt: 3 }}>
                            {/* La variante "subtitle2" pone en negrita el texto */}

                            <Typography variant='subtitle1'>
                                Descripción:
                            </Typography>

                            {/* La variante "body2" permite mostrar texto de manera compacta */}

                            <Typography variant='body2'>
                                {producto.description}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default ProductPage;

// ---- FORMA usando el SERVER SIDE RENDERING (SSR)

// Vamos hacer que está página se genere en el servido en cada request que se haga
// Esto de aqui ya se encuentra del lado del servidor

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     // Obtenemos el parámetro dinámico de la ruta

//     const { slug = '' } = ctx.params as { slug: string };

//     // Con el slug obtenido de la ruta hacemos la consulta a la base de datos par obtener información del producto

//     const data = await fetch(`http://localhost:3452/api/products/${slug}`);
//     const { producto, ok} = (await data.json()) as {
//         ok: boolean;
//         producto: IProduct;
//     };

//     // Si el producto no existe redireccionamos a la pág principal

//     if (!ok) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false, // Al indicar como false se da la posibilidad que la página si puede llegar a existir en un futuro
//             },
//         };
//     }

//     // Devolvemos las props al componente principal

//     return {
//         props: { producto },
//     };
// };

// Aqui devolvemos/generamos todas las posibles rutas

export const getStaticPaths: GetStaticPaths = async () => {
    const resp = await fetch(`http://localhost:3452/api/products`);

    // obtenemos todos los productos para obtener todo los slugs posibles

    const { products } = (await resp.json()) as {
        ok: boolean;
        products: IProduct[];
    };

    return {
        paths: products.map((obj) => ({
            params: { slug: obj.slug },
        })),

        // fallback (false): si la ruta accedida no existe, entonces retorna un 404
        // fallback (true): si la ruta accedia no existe, el servidor la genera de manera dinámica y la almacena en caché,
        //                  mientras el servidor la genera este puede retornar un pre rendering (versión preliminar) de la
        //                  página hasta que este lista la real
        // fallback ("blocking"): lo mismo que (true), pero mientras la página se genera el navegador se bloquea y despues
        //                        se muestra la página cuando está lista

        fallback: 'blocking',
    };
};

// Obtenemos todas las rutas posibles para generar la pág con la info

export const getStaticProps: GetStaticProps = async (ctx) => {
    // Obtenemos el parámetro dinámico de la ruta

    const { slug = '' } = ctx.params as { slug: string };

    // Con el slug obtenido de la ruta hacemos la consulta a la base de datos par obtener información del producto

    const data = await fetch(`http://localhost:3452/api/products/${slug}`);
    const { producto, ok } = (await data.json()) as {
        ok: boolean;
        producto: IProduct;
    };

    // Si el producto no existe redireccionamos a la pág principal

    if (!ok) {
        return {
            redirect: {
                destination: '/',
                permanent: false, // Al indicar como false se da la posibilidad que la página si puede llegar a existir en un futuro
            },
        };
    }

    // Devolvemos las props al componente principal

    return {
        props: { producto },
        // Este dato está en segundos
        // Con esto revalidamos la página cada 24 horas
        revalidate: 86400, // 60*60*24
    };
};
