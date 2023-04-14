import { NextPage } from 'next';
import NextLink from 'next/link';

import { ShopLayout } from '@/components/layouts';
import { Box, Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const empty: NextPage = () => {
    return (
        <ShopLayout
            title='Carrito de compras vacío'
            pageDescription='No hay artículos en el carrito de compras'
        >
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                // Modificamos para que la orientación del flex sea diferente dependiendo del tamaño de la pantalla
                sx={{
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                }}
            >
                {/* Con el "fontsize" podemos aumentar el tamaño del icono */}
                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />

                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>Su carrito está vacío</Typography>
                    <NextLink href='/' passHref legacyBehavior>
                        {/* Con la prop "typography" permite que el link se muestre como se fuera un "typography" */}
                        <Link typography='h4' color='secondary'>
                            Volver
                        </Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    );
};

export default empty;
