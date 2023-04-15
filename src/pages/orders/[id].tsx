import NextLink from 'next/link';

import { CardOrderSummary, CartList } from '@/components/cart';

import { ShopLayout } from '@/components/layouts';

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Link,
    Typography,
} from '@mui/material';
import {
    CreditCardOffOutlined,
    CreditScoreOutlined,
} from '@mui/icons-material';

const OrderPage = () => {
    return (
        <ShopLayout
            title='Resumen de la orden 12121434'
            pageDescription='Resumen de la orden 12332434 antes de pagar'
        >
            <Typography variant='h1' component='h1'>
                Orden: 12233243
            </Typography>

            {/* Cuadro que se muestra cuando la orden no está pagada */}

            {/* <Chip
                sx={{ my: 2 }}
                label='Pendiente de pago'
                color='error'
                variant='outlined'
                icon={<CreditCardOffOutlined />}
            /> */}

            {/* Cuadro que se muestra cuando la orden está pagada */}

            <Chip
                sx={{ my: 2 }}
                label='Pagado'
                color='success'
                variant='outlined'
                icon={<CreditScoreOutlined />}
            />

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
                                Resumen (3 productos)
                                {/* Divider: es una linea divisora */}
                            </Typography>

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

                            <Typography>333 Alguna parte</Typography>

                            <Typography>Gye, Ecuador</Typography>

                            <Typography>Ecuador</Typography>

                            <Typography>11111</Typography>

                            <Typography>+593 09784546454</Typography>

                            <Typography>Johan Tuarez</Typography>

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
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label='Pagado'
                                    color='success'
                                    variant='outlined'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default OrderPage;
