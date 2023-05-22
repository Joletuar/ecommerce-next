// Lo que nosotros regresemos aqui será lo que se mostrará cuando se redirija a una página que no exista

import { NextPage } from 'next';

import { ShopLayout } from '@/components/layouts';
import { Typography, Box } from '@mui/material';

const Custom404Page: NextPage = () => {
    return (
        <ShopLayout
            title='Page not Found'
            pageDescription='Página no encontrada'
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
                {/* Usualmente cuando se pone "variant" siempre va tambien el "component" */}
                <Typography
                    variant='h1'
                    component='h1'
                    fontSize={75}
                    fontWeight={200}
                >
                    404 |
                </Typography>

                <Typography ml={2}>Something doesn't working</Typography>
            </Box>
        </ShopLayout>
    );
};

export default Custom404Page;
