import { Grid, Typography } from '@mui/material';

export const CardOrderSummary = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3 items</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>${155.3}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos (12%)</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>${34.3}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant='subtitle1'>Total a pagar:</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>${1234.3}</Typography>
            </Grid>
        </Grid>
    );
};
