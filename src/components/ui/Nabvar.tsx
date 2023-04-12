import NextLink from 'next/link';

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartCheckoutOutlined from '@mui/icons-material/ShoppingCartCheckoutOutlined';

export const Nabvar = () => {
    return (
        <AppBar>
            <Toolbar>
                {/* Con prop "passHref" pasamos el valor de la ruta al hijo */}

                <NextLink href='/' legacyBehavior passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                {/* De esta forma podemos generar un elemento que cree un espaciado para desplazar elementos */}

                <Box flex={1} />

                {/* Botones de las categorias (parte central del nav)*/}

                {/* Al utilizar el "BOX" nosotros tenemos acceso al tema definido, pero además podemos aplicar estilo condicional */}

                {/* A traves de "sx" nosotros tambien podemos espeicificar los breakpoitns, es importante tener en cuenta que MUI trabaja con Mobile First*/}

                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block',
                        },
                    }}
                >
                    <NextLink href='/category/men' legacyBehavior passHref>
                        <Link>
                            <Button>Men's</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/men' legacyBehavior passHref>
                        <Link>
                            <Button>Women's</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid' legacyBehavior passHref>
                        <Link>
                            <Button>Kids</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                {/* Botones para adicionales (parte final del nav) */}

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' legacyBehavior passHref>
                    <Link>
                        <IconButton>
                            {/* El Badge permite generar un pequeño decorador en la parte superior derecha de su hijo */}
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCartCheckoutOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button sx={{ ml: 1 }}>Menu</Button>
            </Toolbar>
        </AppBar>
    );
};
