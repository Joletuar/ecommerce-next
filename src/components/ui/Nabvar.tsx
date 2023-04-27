import { useContext, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { CartContext, UiContext } from '@/context';

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
import { Input, InputAdornment } from '@mui/material';
import { ClearOutlined } from '@mui/icons-material';

export const Nabvar = () => {
    // Este hook nos información de la ruta actual
    // Podemos acceder a su propiedad path para saber la url actual
    const { pathname, push } = useRouter();

    const { toggleSideMenu } = useContext(UiContext);
    const {
        order: { quantity },
    } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchPage = () => {
        // si no hay nada escrito entonces no hacemos nada

        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    };

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
                {/* Botones de las categorias (parte central del nav)*/}
                {/* Al utilizar el "BOX" nosotros tenemos acceso al tema definido, pero además podemos aplicar estilo condicional */}
                {/* A traves de "sx" nosotros tambien podemos espeicificar los breakpoitns, es importante tener en cuenta que MUI trabaja con Mobile First*/}
                <Box
                    className='fadeIn'
                    sx={{
                        display: isSearchVisible
                            ? 'none'
                            : {
                                  xs: 'none',
                                  sm: 'block',
                              },
                    }}
                >
                    <NextLink href='/category/men' legacyBehavior passHref>
                        <Link>
                            <Button
                                // Cambiar el color actual de boton en función de la ruta actual
                                color={
                                    pathname === '/category/men'
                                        ? 'primary'
                                        : 'info'
                                }
                            >
                                Men's
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/women' legacyBehavior passHref>
                        <Link>
                            <Button
                                color={
                                    pathname === '/category/women'
                                        ? 'primary'
                                        : 'info'
                                }
                            >
                                Women's
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid' legacyBehavior passHref>
                        <Link>
                            <Button
                                color={
                                    pathname === '/category/kid'
                                        ? 'primary'
                                        : 'info'
                                }
                            >
                                Kids
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box flex={1} />

                {/* Botones para adicionales (parte final del nav) */}

                {/* Pantallas grandes */}

                {isSearchVisible ? (
                    <Input
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'flex',
                            },
                        }}
                        className='fadeIn'
                        autoFocus // Con esto hacemos que el elemento se enfoque automaticamente
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        // Vamos a estar pendientes de cuando el usuario haga enter, y solo así llamamos nuestra función
                        onKeyDown={(e) =>
                            e.key === 'Enter' ? onSearchPage() : null
                        }
                        type='text'
                        placeholder='Search...'
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={() => setIsSearchVisible(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                ) : (
                    <IconButton
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'flex',
                            },
                        }}
                        onClick={() => setIsSearchVisible(true)}
                        className='fadeIn'
                    >
                        <SearchOutlined />
                    </IconButton>
                )}

                {/* Pantallas pequeñas */}

                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' legacyBehavior passHref>
                    <Link>
                        <IconButton>
                            {/* El Badge permite generar un pequeño decorador en la parte superior derecha de su hijo */}
                            <Badge
                                badgeContent={quantity > 9 ? '+9' : quantity}
                                color='secondary'
                            >
                                <ShoppingCartCheckoutOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
                <Button
                    onClick={() => {
                        setIsSearchVisible(false);
                        return toggleSideMenu();
                    }}
                    sx={{ ml: 1 }}
                >
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    );
};
