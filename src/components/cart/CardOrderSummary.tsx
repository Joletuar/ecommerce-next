import { useContext } from 'react';

import { CartContext } from '@/context';

import { Grid, Typography } from '@mui/material';
import { currency } from '@/utils';

export const CardOrderSummary = () => {
    const { order } = useContext(CartContext);

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>
                    {order.quantity > 1 ? 'productos' : 'producto'}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.formatPrice(order.subtotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    Impuestos (%{Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}
                    )
                </Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.formatPrice(order.impuesto)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant='subtitle1'>Total a pagar:</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>
                    {currency.formatPrice(order.total)}
                </Typography>
            </Grid>
        </Grid>
    );
};
