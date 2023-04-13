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
    return (
        // El Drawer siempre necesira la propiedad "open" y onClose
        // El anchor indica la posicion en que queremos que aparezca

        // Con la propiedad de CSS backdropFilter podemos crear un efecto de blur en el fondo

        <Drawer
            open={false}
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
                            type='text'
                            placeholder='Search...'
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton aria-label='toggle password visibility'>
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

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mens'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Womens'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
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
