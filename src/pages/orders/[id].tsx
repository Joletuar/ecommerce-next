import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import { CardOrderSummary, CartList } from '@/components/cart';

import { ShopLayout } from '@/components/layouts';

import { PayPalButtons } from '@paypal/react-paypal-js';

import {
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Typography,
} from '@mui/material';
import {
    CreditCardOffOutlined,
    CreditScoreOutlined,
} from '@mui/icons-material';
import { tesloApi } from '@/api';
import { IOrder } from '@/interfaces';
import { FullScreenLoading } from '@/components/ui';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const [isPaying, setIsPaying] = useState(false);

    const router = useRouter();

    const {
        isPaid,
        numberOfItems,
        orderItems,
        shippingAddress,
        subTotal,
        tax,
        total,
        _id,
    } = order;

    const onOrderCompleted = async (details: any) => {
        // console.log('-------->', details);

        if (details.status !== 'COMPLETED') {
            return alert('No se pudo completar la transacción');
        }

        setIsPaying(true);

        // Si la transacción de realizó con exito entonces, hacemos le dicemos al backend que verifique y marque la orden como pagada

        try {
            const { data } = await tesloApi.post<{
                ok: boolean;
                message: string;
            }>('/orders/pay', {
                transactionId: details.id,
                orderId: order._id,
            });

            if (!data.ok) {
                return alert(
                    'La transacción realiza no es válida, contacte con el soporte'
                );
            }
        } catch (error) {
            setIsPaying(false);
            alert('Hubo un error al validar la transaccion');
        } finally {
            // Con esto podemos recargamos la página
            router.reload();
        }
    };

    if (isPaying) {
        return (
            <ShopLayout
                title={`Resumen de la orden`}
                pageDescription={`Resumen de la orden ${_id} antes de pagar`}
            >
                <Typography variant='h1' component='h1'>
                    Orden: {_id}
                </Typography>

                <FullScreenLoading />
            </ShopLayout>
        );
    }

    return (
        <ShopLayout
            title={`Resumen de la orden`}
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
                                <Box
                                    display='flex'
                                    justifyContent='center'
                                    className='fadeIn'
                                    sx={{
                                        display: isPaying ? 'flex' : 'none',
                                    }}
                                >
                                    <CircularProgress />
                                </Box>

                                <Box
                                    sx={{
                                        display: isPaying ? 'none' : 'flex',
                                        flex: 1,
                                    }}
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
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                currency_code:
                                                                    'USD',
                                                                value: `${total}`,
                                                            },
                                                        },
                                                    ],
                                                    intent: 'CAPTURE',
                                                });
                                            }}
                                            onApprove={async (
                                                data,
                                                actions
                                            ) => {
                                                return actions
                                                    .order!.capture()
                                                    .then((details) => {
                                                        onOrderCompleted(
                                                            details
                                                        );
                                                        // const name =
                                                        //     details.payer.name!
                                                        //         .given_name;
                                                        // alert(
                                                        //     `Transaction completed by ${name}`
                                                        // );
                                                    });
                                            }}
                                        />
                                    )}
                                </Box>
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

    try {
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

        const idSession = session?.user.id;

        if (order?.user?.toString() != idSession) {
            return {
                redirect: {
                    destination: `/orders/history`,
                    permanent: false,
                },
            };
        }

        return {
            props: {
                order,
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: `/`,
                permanent: false,
            },
        };
    }
};
