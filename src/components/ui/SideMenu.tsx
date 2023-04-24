import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { UiContext } from '@/context';

import {
    AccountCircleOutlined,
    AdminPanelSettings,
    CategoryOutlined,
    ConfirmationNumberOutlined,
    EscalatorWarningOutlined,
    FemaleOutlined,
    LoginOutlined,
    MaleOutlined,
    SearchOutlined,
    VpnKeyOutlined,
} from '@mui/icons-material';

import {
    Box,
    Divider,
    Drawer,
    IconButton,
    Input,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';

export const SideMenu = () => {
    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const [searchTerm, setSearchTerm] = useState('');

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    };

    const onSearchPage = () => {
        // si no hay nada escrito entonces no hacemos nada

        if (searchTerm.trim().length === 0) return;

        navigateTo(`/search/${searchTerm}`);
    };

    return (
        // El Drawer siempre necesira la propiedad "open" y onClose
        // El anchor indica la posicion en que queremos que aparezca
        // Con la propiedad de CSS backdropFilter podemos crear un efecto de blur en el fondo

        <Drawer
            open={isMenuOpen}
            onClose={toggleSideMenu}
            anchor='right'
            sx={{
                backdropFilter: 'blur(4px)',
                transition: 'all 0.5s ease-out',
            }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        {/* Usando la prop "endAdorment" podemos incrustar un ícono al final del input/elemento */}
                        <Input
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
                                    <IconButton onClick={onSearchPage}>
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {/* ListItem: corresponde a un item de la lista.
                    ListItemButon: corresponde a un item de tipo button de la lista.
                    ListItemText: corresponde a un item de tipo text de la lista. */}
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Profile'} />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'My Orders'} />
                    </ListItemButton>

                    <ListItemButton
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mens'} />
                    </ListItemButton>

                    <ListItemButton
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Womens'} />
                    </ListItemButton>

                    <ListItemButton
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/kid')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Kid'} />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <VpnKeyOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Login'} />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <LoginOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>

                    {/* Admin */}
                    <Divider />
                    {/* ListSubheader: permite poner un subtitulo */}
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItemButton>
                        <ListItemIcon>
                            <CategoryOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Orders'} />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={'Users'} />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};
