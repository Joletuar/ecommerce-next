import NextLink from 'next/link';

import { AuthLayout } from '@/components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

const LoginPage = () => {
    return (
        <AuthLayout title={'Ingresar'}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>
                            Iniciar Sesión
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant='filled'
                            label='Correo'
                            type='text'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant='filled'
                            label='Contraseña'
                            type='password'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            color='secondary'
                            className='circular-btn'
                            // Esto determina el tamaño del boton
                            size='large'
                            fullWidth
                            sx={{
                                ':hover': {
                                    backgroundColor: 'rgb(19, 143, 232)',
                                },
                            }}
                        >
                            Ingresar
                        </Button>
                    </Grid>

                    {/* Los Grid item no tiene el flex por defecto */}

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/register' legacyBehavior passHref>
                            <Link underline='always' color='secondary'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    );
};

export default LoginPage;
