import { FC } from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';

interface Props {
    children?: JSX.Element | JSX.Element[];
    title: string | number;
    subTitle: string;
    icon: JSX.Element;
}

export const SummaryTitle: FC<Props> = ({ title, subTitle, icon }) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            {/* Las tarjetas siempre tienen un shadow */}
            <Card sx={{ display: 'flex' }}>
                <CardContent
                    sx={{
                        width: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* <CreditCardOffOutlined
                        color={'secondary'}
                        sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                    /> */}

                    {icon}
                </CardContent>

                <CardContent
                    sx={{
                        flex: '1 0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant='h3'>{title}</Typography>
                    <Typography variant='caption' fontWeight='bold'>
                        {subTitle}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
