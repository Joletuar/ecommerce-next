import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CardOrderSummary, CartList } from '@/components/cart';

import { ShopLayout } from '@/components/layouts';
import { CartContext } from '@/context';

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from '@mui/material';

const CartPage = () => {
    const { isLoaded, cart, order } = useContext(CartContext);

    const router = useRouter();

    useEffect(() => {
        if (isLoaded && cart.length <= 0) {
            router.replace('/cart/empty');
        }
    }, [isLoaded, cart, router]);

    if (!isLoaded || cart.length <= 0) {
        return <></>;
    }

    return (
        <ShopLayout
            title={`Carrito - ${order.quantity}`}
            pageDescription='Carrito de compras de la tienda'
        >
            <Typography variant='h1' component='h1'>
                Carrito
            </Typography>

            <Grid container>
                <Grid item xs={12} sm={7} mt={2}>
                    <CartList />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>

                            {/* Divider: es una linea divisora */}

                            <Divider sx={{ my: 1 }} />

                            <CardOrderSummary />

                            <Box sx={{ mt: 3 }}>
                                {/* La prop "fullWidth" hace que el boton ocupe todo el ancho de su contenedor */}
                                <Button
                                    color='secondary'
                                    className='circular-btn'
                                    fullWidth
                                    href='/checkout/address'
                                    sx={{
                                        ':hover': {
                                            backgroundColor:
                                                'rgb(19, 143, 232)',
                                        },
                                    }}
                                >
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default CartPage;
