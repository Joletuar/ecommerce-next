import { FC, useContext } from 'react';

import { CartContext } from '@/context';

import { Grid, Typography } from '@mui/material';
import { currency } from '@/utils';

interface Props {
    orderBackend?: {
        quantity: number;
        subtotal: number;
        tax: number;
        total: number;
    };
}

export const CardOrderSummary: FC<Props> = ({ orderBackend }) => {
    const { order } = useContext(CartContext);

    const orderToShow = orderBackend || order;

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>
                    {orderToShow.quantity > 1
                        ? orderToShow.quantity + ' productos'
                        : orderToShow.quantity + ' producto'}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>
                    {currency.formatPrice(orderToShow.subtotal)}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    Impuesto ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
                </Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.formatPrice(orderToShow.tax)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant='subtitle1'>Total a pagar:</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>
                    {currency.formatPrice(orderToShow.total)}
                </Typography>
            </Grid>
        </Grid>
    );
};
