import { GetServerSideProps, NextPage } from 'next';

import { CardOrderSummary, CartList } from '@/components/cart';

import { AdminLayout } from '@/components/layouts';

import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography,
} from '@mui/material';

import {
    CreditCardOffOutlined,
    CreditScoreOutlined,
    ConfirmationNumberOutlined,
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
    } = order;

    return (
        <AdminLayout
            title={`Orden ${_id}`}
            subTitle={`Resumen de la orden`}
            icon={<ConfirmationNumberOutlined />}
        >
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
                                sx={{
                                    display: 'flex',
                                }}
                                flexDirection='column'
                            >
                                {isPaid ? (
                                    /* Cuadro que se muestra cuando la orden no está pagada */
                                    <Chip
                                        // Con esto hacemos que tome todo el espacio disponible
                                        sx={{ my: 2, flex: '1 0 auto' }}
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
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
}) => {
    const { id = '' } = query;

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
                    destination: '/admin/orders',
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
                destination: '/admin/orders',
                permanent: false,
            },
        };
    }
};
