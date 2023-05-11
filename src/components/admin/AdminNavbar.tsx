import { useContext } from 'react';

import NextLink from 'next/link';

import { UiContext } from '@/context';

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const AdminNavbar = () => {
    const { toggleSideMenu } = useContext(UiContext);

    return (
        <AppBar>
            <Toolbar>
                {/* Con prop "passHref" pasamos el valor de la ruta al hijo */}
                <NextLink href='/' legacyBehavior passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6' fontWeight={600}>
                            Teslo |
                        </Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                {/* De esta forma podemos generar un elemento que cree un espaciado para desplazar elementos */}

                <Box flex={1} />

                <Button onClick={toggleSideMenu} sx={{ ml: 1 }}>
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    );
};
