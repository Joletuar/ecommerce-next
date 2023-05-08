import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';

import { CardOrderSummary, CartList } from '@/components/cart';

import { ShopLayout } from '@/components/layouts';

import {
    Box,
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
import { tesloApi } from '@/api';
import { IOrder } from '@/interfaces';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const {
        isPaid,
        numberOfItems,
        orderItems,
        shippingAddress,
        subTotal,
        tax,
        total,
        _id,
        paidAt,
        paymentResult,
        user,
    } = order;

    return (
        <ShopLayout
            title={`Resumen de la orden ${_id}`}
            pageDescription={`Resumen de la orden ${_id} antes de pagar`}
        >
            <Typography variant='h1' component='h1'>
                Orden: {_id}
            </Typography>

            {isPaid ? (
                /* Cuadro que se muestra cuando la orden no está pagada */
                <Chip
                    sx={{ my: 2 }}
                    label='Pagado'
                    color='success'
                    variant='outlined'
                    icon={<CreditScoreOutlined />}
                />
            ) : (
                /* Cuadro que se muestra cuando la orden está pagada */
                <Chip
                    sx={{ my: 2 }}
                    label='Pendiente de pago'
                    color='error'
                    variant='outlined'
                    icon={<CreditCardOffOutlined />}
                />
            )}

            <Grid container justifyContent='space-between' className='fadeIn'>
                <Grid item xs={12} sm={6} mt={2}>
                    <CartList editable={false} products={orderItems} />
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
                                {numberOfItems > 1
                                    ? `${numberOfItems} productos`
                                    : '1 producto'}
                            </Typography>

                            {/* Divider: es una linea divisora */}
                            <Divider sx={{ my: 1 }} />

                            <Typography variant='subtitle1'>
                                Dirección de Entrega
                            </Typography>

                            <Typography>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</Typography>

                            <Typography>
                                {shippingAddress.address}
                                {shippingAddress.address2
                                    ? `, ${shippingAddress.address2}`
                                    : ''}
                            </Typography>

                            <Typography>{shippingAddress?.city}</Typography>

                            <Typography>{shippingAddress.country}</Typography>

                            <Typography>{shippingAddress?.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <CardOrderSummary
                                orderBackend={{
                                    quantity: numberOfItems,
                                    subtotal: subTotal,
                                    tax,
                                    total,
                                }}
                            />

                            <Box
                                sx={{ mt: 3 }}
                                display='flex'
                                flexDirection='column'
                            >
                                {isPaid ? (
                                    <Chip
                                        sx={{ my: 2 }}
                                        label='Pagado'
                                        color='success'
                                        variant='outlined'
                                        icon={<CreditScoreOutlined />}
                                    />
                                ) : (
                                    <h1>Pagar (Implementar)</h1>
                                )}

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

export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
}) => {
    const { id = '' } = query;

    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=${id}`,
                permanent: false,
            },
        };
    }

    const { data } = await tesloApi.get<{
        ok: boolean;
        order?: IOrder;
        message?: string;
    }>(`/orders/${id}`);

    const { ok, order } = data;

    if (!ok) {
        return {
            redirect: {
                destination: `orders/history`,
                permanent: false,
            },
        };
    }

    if (order?.user?.toString() != session.user._id) {
        return {
            redirect: {
                destination: `orders/history`,
                permanent: false,
            },
        };
    }

    return {
        props: {
            order,
        },
    };
};
