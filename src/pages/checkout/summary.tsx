import { useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { CardOrderSummary, CartList } from '@/components/cart';
import { CartContext } from '@/context';

import { ShopLayout } from '@/components/layouts';

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Link,
    Typography,
} from '@mui/material';

import { countries } from '@/utils';
import Cookie from 'js-cookie';

const SummaryPage = () => {
    const router = useRouter();
    const { shippignAddress, order } = useContext(CartContext);

    useEffect(() => {
        if (!Cookie.get('firtsName')) {
            router.push('/checkout/address');
        }
    }, [router]);

    if (!shippignAddress) {
        return <></>;
    }

    const countryNameMemo = useMemo(
        () =>
            countries.find(
                (country) => country.code === shippignAddress?.country
            ),
        []
    );

    return (
        <ShopLayout
            title='Resumen'
            pageDescription='Resumen de la orden antes de pagar'
        >
            <Typography variant='h1' component='h1'>
                Resumen de la Orden
            </Typography>

            <Grid container justifyContent='space-between'>
                <Grid item xs={12} sm={6} mt={2}>
                    <CartList />
                </Grid>

                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'inline-flex',
                        },
                    }}
                />

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>
                                Resumen{' '}
                                {order.quantity > 1
                                    ? `${order.quantity} productos`
                                    : `${order.quantity} producto`}
                            </Typography>

                            {/* Divider: es una linea divisora */}
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink
                                    href='/checkout/address'
                                    passHref
                                    legacyBehavior
                                >
                                    {/* Con la propiedad underline="always" podemos mostrar un linea sobre el link */}
                                    <Link underline='always' variant='overline'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant='subtitle1'>
                                Dirección de Entrega
                            </Typography>

                            <Typography>
                                {`${shippignAddress.address}, ${
                                    shippignAddress.address2
                                        ? shippignAddress.address2
                                        : ''
                                }`}
                            </Typography>

                            <Typography>{shippignAddress?.city}</Typography>

                            <Typography>
                                {countryNameMemo?.name}, {shippignAddress?.zip}
                            </Typography>

                            <Typography>{shippignAddress?.phone}</Typography>

                            <Typography>{`${shippignAddress?.firstName} ${shippignAddress?.lastName}`}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    {/* Con la propiedad underline="always" podemos mostrar un linea sobre el link */}
                                    <Link underline='always' variant='overline'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <CardOrderSummary />

                            <Box sx={{ mt: 3 }}>
                                {/* La prop "fullWidth" hace que el boton ocupe todo el ancho de su contenedor */}
                                <Button
                                    color='secondary'
                                    className='circular-btn'
                                    fullWidth
                                    sx={{
                                        ':hover': {
                                            backgroundColor:
                                                'rgb(19, 143, 232)',
                                        },
                                    }}
                                >
                                    Confirmar Orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default SummaryPage;
